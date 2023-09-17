'use client'

import {
    Box, HStack, Button, Text, Stack, Input, VStack
  } from '@chakra-ui/react'
  
import { NavbarComponent  } from '@/components/Navbar/NavbarComponent'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Home = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  return (
    <Box as="section" minH="md">
      <NavbarComponent showButtons={false} isLoggedIn={true}/>
      
    </Box>
  )
}

export default Home