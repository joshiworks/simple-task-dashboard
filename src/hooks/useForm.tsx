// src/hooks/useForm.ts
import { useState, useEffect } from 'react';

// Define a generic type for form errors
interface FormErrors<T> {
  [key: string]: string | undefined; 
}

// Define the props for the useForm hook
interface UseFormProps<T extends Record<string, any>> {
  initialValues: T;
  validate: (values: T) => FormErrors<T>; // Full form validation function
  onSubmit: (values: T) => void; // Callback for successful form submission
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    setValues(initialValues);
    setErrors({}); // Clear errors for new initial data
    validate(values);
    
  }, [initialValues]);

  // Handles input changes: updates value, then runs field-level validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Re-validate the specific field on change to provide immediate feedback
    const allErrors = validate({ ...values, [name]: value });
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (allErrors[name]) {
        newErrors[name] = allErrors[name];
      } else {
        // If no error for this field, remove its entry from the errors object
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  // Handles blur event: validates the field that was blurred
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    // Run full validation to get the specific error for the blurred field
    const allErrors = validate(values);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (allErrors[name]) {
        newErrors[name] = allErrors[name];
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  // Handles form submission: validates all fields
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true); // Indicate that a submission attempt is in progress
  };

  // Effect to trigger onSubmit callback when submission is attempted and there are no errors
  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      onSubmit(values); 
      setIsSubmitting(false); 
      setErrors({});
    } else if (isSubmitting && Object.keys(errors).length > 0) {
      setIsSubmitting(false); // If errors exist, stop the submission attempt
    }
  }, [errors, isSubmitting, onSubmit, values]);

  // Function to reset the form to its initial state
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};