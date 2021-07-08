import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Button } from "@chakra-ui/react";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}


const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [,register] = useRegisterMutation()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, {setErrors}) => {
          const response = await register({options: values});
          if(response.data?.register.errors){
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user){
            router.push("/")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              placeholder="email"
              label="Email"
            />
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <InputField
              type="password"
              name="password"
              placeholder="Enter password"
              label="Password"
            />
            <Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>register</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
