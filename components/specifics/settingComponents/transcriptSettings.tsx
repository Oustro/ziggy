"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { interviewSavedInfo } from "@/lib/types"

import BlackButton from "@/components/generics/blackButton"
import HoverWords from '@/components/generics/hoverWords'

import { useRouter } from 'next/navigation'

export default function TranscriptsSetting({ interview, tid, children } : { interview: interviewSavedInfo, tid: number, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [transcriptName, setTranscriptName] = useState(interview.transcript[tid].name)

  const router = useRouter()


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function updateTranscriptName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await fetch('/api/analytics/transcript/update/name', {
      method: 'PUT',
      body: JSON.stringify({
        id: interview.transcript[tid].id,
        name: transcriptName
      })
    })

    router.refresh()
    return closeModal()
  }

  return (
    <main>
      <div>
        <button type="button" onClick={openModal}>
          {children}
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                  as="h3"
                  className="text-lg font-medium"
                  >
                    Transcript Setting
                  </Dialog.Title>
                  <form className='mt-8 grid gap-8' onSubmit={updateTranscriptName}>
                    <div className="">
                      <p className="font-medium"><span className="text-red-600">*</span> Update Transcript Name</p>
                      <input
                      type="text"
                      className="w-full text-sm mt-4 border-b border-slate-600 pb-2 focus:outline-none"
                      placeholder="Enter your team name..."
                      maxLength={40}
                      value={transcriptName}
                      onChange={(e) => setTranscriptName(e.target.value)}
                      required
                      />
                      <button type="submit" className='mt-8 w-full'>
                        <BlackButton>Save</BlackButton>
                      </button>
                    </div>
                    <button
                    type="button"
                    onClick={closeModal}
                    >
                      <HoverWords>Close</HoverWords>
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  )
}