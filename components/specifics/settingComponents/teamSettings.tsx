"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { teamSavedInfo } from "@/lib/types"

import BlackButton from "@/components/generics/blackButton"

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                  as="h3"
                  className="text-lg font-medium"
                  >
                    {team.id}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-slate-600">
                      This is where you can change your account settings.
                    </p>
                  </div>
                  <div className="mt-4 text-sm">
                    <button
                    type="button"
                    onClick={closeModal}
                    >
                      <BlackButton>Save Changes</BlackButton>
                    </button>
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