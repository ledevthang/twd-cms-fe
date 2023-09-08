import { AppMenuItem } from '@/types/layout';

export const model: AppMenuItem[] = [
  {
    label: 'User management',
    items: [
      {
        label: 'KYC management',
        to: '/kycManagement'
      }
    ]
  },
  {
    label: 'Campaign management',
    items: [
      {
        label: 'Campaign management',
        to: '/campaign'
      }
    ]
  }
];
