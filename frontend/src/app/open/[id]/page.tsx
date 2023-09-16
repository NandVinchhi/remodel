'use client'

import {
    Box, HStack, Button, Text, Stack
  } from '@chakra-ui/react'
  
import { NavbarComponent  } from '@/components/Navbar/NavbarComponent'
import { AiOutlinePlus } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { getSession, supabase } from '@/components/SupabaseFunctions'
import { useRouter } from 'next/navigation'

const Home = ({ params }: { params: { id: string } }) => {
  const router = useRouter()

  const [name, setName] = useState<string>("")
  useEffect(() => {
    getSession().then(result => {
        if (!result.data.session) {
            router.push("/login")
        } else {
          try {
            supabase.from('Entities').select("*").eq("id", params.id).then(res => {

              if (res.data?.length > 0) {
                setName(res.data[0].name)
              } else {
                router.push("/dashboard")
              }
            })
          } catch {
            router.push("/dashboard")
          }
         
        }
    })
  }, [])
  return (
    <Box as="section" minH="md">
      <NavbarComponent showButtons={true} isLoggedIn={true}/>
      <Box borderBottomWidth="1px" py="2" px="4" bg="bg.surface">
            <HStack spacing="2">
                  <Text>{name}</Text>
                      
                      <Button ml="3" size="xs" colorScheme="gray" onClick={() => {router.push("/dashboard")}} variant="solid">Dashboard</Button>
                      <Button size="xs" colorScheme="gray" onClick={() => {router.push("/share/" + params.id)}} variant="solid">Share</Button>
                  
            </HStack>
        </Box>

      <Stack spacing={0} direction="row" justify="flex-between">
          <Box
                borderWidth={{ base: "0", md: "1px" }}
                p={{ base: "0", md: "4" }}
                borderRadius="lg"
                w="full"
                mt="4"
                ml="4"
                mr="2"
            >
              <Text size="lg" fontWeight="bold">Inputs</Text>
              <Button mt="3" w="full" leftIcon={<AiOutlinePlus/>}>Add</Button>
          </Box>
          <Box
                borderWidth={{ base: "0", md: "1px" }}
                p={{ base: "0", md: "4" }}
                borderRadius="lg"
                w="full"
                mt="4"
                mx="2"
            >
              <Text size="lg" fontWeight="bold">AI Models</Text>
              <Button mt="3" w="full" leftIcon={<AiOutlinePlus/>}>Add</Button>
          </Box>
          <Box
                borderWidth={{ base: "0", md: "1px" }}
                p={{ base: "0", md: "4" }}
                borderRadius="lg"
                w="full"
                mt="4"
                mr="4"
                ml="2"
            >
              <Text size="lg" fontWeight="bold">Outputs</Text>
              <Button mt="3" w="full" leftIcon={<AiOutlinePlus/>}>Add</Button>
          </Box>
      </Stack>
    </Box>
  )
}

export default Home