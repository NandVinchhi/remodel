import { Box, FormControl, FormLabel, Input, Stack, Text, useToken,
    Badge, Button, HStack, VStack, Select, Spacer, Center } from '@chakra-ui/react'

 import { useState } from 'react'
 import { Row } from '../SupabaseTypes'
 import { supabase } from '../SupabaseFunctions'
 
 interface CardProps {
     add(row: Row<'InputBlocks'>): void,
     cancel(): void,
     entity_id: number,
     validateAttribute(a: string): boolean
 }
 
 export const AddInputCard = (props: CardProps) => {
     const [brand500] = useToken('colors', ['brand.500'])

     const outputTypeMap = {
        "text": "Display Text",
        "image": "Display Image",
        "sms": "Send SMS",
        "gsheet": "Google Sheets",
        "email": "Send Email"
     }

     const processorMap = {
         "ocr": "OCR",
         "image2text": "Image analysis",
         "text2image": "Stable Diffusion",
         "text2text": "Lllama 2"
     }

     const inputTypeMap = {
        "text": "Text Input", "image": "Image Upload", "voice": "Voice Record", "pdf": "PDF Upload", "csv": "CSV Upload", "mcq": "Multiple Choice", "date": "Date Select"
    }

     const [inputType, setInputType] = useState<"text" | "image" | "voice" | "pdf" | "csv" | "mcq" | "date">("text");
     const [attribute, setAttribute] = useState<string>("");
     const [title, setTitle] = useState<string>("");
     const [imageProcessor, setImageProcessor] = useState<"image2text" | "text2image" | "text2text" | "ocr">("ocr");
     const [option1, setOption1] = useState<string>("Option 1");
     const [option2, setOption2] = useState<string>("Option 2");
     const [option3, setOption3] = useState<string>("Option 3");
     const [option4, setOption4] = useState<string>("Option 4");
     const [disabled, setDisabled] = useState<boolean>(true)
     const [loading, setLoading] = useState<boolean>(false)

     const validate = (attribute: string): void => {
        if (attribute.length == 0 && title.length == 0) {
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
            .from('InputBlocks')
            .insert([
                { image_processor: inputType == "image" ? imageProcessor : null, entity_id: props.entity_id, attribute: attribute, input_type: inputType, outgoing_type: "text", title: title, mcq_options: inputType=="mcq" ? [option1, option2, option3, option4]: []},
            ])
            .select()
            .then(res => {
                props.add(res.data[0])
            })
        
     }

     return (
         <>
             <Box mt="2" border= "1px solid #EDF2F7" boxShadow="sm" bg="white" borderRadius="lg" p="4">
                <Stack spacing="1">
                    <HStack>
                        <FormControl id="inputType">
                            <FormLabel>Input type</FormLabel>
                            <Select value={inputType} onChange={e => setInputType(e.target.value)}>
                                {Object.keys(inputTypeMap).map(val => (
                                    <option value={val}>{inputTypeMap[val]}</option>
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

                    <FormControl mt="2" id="imageProcessor">
                            <FormLabel>Title</FormLabel>
                            <Input value={title} onChange={e => setTitle(e.target.value)} />
                        </FormControl>

                    { inputType == "image" && (
                        <FormControl mt="2" id="imageProcessor">
                            <FormLabel>Process with</FormLabel>
                            <Select value={imageProcessor} onChange={e => setImageProcessor(e.target.value)}>
                                {["ocr", "image2text"].map(val => (
                                    <option value={val}>{processorMap[val]}</option>
                                ))}
                            </Select>
                        </FormControl>

                    )}

                    { inputType == "mcq" && (
                        <FormControl mt="2" id="imageProcessor">
                            <FormLabel>Add options</FormLabel>
                            <Input value={option1} onChange={e => {
                                
                                setOption1(e.target.value)
                            }}></Input>
                            <Input mt="2" value={option2} onChange={e => {
                                
                                setOption2(e.target.value)
                            }}></Input>
                            <Input mt="2" value={option3} onChange={e => {
                                
                                setOption3(e.target.value)
                            }}></Input>
                            <Input mt="2" value={option4} onChange={e => {
                                
                                setOption4(e.target.value)
                            }}></Input>
                            
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
                                setInputType("text")
                                setAttribute("")
                                setTitle("")
                                setImageProcessor("ocr")
                                setOption1("Option1")
                                setOption2("Option2")
                                setOption3("Option3")
                                setOption4("Option4")
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