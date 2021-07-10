import React, { InputHTMLAttributes } from 'react'
import { useField } from "formik";
import { Box, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({label, size: _, textarea, ...props}) => {
  const [field, {error}] = useField(props);
  let InputOrText: any = Input;
  if(textarea){
    InputOrText = Textarea
  }
  return (
    <Box mt={4}>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <InputOrText 
          {...field}
          {...props}
          id={field.name}
        />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </Box>  
      );
}