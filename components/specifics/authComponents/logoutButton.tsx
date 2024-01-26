"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import BlackButton from "@/components/generics/blackButton"
import WhiteButton from '@/components/generics/whiteButton'

import { signOut } from "next-auth/react"

export default function UserSettings() {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <main>
      <div>
        <button type="button" className="w-full" onClick={openModal}>
          <BlackButton>Logout</BlackButton>
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
                    Are you sure you want to logout?
                  </Dialog.Title>
                  <div className="mt-12 text-sm">
                    <button onClick={() => signOut({callbackUrl: `${window.location.origin}/register/login`})} className="w-full">
                      <BlackButton>Continue to logout</BlackButton>
                    </button>
                    <button onClick={closeModal} className="w-full mt-4">
                      <WhiteButton>Cancel</WhiteButton>
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