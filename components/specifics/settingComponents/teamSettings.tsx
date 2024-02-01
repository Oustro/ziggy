"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { teamSavedInfo } from "@/lib/types"

import GeneralSettings from '@/components/specifics/settingComponents/team/generalSettings'
import BillingSettings from '@/components/specifics/settingComponents/team/billingSettings'
import MemberSettings from '@/components/specifics/settingComponents/team/memberSettings'

import HoverWords from '@/components/generics/hoverWords'

export default function TeamSettings({ children, initOpen, team, setRefreshKey } : { children: React.ReactNode, initOpen: boolean, team: teamSavedInfo, setRefreshKey: Function }) {
  const [isOpen, setIsOpen] = useState(initOpen)
  const [view, setView] = useState(1)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const menu = [
    {
      name: 'Team',
      component: <MemberSettings team={team} setRefreshKey={setRefreshKey} />,
      view: 0
    },
    {
      name: 'General',
      component: <GeneralSettings team={team} setRefreshKey={setRefreshKey} />,
      view: 1
    },
    {
      name: 'Billing',
      component: <BillingSettings team={team} setRefreshKey={setRefreshKey} />,
      view: 2
    }
  ]
  

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
                <Dialog.Panel className="transform overflow-scroll rounded w-[60%] h-[30rem] bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                  as="h1"
                  className="text-3xl font-medium"
                  >
                    Settings
                  </Dialog.Title>
                  <div className='flex mt-8'>
                    <div className='sticky top-0 h-24 w-[30%]'>
                      {menu.map((item, index) => (
                        <div key={index}>
                          <button key={index} onClick={() => setView(index)} className='mb-3'><HoverWords>{item.name}</HoverWords></button>
                        </div>
                      ))}
                    </div>
                    <div className='w-full'>
                      {menu[view].component}
                    </div>
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