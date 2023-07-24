import { AppMenuItem } from '@/types/layout';

export const model: AppMenuItem[] = [
  {
    label: 'Menu 1',
    items: [
      {
        label: 'User',
        icon: 'pi pi-fw pi-users',
        to: '/user'
      },
      {
        label: 'Crud',
        icon: 'pi pi-fw pi-pencil',
        to: '/crud'
      },
      { label: 'Table', icon: 'pi pi-fw pi-table', to: '/table' },
      { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/charts' }
    ]
  },
  {
    label: 'Menu 2',
    icon: 'pi pi-fw pi-briefcase',
    items: [
      {
        label: 'Not Found',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/notfound'
      },
      {
        label: 'Empty',
        icon: 'pi pi-fw pi-circle-off',
        to: '/empty'
      },
      {
        label: 'Access Denied',
        icon: 'pi pi-fw pi-lock',
        to: '/access'
      }
    ]
  }
];
