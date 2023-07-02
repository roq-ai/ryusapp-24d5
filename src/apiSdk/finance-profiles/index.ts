import axios from 'axios';
import queryString from 'query-string';
import { FinanceProfileInterface, FinanceProfileGetQueryInterface } from 'interfaces/finance-profile';
import { GetQueryInterface } from '../../interfaces';

export const getFinanceProfiles = async (query?: FinanceProfileGetQueryInterface) => {
  const response = await axios.get(`/api/finance-profiles${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFinanceProfile = async (financeProfile: FinanceProfileInterface) => {
  const response = await axios.post('/api/finance-profiles', financeProfile);
  return response.data;
};

export const updateFinanceProfileById = async (id: string, financeProfile: FinanceProfileInterface) => {
  const response = await axios.put(`/api/finance-profiles/${id}`, financeProfile);
  return response.data;
};

export const getFinanceProfileById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/finance-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinanceProfileById = async (id: string) => {
  const response = await axios.delete(`/api/finance-profiles/${id}`);
  return response.data;
};
