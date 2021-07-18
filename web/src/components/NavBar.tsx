import { Box, Button, Flex, Link, Heading} from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [{fetching: logoutFetching}, logout] = useLogoutMutation()
  let body = null;
  if(fetching){

  } else if (!data?.me){
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={3}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Flex align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr={8}>create post</Button>
        </NextLink>
        <Box mr={5} color="white">{data.me.username}</Box>
        <Button 
          onClick={() => logout()} 
          variant="link"
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Flex>
    )
  }
  return (
    <Flex bg="tomato" p={4} top={0} position="sticky" zIndex={1}>
      <Flex flex={1} align="center" maxWidth={800} m="auto">
        <NextLink href="/">
          <Link>
            <Heading>Lite Reddit Clone</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>
          {body}
        </Box>
      </Flex>
    </Flex>
  );
}