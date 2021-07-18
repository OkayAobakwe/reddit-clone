import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery, useVoteMutation, useMeQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link, Stack, Box, Text, Heading, Flex, Button, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 4,
    cursor: null as null | string
  })
  const [{data: meData}] = useMeQuery()
  const [{data, fetching}] = usePostsQuery({
    variables,
  });
  const [, vote] = useVoteMutation();
  return (
    <Layout variant="regular">
      {!data ? (
        <div>loading...</div>
      ) 
       :
      (
      <Stack spacing={8}>
        {data.posts.posts.map((post) => !post ? null : (
          <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
            <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
              <IconButton 
                icon={<ChevronUpIcon/>} 
                aria-label="updoot post"
                onClick={() => {
                  if(post.voteStatus === 1){
                    return;
                  }
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
                  if(post.voteStatus === -1){
                    return;
                  }
                  vote({
                    postId: post.id,
                    value: -1
                  })
                }}
                colorScheme={post.voteStatus === -1 ? "red": undefined}
              />
            </Flex>
            <Box flex={1}>
              <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                <Link>
                  <Heading fontSize="xl">{post.title}</Heading>
                </Link>
              </NextLink>
              <Text>posted by {post.creator.username}</Text>
              <Flex>
                <Text mt={4} flex={1}>{post.textSnippet}</Text>
                <Box ml="auto">
                  <EditDeletePostButtons id={post.id} creatorId={post.creator.id} />
                </Box>
              </Flex>
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
