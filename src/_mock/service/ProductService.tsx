import { Demo } from '@/types/demo';

export const ProductService = {
  getProductsSmall() {
    return fetch('/data/products-small.json', {
      headers: { 'Cache-Control': 'no-cache' }
    })
      .then(res => res.json())
      .then(d => d.data as Demo.Product[]);
  },

  getProducts() {
    return fetch('/data/products.json', {
      headers: { 'Cache-Control': 'no-cache' }
    })
      .then(res => res.json())
      .then(d => d.data as Demo.Product[]);
  },

  getProductsWithOrdersSmall() {
    return fetch('/data/products-orders-small.json', {
      headers: { 'Cache-Control': 'no-cache' }
    })
      .then(res => res.json())
      .then(d => d.data as Demo.Product[]);
  }
};
