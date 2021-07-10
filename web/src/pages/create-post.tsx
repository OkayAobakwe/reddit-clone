import { Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useEffect } from 'react'
import { InputField } from '../components/InputField';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';

const CreatePost: React.FC<{}> = ({}) => {
  const [{fetching, data}] = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if(!fetching && !data?.me){
      router.replace("/login?next=" + router.pathname)
    }
  }, [fetching, data, router])
  const [, createPost] = useCreatePostMutation()
  return (
    <Layout variant="small">
      <Formik
      initialValues={{ text: "", title: "" }}
      onSubmit={async (values) => {
        const { error } = await createPost({input: values})
        if(!error){
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="title"
            placeholder="title"
            label="Title"
          />
          <InputField
            name="text"
            placeholder="text..."
            label="Body"
            textarea
          />
          <Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>create post</Button>
        </Form>
      )}
    </Formik>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(CreatePost)