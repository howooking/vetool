'use client'

import { IcuData } from '@/types/icu'
import React, { createContext, useContext } from 'react'

interface IcuContextType {
  icuData: IcuData
}

const IcuContext = createContext<IcuContextType | undefined>(undefined)

export const useIcuContext = () => {
  const context = useContext(IcuContext)
  if (context === undefined) {
    throw new Error('useIcuContext must be used within an IcuProvider')
  }
  return context
}

export const IcuDataProvider: React.FC<{
  icuData: IcuData
  children: React.ReactNode
}> = ({ icuData, children }) => {
  return (
    <IcuContext.Provider value={{ icuData }}>{children}</IcuContext.Provider>
  )
}
