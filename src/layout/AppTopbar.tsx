import React, { useCallback, useContext, useRef } from 'react';
import { classNames } from 'primereact/utils';

import reactLogo from '@/assets/react.svg';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { LayoutContext } from '@/context/layoutcontext';
import secureStorage from '@/utils/secureStorage';
import { SecureStorageEnum } from '@/types/secureStorage.enum';
import { useAppDispatch } from '@/hooks/redux.hook';
import { updateAuthState } from '@/store/slices/authSlice';

const AppTopbar = () => {
  const { onMenuToggle } = useContext(LayoutContext);
  const menuLeft = useRef<Menu>(null);
  const menubuttonRef = useRef(null);

  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    secureStorage.removeItem(SecureStorageEnum.accessToken);
    secureStorage.removeItem(SecureStorageEnum.refreshToken);
    dispatch(
      updateAuthState({
        status: false
      })
    );
  }, [dispatch]);

  const items: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-fw pi-user' },
    { label: 'Settings', icon: 'pi pi-fw pi-cog' },
    { label: 'Sign out', icon: 'pi pi-sign-out', command: () => logout() }
  ];

  return (
    <div className='layout-topbar'>
      <a href='/' className='layout-topbar-logo'>
        <img src={reactLogo} width='47.22px' height={'35px'} alt='logo' />
        <span>Dashboard</span>
      </a>

      <button
        ref={menubuttonRef}
        type='button'
        className='p-link layout-menu-button layout-topbar-button'
        onClick={onMenuToggle}
      >
        <i className='pi pi-bars' />
      </button>

      <div className={classNames('layout-topbar-menu')}>
        <button
          type='button'
          className='p-link layout-topbar-button'
          onClick={event => menuLeft?.current?.toggle(event)}
        >
          <i className='pi pi-user'></i>
          <span>Profile</span>
        </button>

        <Menu model={items} popup ref={menuLeft} popupAlignment='right' />
      </div>
    </div>
  );
};

export default AppTopbar;
