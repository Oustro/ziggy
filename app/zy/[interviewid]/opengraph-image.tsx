import { ImageResponse } from 'next/og'

import prisma from '@/utils/db'
 
export const runtime = 'edge'
 
export const alt = 'An image asking to take an interview on useziggy.com'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image({ params }: { params: { interviewid: string }}) {

  const interview = await prisma.interview.findUnique({
    where: {
      externalID: params.interviewid
    },
    include: {
      team: true
    }
  })
 
  return new ImageResponse(
    (
      <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '100px',
        background: 'linear-gradient(to top right, #FFFFFF 40%, '+ interview?.team?.color +' 145%)'
      }}
      >
        <img src={interview?.team.logo} alt={alt} 
        style={{
          width: '150px',
          height: '150px',
        }}
        />
        <p style={{
          fontWeight: 600,
          fontFamily: 'Arial, sans-serif',
          fontSize: 55,
          marginTop: 80,
        }}
        >
          I'm {interview?.team.interviewer}, do you think you I could ask you some questions?
        </p>
      </div>
    )
  )
}