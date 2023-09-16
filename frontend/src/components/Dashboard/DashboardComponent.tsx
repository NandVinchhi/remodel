'use client'

import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Divider,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  SimpleGrid,
  Spinner,
  Button
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { Card } from '@/components/Dashboard/Card'
import { AddCard } from './AddCard'
import { useState, useEffect } from 'react'
import { getEntities } from '../SupabaseFunctions'
import { Row, InsertDto, UpdateDto } from '../SupabaseTypes'

export const DashboardComponent = () => {
  const router = useRouter()
  const entityName = "app"
  const [entities, setEntities] = useState<Row<"Entities">[]>([])
  const [search, setSearch] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch)
  }

  useEffect(() => {
    setLoading(true)
    getEntities().then((data) => {
      setEntities(data)
      setLoading(false)
    });
  }, [])

  return (
      <Box as="section" bg="bg.red" pt={{ base: '4', md: '8' }} pb={{ base: '12', md: '24' }}>
        <Container>
          <Stack spacing="5">
            <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">

              <Box>
                <Stack direction='row'>
                  <Text textStyle="lg" fontWeight="medium">
                    Dashboard
                  </Text>
                  {loading && <Spinner size='sm' mt={1} ml={1} color="brand.500"/>}
                  
                </Stack>
                
                <Text color="fg.muted" textStyle="sm">
                  Create a new {entityName} or open an existing one 
                </Text>
              </Box>
              <InputGroup maxW={{ sm: 'xs' }}>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="fg.muted" boxSize="5" />
                </InputLeftElement>
                <Input value={search} onChange={e => handleSearch(e.target.value)} placeholder="Search" />
              </InputGroup>
            </Stack>
            <Divider />
            <SimpleGrid columns={{base: 1, lg: 3}} spacing={6}>
              
              <AddCard addEntity={(entity: any) => {
                let tempEntites = []
                entities.map(e => {
                  tempEntites.push(e)
                })
                tempEntites.push(entity)
                setEntities(tempEntites)
              }}/>
              {entities.map(entity => entity.name.toLowerCase().includes(search) && (
                <Card updateEntity={(id: number, newName: string) => {
                  let tempEntities: any[] = []
                  entities.map(e => {
                    if (e.id == id) {
                      let tempE = e
                      tempE.name = newName
                      tempEntities.push(tempE)
                    } else {
                      tempEntities.push(e)
                    }
                  })
                  setEntities(tempEntities)
                }} deleteEntity={(id: number) => {
                  let tempEntities: any[] = []
                  entities.map(e => {
                    if (e.id != id) {
                      tempEntities.push(e)
                    }
                  })
                  setEntities(tempEntities)
                }} title={entity.name} id={entity.id} createdDate={new Date(entity.created_at)}/>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>
  )
}