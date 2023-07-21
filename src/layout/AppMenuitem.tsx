import React, { useEffect, useContext } from 'react';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from '@/context/menucontext';
import { AppMenuItemProps } from '@/types/layout';
import { useLocation, useNavigate } from 'react-router-dom';

const AppMenuitem = (props: AppMenuItemProps) => {
  const router = useLocation();
  const navigate = useNavigate();

  const { activeMenu, setActiveMenu } = useContext(MenuContext);

  const item = props.item;
  const key = props.parentKey
    ? props.parentKey + '-' + props.index
    : String(props.index);
  const isActiveRoute = item!.to && router.pathname === item!.to;
  const active = activeMenu === key || activeMenu.startsWith(key + '-');

  useEffect(() => {
    if (item!.to && router.pathname === item!.to) {
      setActiveMenu(key);
    }
  }, [item, key, router.pathname, setActiveMenu]);

  const itemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    navigate(item?.to as string);
    //avoid processing disabled items
    if (item!.disabled) {
      event.preventDefault();
      return;
    }

    // toggle active state
    if (item!.items) setActiveMenu(active ? (props.parentKey as string) : key);
    else setActiveMenu(key);
  };

  const subMenu = item!.items && item!.visible !== false && (
    <CSSTransition
      timeout={{ enter: 1000, exit: 450 }}
      classNames='layout-submenu'
      in={props.root ? true : active}
      key={item!.label}
    >
      <ul>
        {item!.items.map((child, i) => {
          return (
            <AppMenuitem
              item={child}
              index={i}
              className={child.badgeClass}
              parentKey={key}
              key={child.label}
            />
          );
        })}
      </ul>
    </CSSTransition>
  );

  return (
    <li
      className={classNames({
        'layout-root-menuitem': props.root,
        'active-menuitem': active
      })}
    >
      {props.root && item!.visible !== false && (
        <div className='layout-menuitem-root-text'>{item!.label}</div>
      )}
      {(!item!.to || item!.items) && item!.visible !== false ? (
        <a
          onClick={e => itemClick(e)}
          className={classNames(item!.class, 'p-ripple')}
          target={item!.target}
          tabIndex={0}
        >
          <i className={classNames('layout-menuitem-icon', item!.icon)}></i>
          <span className='layout-menuitem-text'>{item!.label}</span>
          {item!.items && (
            <i className='pi pi-fw pi-angle-down layout-submenu-toggler'></i>
          )}
          <Ripple />
        </a>
      ) : null}

      {item!.to && !item!.items && item!.visible !== false ? (
        <a
          target={item!.target}
          onClick={e => itemClick(e)}
          className={classNames(item!.class, 'p-ripple', {
            'active-route': isActiveRoute
          })}
          tabIndex={0}
        >
          <i className={classNames('layout-menuitem-icon', item!.icon)}></i>
          <span className='layout-menuitem-text'>{item!.label}</span>
          {item!.items && (
            <i className='pi pi-fw pi-angle-down layout-submenu-toggler'></i>
          )}
          <Ripple />
        </a>
      ) : null}

      {subMenu}
    </li>
  );
};

export default AppMenuitem;
