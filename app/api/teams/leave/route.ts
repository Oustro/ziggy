import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/utils/db'

import { getPusherInstance } from '@/utils/pusher/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/auth'

export async function DELETE(request: NextRequest) {

  const session = await getServerSession({ req: request, ...authOptions })

  if (!session) {
    return NextResponse.json({ "message": "not authenicated" }, { status: 401 })
  }

  try {

    const { teamID } = await request.json()

    const team = await prisma.team.findUnique({
      where: {
        id: teamID,
        members: {
          some: {
            email: session.email
          }
        }
      },
      include: {
        members: true
      }
    })

    if (!team) {
      return NextResponse.json({ "message": "not found" }, { status: 404 })
    }

    if (team.members.length === 1) {
      await prisma.team.delete({
        where: {
          id: teamID
        }
      })
    } else {
      await prisma.team.update({
        where: {
          id: teamID
        },
        data: {
          members: {
            delete: {
              email: session.email || ""
            }
          }
        }
      })
    }

    await getPusherInstance().trigger(session.email as string, "evt::created", {
      message: "team-deleted"
    })
  
    return NextResponse.json({ "message": "success" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ "message": "error" }, { status: 500 })
  }
}