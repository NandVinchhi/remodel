'use client'

import {
    Box, Container, HStack, Button, Text, Stack, FormLabel, Input, VStack, Textarea, Select, Center
  } from '@chakra-ui/react'
  
import { NavbarComponent } from '@/components/Navbar/NavbarComponent'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/components/SupabaseFunctions'
import { Row } from '@/components/SupabaseTypes'
import { AudioRecorder } from '@/components/Input/AudioRecorder'
import { ImageUploader } from '@/components/Input/ImageUploader'
import { PdfUploader } from '@/components/Input/PdfUploader'
import { CsvUploader } from '@/components/Input/CsvUploader'

const Home = ({ params }: { params: { id: string } }) => {
  const router = useRouter()

  const [name, setName] = useState<string>("")

  const [inputs, setInputs] = useState<Row<'InputBlocks'>[]>([])

  const [attributeMap, setAttributeMap] = useState({})

  const [disabled, setDisabled] = useState<boolean>(true)

  const setKey = (key, value) => {
    let k = attributeMap
    k[key] = value
    setAttributeMap(k)

    inputs.map(i => {
        if (!k[i.attribute]) {
            setDisabled(false)
            return
        }
    })

    setDisabled(true)
  }

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
      <Box border= "1px solid #EDF2F7" boxShadow="sm" bg="white" mb="16" borderRadius="lg" p="6">
        <Stack spacing="5">
          <Stack spacing="1">
            <Text textStyle="xl" mb="1" fontWeight="bold">
              {name}
            </Text>
          </Stack>
          {inputs.map(i => {
            switch (i.input_type) {
                case 'voice':
                    return (
                        <Stack mt="1">
                        <Text textStyle="sm" fontWeight="medium">{i.title}</Text>
                        <AudioRecorder/>
                        </Stack>
                    )
                case 'text':
                    return (
                        <Stack mt="1">
                        <Text textStyle="sm" fontWeight="medium">{i.title}</Text>
                        <Textarea onChange={e => {
                            setKey(i.attribute, e.target.value)
                        }}/>
                        </Stack>
                    )
                case 'image':
                    return (
                        <Stack mt="1">
                        <Text textStyle="sm" fontWeight="medium">{i.title}</Text>
                        <ImageUploader/>
                        </Stack>
                    )
                case 'pdf':
                    return (
                        <Stack mt="1">
                        <Text textStyle="sm" fontWeight="medium">{i.title}</Text>
                        <PdfUploader/>
                        </Stack>
                    )
                case 'csv':
                    return (
                        <Stack mt="1">
                        <Text textStyle="sm" fontWeight="medium">{i.title}</Text>
                        <CsvUploader/>
                        </Stack>
                    )
                case 'date':
                    return (
                        <Stack mt="1">
                        <Text textStyle="sm" fontWeight="medium">{i.title}</Text>
                        <Input type='date' onChange={e => {
                            setKey(i.attribute, e.target.value)
                        }}/>
                        </Stack>
                    )
                case 'mcq':
                    return (
                        <Stack mt="1">
                        <Text textStyle="sm" fontWeight="medium">{i.title}</Text>
                        <Select placeholder='Select...' onChange={e => {
                            setKey(i.attribute, e.target.value)
                        }}>
                            {i.mcq_options?.map(x => (
                                <option value={x}>{x}</option>
                            ))}
                            
                        </Select>
                        </Stack>
                    )
            }
          })}
          <Stack direction={{ base: 'column', md: 'row' }} mt="2" spacing="3" >
            <Button onClick ={() => console.log(attributeMap)} w="full" isDisabled={false} >Submit</Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
    </Box>
  )
}

export default Home