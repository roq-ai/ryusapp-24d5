import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getFinanceProfileById, updateFinanceProfileById } from 'apiSdk/finance-profiles';
import { Error } from 'components/error';
import { financeProfileValidationSchema } from 'validationSchema/finance-profiles';
import { FinanceProfileInterface } from 'interfaces/finance-profile';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function FinanceProfileEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<FinanceProfileInterface>(
    () => (id ? `/finance-profiles/${id}` : null),
    () => getFinanceProfileById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FinanceProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFinanceProfileById(id, values);
      mutate(updated);
      resetForm();
      router.push('/finance-profiles');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<FinanceProfileInterface>({
    initialValues: data,
    validationSchema: financeProfileValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Finance Profile
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="income" mb="4" isInvalid={!!formik.errors?.income}>
              <FormLabel>Income</FormLabel>
              <NumberInput
                name="income"
                value={formik.values?.income}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('income', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.income && <FormErrorMessage>{formik.errors?.income}</FormErrorMessage>}
            </FormControl>
            <FormControl id="expenses" mb="4" isInvalid={!!formik.errors?.expenses}>
              <FormLabel>Expenses</FormLabel>
              <NumberInput
                name="expenses"
                value={formik.values?.expenses}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('expenses', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.expenses && <FormErrorMessage>{formik.errors?.expenses}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'finance_profile',
    operation: AccessOperationEnum.UPDATE,
  }),
)(FinanceProfileEditPage);
