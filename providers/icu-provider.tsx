'use client'

import { IcuOrderColors } from '@/types/adimin'
import { IcuData, Vet } from '@/types/icu'
import React, { createContext, useContext } from 'react'

interface IcuContextType {
  basicHosData: basicHosData
}

type basicHosData = {
  vetsListData: Vet[]
  groupListData: string[]
  orderColorsData: IcuOrderColors
}

const IcuContext = createContext<IcuContextType | undefined>(undefined)

export const useBasicHosDataContext = () => {
  const context = useContext(IcuContext)
  if (context === undefined) {
    throw new Error('useIcuContext must be used within an IcuProvider')
  }
  return context
}

export const BasicHosDataProvider: React.FC<{
  basicHosData: basicHosData
  children: React.ReactNode
}> = ({ basicHosData, children }) => {
  return (
    <IcuContext.Provider value={{ basicHosData }}>
      {children}
    </IcuContext.Provider>
  )
}
