import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react'
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { useUpdatePostMutation, usePostQuery } from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetIntId } from '../../../utils/useGetIntId';

const EditPost: React.FC = () => {
  const router = useRouter()
  const intId = useGetIntId()
  const [{data, fetching}] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId
    }
  })
  
  const [, updatePost] = useUpdatePostMutation()
  if(fetching){
    return(
      <Layout variant="small">
        <div>loading...</div>
      </Layout>
    )
  }
  if(!data?.post){
    return(
      <Layout variant="small">
        <Box>could not find post...</Box>
      </Layout>
    )
  }

  return (
    <Layout variant="small">
      <Formik
      initialValues={{ text: data.post.text, title: data.post.title }}
      onSubmit={async (values) => {
        
         await updatePost({id: intId, ...values})
        router.back()
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
          <Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting}>update post</Button>
        </Form>
      )}
    </Formik>
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient)(EditPost);