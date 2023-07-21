import { Demo } from '@/types/demo';

export const CustomerService = {
  getCustomersMedium() {
    return fetch('/data/customers-medium.json', {
      headers: { 'Cache-Control': 'no-cache' }
    })
      .then(res => res.json())
      .then(d => d.data as Demo.Customer[]);
  },

  getCustomersLarge() {
    return fetch('/data/customers-large.json', {
      headers: { 'Cache-Control': 'no-cache' }
    })
      .then(res => res.json())
      .then(d => d.data as Demo.Customer[]);
  }
};
