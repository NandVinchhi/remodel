'use client'

import {
    Box, Container, HStack, Button, Text, Stack, FormLabel, Image, Input, VStack, Textarea, Select, Center
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

  const [outputs, setOutputs] = useState<any>([])

  const [attributeMap, setAttributeMap] = useState({})

  const [loading, setLoading] = useState<boolean>(false)
  const [generated, setGenerated] = useState<boolean>(false)


  const setKey = (key, value) => {
    let k = attributeMap
    k[key] = value
    setAttributeMap(k)
  }

  const handleSubmit = () => {
    console.log(attributeMap)
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin','http://localhost:3000');
    setLoading(true)
    fetch("http://127.0.0.1:5000/call", {body: JSON.stringify({data: attributeMap, id: params.id}), headers: headers, method: "POST"}).then(res => res.json()).then(result => {
        console.log(result)
        setOutputs(result.data)
        setLoading(false)
        setGenerated(true)
    })
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

          { !generated && (<>
          
          
          
          {inputs.map(i => {
            switch (i.input_type) {
                case 'voice':
                    return (
                        <Stack mt="1">
                        <Text textStyle="sm" fontWeight="medium">{i.title}</Text>
                        <AudioRecorder setValue = {(k) => {
                            setKey(i.attribute, k)
                        }}/>
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
                        <ImageUploader setValue = {(k) => {
                            setKey(i.attribute, k)
                        }}/>
                        </Stack>
                    )
                case 'pdf':
                    return (
                        <Stack mt="1">
                        <Text textStyle="sm" fontWeight="medium">{i.title}</Text>
                        <PdfUploader setValue = {(k) => {
                            setKey(i.attribute, k)
                        }}/>
                        </Stack>
                    )
                case 'csv':
                    return (
                        <Stack mt="1">
                        <Text textStyle="sm" fontWeight="medium">{i.title}</Text>
                        <CsvUploader setValue = {(k) => {
                            setKey(i.attribute, k)
                        }}/>
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
            <Button onClick ={handleSubmit} w="full" isLoading={loading}>Submit</Button>
          </Stack>

          </>)}

          {generated && (
            <>
                { outputs.map(o => (
                    <>
                        <Text textStyle="md" fontWeight="bold">{o.title}</Text>
                        {o.type == "text" ? <Text textStyle="sm" fontWeight={"md"}>{o.data}</Text> : <Image w="80" borderRadius={10} src={o.url}/>}
                    </>
                ))}

            <Stack direction={{ base: 'column', md: 'row' }} mt="2" spacing="3" >
                <Button onClick ={() => window.location.reload(false)} w="full" isLoading={loading}>Reload</Button>
            </Stack>
            </>
          )}
        </Stack>
        
      </Box>
    </Container>
    </Box>
  )
}

export default Home