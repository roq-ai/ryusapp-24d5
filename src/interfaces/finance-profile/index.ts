import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FinanceProfileInterface {
  id?: string;
  income: number;
  expenses: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface FinanceProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
