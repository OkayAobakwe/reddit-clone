import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link, Stack, Box, Text, Heading, Flex, Button } from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 2,
    cursor: null as null | string
  })
  const [{data, fetching}] = usePostsQuery({
    variables,
  });
  return (
    <Layout variant="regular">
      <Flex>
        <Heading>RedditClone</Heading>
      <NextLink href="/create-post">
        <Link ml="auto">create post</Link>
      </NextLink>
      </Flex>
      <br />
      {!data ? (
        <div>loading...</div>
      ) 
       :
      (
      <Stack spacing={8}>
        {data.posts.posts.map((post) => (
          <Box key={post.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{post.title}</Heading>
            <Text mt={4}>{post.textSnippet}</Text>
          </Box>
        ))}
      </Stack>)}
      { data && data.posts.hasMore?
        <Flex>
          <Button 
            isLoading={fetching} 
            m="auto" 
            my={8}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length -1].createdAt
              })
            }}
          >
            load more...
          </Button>
        </Flex> : null
      } 
    </Layout>
)}
export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
