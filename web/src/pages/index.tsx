import React from "react";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => {
  const [{data}] = usePostsQuery();
  return (
    <Layout variant="regular">
      <NextLink href="/create-post">
        <Link>create post</Link>
      </NextLink>
      {!data ? null : data.posts.map((post) => <div key={post.id}>{post.title}</div>)}
    </Layout>
)}
export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
