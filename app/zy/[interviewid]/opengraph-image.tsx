import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'An image asking to take an interview on useziggy.com'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image({ params }: { params: { interviewid: string }}) {
  
  const data = await fetch('https://www.useziggy.com/api/teams/get/interview?id='+params.interviewid)

  const teamData = await data.json()

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
        background: 'linear-gradient(to top right, #FFFFFF 40%, '+ teamData.color +' 145%)'
      }}
      >
        <img 
        src={teamData.logo} 
        alt={"Logo"} 
        style={{
          width: '150px',
          borderRadius: '5px',
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
          Hi I'm {teamData.interviewer}, do you mind if I get some feedback from you?
        </p>
      </div>
    )
  )
}