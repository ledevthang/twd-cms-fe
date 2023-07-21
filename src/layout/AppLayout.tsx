import React, { useContext, useRef } from 'react';
import { classNames } from 'primereact/utils';
import AppTopbar from './AppTopbar';
import { LayoutContext } from '@/context/layoutcontext';
import AppMenu from './AppMenu';
import { DialogPopup } from '@/components/common';
import { dialogState } from '@/store/slices/dialogSlice';
import { useAppSelector } from '@/hooks/redux.hook';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  const {
    component,
    open,
    header,
    minWidth,
    footerLabelLeft,
    footerLabelRight
  } = useAppSelector(dialogState);
  const { layoutConfig, layoutState } = useContext(LayoutContext);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const containerClass = classNames('layout-wrapper', {
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-static-inactive':
      layoutState.staticMenuDesktopInactive &&
      layoutConfig.menuMode === 'static',
    'layout-mobile-active': layoutState.staticMenuMobileActive
  });

  return (
    <div className={containerClass}>
      <AppTopbar />
      <div ref={sidebarRef} className='layout-sidebar'>
        <AppMenu />
      </div>
      <div className='layout-main-container'>
        <div className='layout-main'>
          <DialogPopup
            open={open}
            header={header}
            minWidth={minWidth}
            footerLabelRight={footerLabelRight}
            footerLabelLeft={footerLabelLeft}
          >
            {component}
          </DialogPopup>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
