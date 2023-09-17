import { Box, FormControl, FormLabel, Input, Stack, Text, useToken,
    Badge, Button, HStack, VStack, Select, Spacer, Center } from '@chakra-ui/react'

 import { useState } from 'react'
 import { Row, Enum } from '../SupabaseTypes'
 import { supabase } from '../SupabaseFunctions'
 import { CustomTextInput } from '../Input/CustomTextInput'
 
 interface CardProps {
     add(row: Row<'ProcessorBlocks'>): void,
     cancel(): void,
     entity_id: number,
     validateAttribute(a: string): boolean,
     getAttributes(): string[]
 }
 
 export const AddProcessorCard = (props: CardProps) => {
     const [brand500] = useToken('colors', ['brand.500'])

     const outputTypeMap = {
        "text": "Display Text",
        "image": "Display Image",
        "sms": "Send SMS",
        "gsheet": "Google Sheets",
        "email": "Send Email"
     }

     const processorMap = {
         "text2image": "Stable Diffusion",
         "text2text": "Lllama 2"
     }

     const inputTypeMap = {
        "text": "Text Input", "image": "Image Upload", "voice": "Voice Record", "pdf": "PDF Upload", "csv": "CSV Upload", "mcq": "Multiple Choice", "date": "Date Select"
    }

     const [processorType, setProcessorType] = useState<Enum<'processor_type'>>("text2text");
     const [attribute, setAttribute] = useState<string>("")
     const [prompt, setPrompt] = useState<string>("")
     const [disabled, setDisabled] = useState<boolean>(true)
     const [loading, setLoading] = useState<boolean>(false)

     const [returnType, setReturnType] = useState<string>("text")

     const validate = (attribute: string): void => {
        if (attribute.length == 0) {
            setDisabled(true);
            return
        }

        if (props.validateAttribute(attribute) == false) {
            setDisabled(true)
            return
        }

        setDisabled(false)
     }

     const handleConfirm = () => {
        setLoading(true)

        supabase
            .from('ProcessorBlocks')
            .insert([
                { entity_id: props.entity_id, prompt: prompt, attribute: attribute, processor_type: processorType, outgoing_type: processorType == "text2image" ? "image" : (returnType == "text" ? "text" : "csv"), incoming_type: "text"},
            ])
            .select()
            .then(res => {
                props.add(res.data[0])
                setLoading(false)
            })
        
     }

     return (
         <>
             <Box mt="2" border= "1px solid #EDF2F7" boxShadow="sm" bg="white" borderRadius="lg" p="4">
                <Stack spacing="1">
                    <HStack>
                        <FormControl id="processorType">
                            <FormLabel>AI model</FormLabel>
                            <Select value={processorType} onChange={e => setProcessorType(e.target.value)}>
                                {Object.keys(processorMap).map(val => (
                                    <option value={val}>{processorMap[val]}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl id="attribute">
                            <FormLabel>Attribute</FormLabel>
                            <Input value={attribute} onChange={e => {
                                
                                const regex = /[^A-Za-z0-9_]/g;
                                const final = e.target.value.replace(regex, '').toUpperCase()
                                setAttribute(final)
                                validate(final)
                            }}></Input>
                        </FormControl>
                    </HStack>

                    <FormControl mt="2" id="promptMaker">
                        <FormLabel>Prompt</FormLabel>
                        <CustomTextInput text={prompt} setValue={(val: string) => setPrompt(val)} attributes={props.getAttributes()} />
                    </FormControl>

                    { processorType == "text2text" && (
                        <FormControl mt="2" id="generateAs">
                            <FormLabel>Generate as</FormLabel>
                            <Select onChange={(e) => setReturnType(e.target.value)} value={returnType}>
                                <option value="text">Plain text</option>
                                <option value="csv">CSV row</option>
                            </Select>
                        </FormControl>
                    )}
                    


                    { disabled && attribute.length > 0 &&  (
                            <Text size="2xs" mt="2" color='red'>* Attribute names must be unique</Text>                        
                    )}
                    
                    
                    <Stack mt="2" direction="row" justify="space-between" spacing="2">
                        <Spacer/>
                        <VStack>
                        <HStack spacing ="2">
                            <Button w="auto" colorScheme="red" onClick={() => {
                                setProcessorType("text2text")
                                setAttribute("")
                                setPrompt("")
                                setDisabled(true)
                                props.cancel()
                            }}>Cancel</Button>
                            <Button onClick = {handleConfirm} isLoading = {loading} w="auto" isDisabled = {disabled}>Confirm</Button>
                        </HStack>
                        </VStack>
                    </Stack>    
                </Stack>
             </Box>
         </>
     )
 }