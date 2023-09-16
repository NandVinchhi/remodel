'use client'

import {
    Box
  } from '@chakra-ui/react'
  
import { NavbarComponent  } from '@/components/Navbar/NavbarComponent'
import { DashboardComponent } from '@/components/Dashboard/DashboardComponent'
import { useEffect } from 'react'
import { getSession } from '@/components/SupabaseFunctions'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()
  useEffect(() => {
    getSession().then(result => {
        if (!result.data.session) {
            router.push("/login")
        }
    })
  }, [])
  return (
    <Box as="section" minH="md">
      <NavbarComponent showButtons={true} isLoggedIn={true}/>
      <DashboardComponent/>
    </Box>
  )
}

export default Home