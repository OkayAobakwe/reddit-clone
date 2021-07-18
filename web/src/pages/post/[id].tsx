import { Box, Heading } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';
import { Layout } from '../../components/Layout';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';

const Post = ({}) => {

  const [{data, fetching}] = useGetPostFromUrl()
  if(fetching){
    return(
      <Layout variant="regular">
        loading...
      </Layout>
    )
  }
  if(!data?.post){
    return(
      <Layout variant="regular">
        <Box>could not find post</Box>
      </Layout>
    )
  }
  return (
    <Layout variant="regular">
      <Heading>{data.post.title}</Heading>
      <Box mb={5}>{data?.post?.text}</Box>
      <EditDeletePostButtons id={data.post.id} creatorId={data.post.creator.id} />
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);