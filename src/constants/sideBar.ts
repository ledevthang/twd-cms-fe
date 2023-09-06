import { AppMenuItem } from '@/types/layout';

export const model: AppMenuItem[] = [
  {
    label: 'User management',
    items: [
      {
        label: 'KYC management',
        to: '/crud'
      },
    ]
  },
  // {
  //   label: 'Menu 2',
  //   icon: 'pi pi-fw pi-briefcase',
  //   items: [
  //     {
  //       label: 'Not Found',
  //       icon: 'pi pi-fw pi-exclamation-circle',
  //       to: '/notfound'
  //     },
  //     {
  //       label: 'Empty',
  //       icon: 'pi pi-fw pi-circle-off',
  //       to: '/empty'
  //     },
  //     {
  //       label: 'Access Denied',
  //       icon: 'pi pi-fw pi-lock',
  //       to: '/access'
  //     }
  //   ]
  // }
];
