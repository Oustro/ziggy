"use client"

import { useState } from "react"

import { teamSavedInfo } from "@/lib/types"

import { FaCopy } from "react-icons/fa"
import { CgRedo } from "react-icons/cg";

import BlackButton from "@/components/generics/blackButton"
import Profile from "@/components/generics/profile"

export default function MemberSettings({ team, setRefreshKey } : { team: teamSavedInfo, setRefreshKey: Function}) {
  const [inviteID, setInviteID] = useState<string>(team.inviteID)
  const [loading, setLoading] = useState<boolean>(false)
  const [invitee, setInvitee] = useState<string>("")

  function copyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/invite/${team.inviteID}`)
  }

  async function rollInvite(e : React.FormEvent<HTMLFormElement>) {    
    e.preventDefault()

    setLoading(true)

    const responseTeamRollInviteID = await fetch('/api/teams/invite/roll', {
      method: "PUT",
      body: JSON.stringify({
        teamID: team.id,
        inviteID: inviteID
      })
    })
    
    const data = await responseTeamRollInviteID.json()
    setInviteID(data.inviteID)
    return setLoading(false)
  }

  async function sendInvite(e : React.FormEvent<HTMLFormElement>) {    
    e.preventDefault()

    setLoading(true)

    await fetch('/api/teams/invite', {
      method: "POST",
      body: JSON.stringify({
        teamID: team.id,
        invitee: invitee
      })
    })
    
    setInvitee("")
    return setLoading(false)
  }

  return (
    <main>
      <p className="font-medium">Invite link</p>
      <p className="text-slate-600 text-xs">Invite new members to this team by sharing this link with them. Anyone with this link will be able to join.</p>
      <form className="mt-4 flex gap-2" onSubmit={e => rollInvite(e)}>
        <button onClick={copyLink} type="button" className="border py-1 px-2 flex rounded hover:border-inherit transition-all text-xs border-slate-600 items-center gap-2">
          <FaCopy />
          <p className="truncate">{window.location.origin}/invite/{inviteID}</p>
        </button>
        <button className="text-sm group flex items-center gap-1" type="submit" disabled={loading}>
          <BlackButton><CgRedo className="mx-auto"/></BlackButton>
          <p className="hidden group-hover:block absolute mt-20 -ml-12">Generate new link.</p>
        </button>
      </form>
      <p className="font-medium mt-12">Send invitation</p>
      <p className="text-slate-600 text-xs">Enter the email of who you would like to join and they will have 24 hours to join.</p>
      <form className="mt-4 flex gap-4" onSubmit={e => sendInvite(e)}>
        <input
        type="email"
        className="w-full mt-1 border-b border-slate-600 pb-2 focus:outline-none"
        placeholder="Enter an email address..."
        value={invitee}
        onChange={(e) => setInvitee(e.target.value)}
        required
        />
        <button className="w-[15%] text-xs" type="submit" disabled={loading}>
          <BlackButton>Send</BlackButton>
        </button>
      </form>
      <p className="font-medium text-lg mt-6 mb-4 pb-2 border-b">Current members</p>
      {team.members.map((member, index) => (
        <div key={index} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Profile color={false} />
            <div>
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs">{member.email}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600">Member</p>
        </div>
      ))}
    </main>
  )
}