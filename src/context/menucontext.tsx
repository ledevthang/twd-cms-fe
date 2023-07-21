import React, { useState, createContext, PropsWithChildren } from 'react';
import { MenuContextProps } from '@/types/layout';

export const MenuContext = createContext({} as MenuContextProps);

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [activeMenu, setActiveMenu] = useState('');

  const value = {
    activeMenu,
    setActiveMenu
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
