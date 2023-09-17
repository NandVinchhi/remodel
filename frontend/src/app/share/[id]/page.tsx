'use client'

import {
    Box, HStack, Button, Text, Stack, Input, VStack
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
      
    </Box>
  )
}

export default Home