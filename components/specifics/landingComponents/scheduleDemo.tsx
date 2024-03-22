"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import WhiteButton from '@/components/generics/whiteButton'
import HoverWords from '@/components/generics/hoverWords'

import Cal from "@calcom/embed-react";

export default function ScheduleDemo({ version } : { version: number }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
          {version === 0 ? 
            <WhiteButton>Schedule a demo</WhiteButton>
          : 
            <HoverWords>Demo</HoverWords>
          }
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
                <Dialog.Panel className="transform overflow-scroll rounded w-[90%] sm:w-[60%] h-[32rem] bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Cal calLink="ziggy/15min"></Cal>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  )
}