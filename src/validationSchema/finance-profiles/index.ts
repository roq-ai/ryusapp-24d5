import * as yup from 'yup';

export const financeProfileValidationSchema = yup.object().shape({
  income: yup.number().integer().required(),
  expenses: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
