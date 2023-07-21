import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from '@/context/menucontext';
import { model } from '@/constants/sideBar';

const AppMenu = () => {
  return (
    <MenuProvider>
      <ul className='layout-menu'>
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className='menu-separator'></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
