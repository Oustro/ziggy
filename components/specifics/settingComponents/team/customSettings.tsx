"use client"

import { useState, useRef } from "react"

import { teamSavedInfo } from "@/lib/types"

import { upload } from '@vercel/blob/client'

import Image from "next/image"

import BlackButton from "@/components/generics/blackButton"

export default function CustomSettings({ team, setRefreshKey } : { team: teamSavedInfo, setRefreshKey: Function }) {

  const [customInfo, setCustomInfo] = useState({
    logo: team.logo,
    color: team.color,
    style: team.style
  })

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    await fetch('/api/teams/update/customize', {
      method: 'PUT',
      body: JSON.stringify({
        id: team.id,
        logo: customInfo.logo,
        color: customInfo.color,
        style: customInfo.style
      })
    })


    setRefreshKey((prevKey: number) => prevKey + 1)
    setLoading(false)
  }

  return (
    <main>
      <form className="grid gap-8" onSubmit={handleSubmit}>
        <div className="rounded border p-4 flex justify-between items-center" >
          <div className="w-full">
            <p className="font-medium text-lg">Choose a Team Logo</p>
            <p className="text-xs text-slate-600">This is the current logo and what is shown to people taking your interviews.</p>
            <div className="text-sm mt-4">
              <button type="submit" disabled={loading}>
                <BlackButton>Update logo</BlackButton>
              </button>
            </div>
          </div>
          <label className="cursor-pointer w-[30%] text-center">
            <input
              type="file"
              ref={inputFileRef}
              accept="image/jpeg, image/png, image/jpg"
              className="hidden"
              onChange={async (event) => {
                event.preventDefault();
       
                if (!inputFileRef.current?.files) {
                  throw new Error('No file selected');
                }
       
                const file = inputFileRef.current.files[0]
       
                const newBlob = await upload(file.name, file, {
                  access: 'public',
                  handleUploadUrl: '/api/teams/update/customize/upload',
                })

                setCustomInfo({ ...customInfo, logo: newBlob.url })
              }}
            />
            <div>
              <Image
              src={customInfo.logo}
              alt="Team Logo"
              width={100}
              height={100}
              className="mx-auto rounded w-[100px] h-[100px]"
              />
              <p className="text-xs mt-4 text-slate-600">Click to change logo</p>
            </div>
          </label>
        </div>
        <div className="rounded border p-4 flex justify-between items-center">
          <div className="w-full">
            <p className="font-medium text-lg">Choose a Team Color</p>
            <p className="text-xs text-slate-600">This is the current color and is part of the background of your interviews.</p>
            <div className="text-sm mt-4">
              <button type="submit" disabled={loading}>
                <BlackButton>Update color</BlackButton>
              </button>
            </div>
          </div>
          <div className="cursor-pointer w-[30%] text-center">
            <input
            type="color"
            value={customInfo.color}
            onChange={(e) => setCustomInfo({ ...customInfo, color: e.target.value })}
            className="w-16 h-16 rounded-lg bg-white cursor-pointer" 
            />
            <p className="text-xs mt-4 text-slate-600">Click to change color</p>
          </div>
        </div>
        <div className="rounded border p-4">
          <div className="w-full">
            <p className="font-medium text-lg">Choose a Interview Style</p>
            <p className="text-xs text-slate-600">This is how your interview will look to users taking it.</p>
          </div>
          <div className="flex justify-between gap-4 mt-4">
            <div className={`border p-2 w-full rounded ${customInfo.style === 0 && "border-slate-600"}`} onClick={() => setCustomInfo({...customInfo, style: 0})}>
              <p className="text-sm text-left font-medium">Conversational</p>
              <div className="w-[80%] rounded mt-4 h-4 bg-slate-200 border border-slate-300"></div>
              <div className="w-[10%] mt-2 rounded h-4 border ml-auto"></div>
              <div className="w-[30%] mt-2 rounded h-4 bg-slate-200 border border-slate-300"></div>
              <div className="w-[50%] mt-2 rounded h-4 border ml-auto"></div>
              <div className="w-[35%] mt-2 h-4 rounded bg-slate-200 border border-slate-300"></div>
            </div>
            <div className={`border p-2 w-full rounded ${customInfo.style === 1 && "border-slate-600"}`} onClick={() => setCustomInfo({...customInfo, style: 1})}>
              <p className="text-sm font-medium text-left">Form like</p>
              <div className="w-[10%] mt-4 rounded h-4 bg-slate-200 border border-slate-300"></div>
              <div className="w-[60%] rounded mt-2 h-4 bg-slate-200 border border-slate-300"></div>
              <div className="w-[80%] mt-6 rounded h-4 border"></div>
            </div>
          </div>
          <div className="text-sm mt-6">
            <button type="submit" disabled={loading}>
              <BlackButton>Update style</BlackButton>
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}