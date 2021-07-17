import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery, useVoteMutation } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link, Stack, Box, Text, Heading, Flex, Button, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 2,
    cursor: null as null | string
  })
  const [{data, fetching}] = usePostsQuery({
    variables,
  });
  const [, vote] = useVoteMutation();
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
          <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
            <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
              <IconButton 
                icon={<ChevronUpIcon/>} 
                aria-label="updoot post"
                onClick={() => {
                  vote({
                    postId: post.id,
                    value: 1
                  })
                }}
                colorScheme={post.voteStatus === 1 ? "green": undefined}
              />
              {post.points}
              <IconButton
                icon={<ChevronDownIcon/>} 
                aria-label="downdoot post"
                onClick={() => {
                  vote({
                    postId: post.id,
                    value: -1
                  })
                }}
                colorScheme={post.voteStatus === -1 ? "red": undefined}
              />
            </Flex>
            <Box>
              <Heading fontSize="xl">{post.title}</Heading>
              <Text>posted by {post.creator.username}</Text>
              <Text mt={4}>{post.textSnippet}</Text>
            </Box>
          </Flex>
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
