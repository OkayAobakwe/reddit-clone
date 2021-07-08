import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
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
      <Flex>
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
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>
        {body}
      </Box>
    </Flex>
  );
}