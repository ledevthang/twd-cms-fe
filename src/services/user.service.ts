import AXIOS from './axios';
import { Data, PaginationTypes } from '@/types/common';
import { UserTypes } from '@/types/user';

export function getUsers(params: PaginationTypes): Promise<Data<UserTypes>> {
  return AXIOS.get('/users', {
    params
  });
}
