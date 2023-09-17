'use client'

import {
    Box, Container, HStack, Button, Text, Stack, Input, VStack
  } from '@chakra-ui/react'
  
import { NavbarComponent  } from '@/components/Navbar/NavbarComponent'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/components/SupabaseFunctions'
import { Row } from '@/components/SupabaseTypes'

const Home = ({ params }: { params: { id: string } }) => {
  const router = useRouter()

  const [name, setName] = useState<string>("")

  const [inputs, setInputs] = useState<Row<'InputBlocks'>[]>([])

  useEffect (() => {
    supabase.from('Entities').select("*").eq("id", params.id).then(e => {
        setName(e.data[0].name)
    })
    supabase.from('InputBlocks').select("*").eq("entity_id", params.id).then(x => {
        setInputs(x.data)
    })
  }, [supabase])
  return (
    <Box as="section" minH="md">
      <NavbarComponent showButtons={false} isLoggedIn={true}/>
      <Container maxW="3xl">
      <Box border= "1px solid #EDF2F7" boxShadow="sm" bg="white" borderRadius="lg" p="6">
        <Stack spacing="5">
          <Stack spacing="1">
            <Text textStyle="lg" fontWeight="medium">
              {name}
            </Text>
            
          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }} spacing="3">
            <Button variant="secondary">Skip</Button>
            <Button>Download</Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
    </Box>
  )
}

export default Home