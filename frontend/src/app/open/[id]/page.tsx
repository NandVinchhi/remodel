'use client'

import {
    Box, HStack, Button, Text, Stack, Input, VStack
  } from '@chakra-ui/react'
  
import { NavbarComponent  } from '@/components/Navbar/NavbarComponent'
import { AiOutlinePlus } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { getSession, supabase } from '@/components/SupabaseFunctions'
import { useRouter } from 'next/navigation'
import { Row } from '@/components/SupabaseTypes'
import { InputCard } from '@/components/Open/InputCard'
import { OutputCard } from '@/components/Open/OutputCard'
import { ProcessorCard } from '@/components/Open/ProcessorCard'
import { AddInputCard } from '@/components/Open/AddInputCard'
import { AddOutputCard } from '@/components/Open/AddOutputCard'
import { AddProcessorCard } from '@/components/Open/AddProcessorCard'

const Home = ({ params }: { params: { id: string } }) => {
  const router = useRouter()

  const [name, setName] = useState<string>("")
  const [inputs, setInputs] = useState<Row<'InputBlocks'>[]>([])
  const [processors, setProcessors] = useState<Row<'ProcessorBlocks'>[]>([])
  const [outputs, setOutputs] = useState<Row<'OutputBlocks'>[]>([])

  const [addInput, setAddInput] = useState<boolean>(false);
  const [addProcessor, setAddProcessor] = useState<boolean>(false);
  const [addOutput, setAddOutput] = useState<Boolean>(false);

  const validateAttribute = (a: string): boolean => {
    let final: boolean = true
    inputs.map(i => {
      
      if (a == i.attribute) {
        final = false
      }
    })
    processors.map(o => {
      if (a == o.attribute) {
        final = false
      }
    })

    return final
  }

  useEffect(() => {
    getSession().then(result => {
        if (!result.data.session) {
            router.push("/login")
        } else {
          try {
            supabase.from('Entities').select("*").eq("id", params.id).then(res => {
              if (res.data?.length > 0) {
                setName(res.data[0].name)
                supabase.from('InputBlocks').select("*").eq("entity_id", params.id).then(res => {
                  setInputs(res.data? res.data  : [])
                })
                supabase.from('ProcessorBlocks').select("*").eq("entity_id", params.id).then(res => {
                  setProcessors(res.data? res.data  : [])
                })
                supabase.from('OutputBlocks').select("*").eq("entity_id", params.id).then(res => {
                  setOutputs(res.data? res.data  : [])
                })
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
                      <Button size="xs" colorScheme="gray" href={"/share/" + params.id} as="a" target="_blank" variant="solid">Share</Button>
                  
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
              <Text textStyle="lg" fontWeight="medium">Inputs</Text>
              <Text color="fg.muted" textStyle="sm" mb="4">
                Elements that can accept data in various forms such as text, image, CSV, etc.
              </Text>
              <Stack direction="column" spacing="2">
                {inputs.map(row => (
                  <InputCard delete = {(id: number): void => {
                    let tempInputs: Row<'InputBlocks'>[] = []
                    inputs.map(row => {
                      if (row.id != id) {
                        tempInputs.push(row)
                      }
                    })
                    setInputs(tempInputs)
                    supabase.from('InputBlocks').delete().eq("id", id).then(res => {
                      console.log(res)
                    })
                  }} row ={row}/>
                ))}

                { addInput ? <AddInputCard validateAttribute={validateAttribute} add = {(row: Row<'InputBlocks'>) => {
                  let temp = inputs
                  temp.push(row)
                  setInputs(temp)
                  setAddInput(false)
                }} entity_id={parseInt(params.id)} cancel = {() => setAddInput(false)}/> : <Button mt="2" onClick = {() => setAddInput(true)} w="full" leftIcon={<AiOutlinePlus/>}>Add</Button>}
               
              </Stack>
             
          </Box>
          <Box
                borderWidth={{ base: "0", md: "1px" }}
                p={{ base: "0", md: "4" }}
                borderRadius="lg"
                w="full"
                mt="4"
                mx="2"
            >
              <Text textStyle="lg" fontWeight="medium">AI Models</Text>
              <Text color="fg.muted" textStyle="sm" mb="4">
                Send your data to cutting edge LLMs or diffusion models, with custom prompts.
              </Text>
              <Stack direction="column" spacing="2">
                {processors.map(row => (
                  <ProcessorCard delete = {(id: number): void => {
                    let tempProcessors: Row<'ProcessorBlocks'>[] = []
                    processors.map(row => {
                      if (row.id != id) {
                        tempProcessors.push(row)
                      }
                    })
                    setProcessors(tempProcessors)
                    supabase.from('ProcessorBlocks').delete().eq("id", id).then(res => {
                      console.log(res)
                    })
                  }} row ={row}/>
                ))}
                { addProcessor ? <AddProcessorCard getAttributes={(): string[] => {
                  let l: string[] = []
                  inputs.map(i => {
                    l.push(i.attribute)
                  })
                  return l
                }} validateAttribute={validateAttribute} add = {(row: Row<'ProcessorBlocks'>) => {
                  let temp = processors
                  temp.push(row)
                  setProcessors(temp)
                  setAddProcessor(false)
                }} entity_id={parseInt(params.id)} cancel = {() => setAddProcessor(false)}/> : <Button mt="2" onClick = {() => setAddProcessor(true)} w="full" leftIcon={<AiOutlinePlus/>}>Add</Button>}
               
              </Stack>
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
              <Text textStyle="lg" fontWeight="medium">Outputs</Text>
              <Text color="fg.muted" textStyle="sm" mb="4">
                Do more with your AI generations by specifying output formats and actions.
              </Text>
              <Stack direction="column" spacing="2">
                {outputs.map(row => (
                  <OutputCard delete = {(id: number): void => {
                    let tempOutputs: Row<'OutputBlocks'>[] = []
                    outputs.map(row => {
                      if (row.id != id) {
                        tempOutputs.push(row)
                      }
                    })
                    setOutputs(tempOutputs)
                    supabase.from('OutputBlocks').delete().eq("id", id).then(res => {
                      console.log(res)
                    })
                  }} row ={row}/>
                ))}
                { addOutput ? <AddOutputCard getTextAttributes={(): string[] => {
                  let l: string[] = []
                  inputs.map(i => {
                    if (i.outgoing_type == 'text') {
                      l.push(i.attribute)
                    }
                  })
                  processors.map(o => {
                    if (o.outgoing_type == 'text') {
                      l.push(o.attribute)
                    }
                  })
                  return l
                }} getImageAttributes={(): string[] => {
                  let l: string[] = []
                  inputs.map(i => {
                    if (i.outgoing_type == 'image') {
                      l.push(i.attribute)
                    }
                  })
                  processors.map(o => {
                    if (o.outgoing_type == 'image') {
                      l.push(o.attribute)
                    }
                  })
                  return l
                }} getCsvAttributes={(): string[] => {
                  let l: string[] = []
                  inputs.map(i => {
                    if (i.outgoing_type == 'csv') {
                      l.push(i.attribute)
                    }
                  })
                  processors.map(o => {
                    if (o.outgoing_type == 'csv') {
                      l.push(o.attribute)
                    }
                  })
                  return l
                }}  validateAttribute={validateAttribute} add = {(row: Row<'OutputBlocks'>) => {
                  let temp = outputs
                  temp.push(row)
                  setOutputs(temp)
                  setAddOutput(false)
                }} entity_id={parseInt(params.id)} cancel = {() => setAddOutput(false)}/> : <Button mt="2" onClick = {() => setAddOutput(true)} w="full" leftIcon={<AiOutlinePlus/>}>Add</Button>}
               
              </Stack>
          </Box>
      </Stack>
    </Box>
  )
}

export default Home