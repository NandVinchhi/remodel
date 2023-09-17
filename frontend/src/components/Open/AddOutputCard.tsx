import { Box, FormControl, FormLabel, Input, Stack, Text, useToken,
    Badge, Button, HStack, VStack, Select, Spacer, Center } from '@chakra-ui/react'

 import { useState } from 'react'
 import { Row, Enum } from '../SupabaseTypes'
 import { supabase } from '../SupabaseFunctions'
 import { CustomTextInput } from '../Input/CustomTextInput'

 interface CardProps {
     add(row: Row<'OutputBlocks'>): void,
     cancel(): void,
     entity_id: number,
     validateAttribute(a: string): boolean,
     getTextAttributes(): string[]
     getImageAttributes(): string[]
     getCsvAttributes(): string[]
 }
 
 export const AddOutputCard = (props: CardProps) => {
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

     const [outputType, setOutputType] = useState<Enum<'output_type'>>("text");
     const [attribute, setAttribute] = useState<string>("")
     const [textContent, setTextContent] = useState<string>("")

     const [email, setEmail] = useState<string>("")
     const [gsheetUrl, setGsheetUrl] = useState<string>("")
     const [phoneNumber, setPhoneNumber] = useState<string>("")
     const [emailSubject, setEmailSubject] = useState<string>("")
     const [title, setTitle] = useState<string>("")

     const [disabled, setDisabled] = useState<boolean>(true)
     const [loading, setLoading] = useState<boolean>(false)

     const handleConfirm = () => {
        setLoading(true)

        supabase
            .from('OutputBlocks')
            .insert([
                { attribute: attribute, email: email, email_subject: emailSubject, entity_id: props.entity_id, gsheet_url: gsheetUrl, incoming_type: (outputType == "image") ? "image" : (outputType == "gsheet" ? "csv" : "text"), output_type: outputType, phone_number: phoneNumber, text_content: textContent, title: title },
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
                            <FormLabel>Output type</FormLabel>
                            <Select value={outputType} onChange={e => setOutputType(e.target.value)}>
                                {Object.keys(outputTypeMap).map(val => (
                                    <option value={val}>{outputTypeMap[val]}</option>
                                ))}
                            </Select>
                        </FormControl>
                       
                    </HStack>

                    {(outputType == "text" || outputType == "image") && (
                        <FormControl mt="2" id="title">
                            <FormLabel>Title</FormLabel>
                            <Input value={title} onChange={e => setTitle(e.target.value)} />
                        </FormControl>
                    )}

                    {(outputType == "email") && (
                        <>
                        <FormControl mt="2" id="email">
                            <FormLabel>Email</FormLabel>
                            <Input value={email} onChange={e => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl mt="2" id="subject">
                            <FormLabel>Subject</FormLabel>
                            <Input value={emailSubject} onChange={e => setEmailSubject(e.target.value)} />
                        </FormControl>
                        </>
                    )}

                    {(outputType == "sms") && (
                        <>
                        <FormControl mt="2" id="phone">
                            <FormLabel>Phone</FormLabel>
                            <Input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                        </FormControl>
                        
                        </>
                    )}

                    {(outputType == "gsheet") && (
                        <>
                        <FormControl mt="2" id="url">
                            <FormLabel>URL</FormLabel>
                            <Input value={gsheetUrl} onChange={e => setGsheetUrl(e.target.value)} />
                        </FormControl>
                        
                        </>
                    )}
                    
                    {(outputType == "text" || outputType == "sms" || outputType == "email") && (
                         <FormControl mt="2" id="promptMaker">
                            <FormLabel>Text content</FormLabel>
                            <CustomTextInput text={textContent} setValue={(val: string) => setTextContent(val)} attributes={props.getTextAttributes()} />
                        </FormControl>
                    )}

                    {(outputType == "image" || outputType == "gsheet") && (
                         <FormControl mt="2" id="Attribute">
                            <FormLabel>Attribute</FormLabel>
                            <Select placeholder="Select attribute" onChange={e => setAttribute(e.target.value)}>
                                { (outputType == "image" ? props.getImageAttributes() : props.getCsvAttributes()).map(val => (
                                    <option value={val}>{val}</option>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <Stack mt="2" direction="row" justify="space-between" spacing="2">
                        <Spacer/>
                        <VStack>
                        <HStack spacing ="2">
                            <Button w="auto" colorScheme="red" onClick={() => {
                                setOutputType("text")
                                setAttribute("")
                                setTitle("")
                                setTextContent("")
                                setEmail("")
                                setEmailSubject("")
                                setDisabled(true)
                                props.cancel()
                            }}>Cancel</Button>
                            <Button onClick = {handleConfirm} isLoading = {loading} w="auto" isDisabled={attribute.length == 0 && (outputType == 'gsheet' || outputType == 'image')}>Confirm</Button>
                        </HStack>
                        </VStack>
                    </Stack>    
                </Stack>
             </Box>
         </>
     )
 }