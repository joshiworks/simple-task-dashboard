import { useState } from 'react';

export type FormErrors<T> = Partial<Record<keyof T, string>>;

type ValidateFn<T> = (values: T) => FormErrors<T>;

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validate: ValidateFn<T>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...values, [name]: value };
    setValues(updated);
    setErrors(validate(updated));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
    setValues,
  };
};