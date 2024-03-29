import type { NextAuthOptions } from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from "next-auth/adapters"
import prisma from "@/utils/db"

import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

import { customSendVerificationRequest } from "@/utils/custom"
import { html, text } from "@/lib/templates/welcomeEmail"

import Stripe from "stripe"
import { Redis } from '@upstash/redis'
import { Client } from "postmark"

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({ identifier, url, provider }) {
        customSendVerificationRequest({ identifier, url, provider })
      },
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await prisma.userInfo.findUnique({
        where: {
          email: session.user?.email || ""
        }
      })

      return {
        name: sessionUser?.name || null,
        email: session?.user?.email || null,
        customerId: sessionUser?.stripeID || null,
        ...session
      }
    }
  },
  events: {
    async signIn({ user, account, isNewUser }) { 
      if (isNewUser) {
        let uname = ""

        if (account?.provider === "email") {
          const redis = new Redis({
            url: process.env.UPSTASH_URL || '',
            token: process.env.UPSTASH_TOKEN || '',
          })
          
          const cacheResponse = await redis.get(user.email as string) as { name: string }
          uname = cacheResponse.name

        }
        else {
          uname = user.name || ""
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

        const customer = await stripe.customers.create({
          email: user.email || "",
        })

        const postmarkClient = new Client(process.env.EMAIL_SERVER_PASSWORD as string)
        await postmarkClient.sendEmail({
          "From": "Jacob from Ziggy <howdy@useziggy.com>",
          "To": user.email as string,
          "Subject": "Welcome to Ziggy!",
          "TextBody": text(),
          "HtmlBody": html()
        })

        await prisma.userInfo.create({
          data: {
            name: uname,
            email: user.email,
            stripeID: customer.id
          }
        })
      }
    },
  }
} satisfies NextAuthOptions