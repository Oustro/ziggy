"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import BlackButton from "@/components/generics/blackButton"

export default function UserSettings({ children, name, email } : { children: React.ReactNode, name: string, email: string }) {
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
                    User Settings
                  </Dialog.Title>
                  <form className='mt-8 grid gap-8'>
                    <div className="flex items-center gap-3 mx-auto truncate">
                      <div className="rounded-full h-24 w-24 bg-gradient-to-r mx-auto from-gray-900 to-indigo-400" />
                      <div className="flex-1 min-w-0">
                        <h2 className="font-medium text-4xl truncate">{name}</h2>
                        <p className="text-lg text-slate-600 truncate">{email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium"><span className="text-red-600">*</span> Name</p>
                      <input
                      type="text"
                      className="w-full mt-4 text-sm border-b border-slate-600 pb-2 focus:outline-none"
                      placeholder="Enter your name..."
                      maxLength={40}
                      disabled={true}
                      value={name}
                      required
                      />
                    </div>
                    <div>
                      <p className="font-medium"><span className="text-red-600">*</span> Email</p>
                      <input
                      type="text"
                      className="w-full mt-4 text-sm border-b border-slate-600 pb-2 focus:outline-none"
                      placeholder="Enter your name..."
                      value={email}
                      maxLength={40}
                      disabled={true}
                      required
                      />
                    </div>
                    <button
                    type="button"
                    onClick={closeModal}
                    >
                      <BlackButton>Close</BlackButton>
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