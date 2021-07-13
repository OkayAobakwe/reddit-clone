import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient, NextComponentType } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';

const ChangePassword: NextPage = ({}) => {
  const router = useRouter()
  const [, changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState("")
  
    return (
      <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, {setErrors}) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token: typeof router.query.token === "string" ? router.query.token : "",
          })
          if(response.data?.changePassword.errors){
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if("token" in errorMap){
              setTokenError(errorMap.token);
            }
            setErrors(errorMap)
          } else if (response.data?.changePassword.user){
            router.push("/")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New password"
              type="password"
            />
           {tokenError ? <Box color="red">{tokenError}</Box> : null}
            <Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>change password</Button>
          </Form>
        )}
      </Formik>
    </Wrapper> 
    );
}

export default withUrqlClient(createUrqlClient)(ChangePassword as unknown as NextComponentType)