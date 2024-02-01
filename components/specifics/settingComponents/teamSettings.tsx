"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { teamSavedInfo } from "@/lib/types"

import BlackButton from "@/components/generics/blackButton"
import GeneralSettings from '@/components/specifics/settingComponents/team/generalSettings'

export default function TeamSettings({ children, initOpen, team } : { children: React.ReactNode, initOpen: boolean, team: teamSavedInfo }) {
  const [isOpen, setIsOpen] = useState(initOpen)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
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
                <Dialog.Panel className="transform overflow-hidden rounded w-[40%] bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                  as="h3"
                  className="text-3xl font-medium"
                  >
                    {team.name} Settings
                  </Dialog.Title>
                  <div className="mt-8 flex w-full">
                    <div className='bg-red-400 w-[20%]'>
                      <p>General</p>
                      <p>Team</p>
                      <p>Billing</p>
                    </div>
                    <GeneralSettings team={team} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  )
}