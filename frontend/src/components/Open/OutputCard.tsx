import { Box, IconButton, Stack, Text, Tooltip, useToken,
    Badge, Button, HStack, VStack } from '@chakra-ui/react'
 import { FiEdit2, FiTrash2 } from 'react-icons/fi'
 import { useRouter } from 'next/navigation'
 import { useState } from 'react'
 import { deleteEntity, renameEntity } from '../SupabaseFunctions'
 import { Row } from '../SupabaseTypes'
 
 interface CardProps {
     row: Row<'OutputBlocks'>,
     delete(id: number): void
 }
 
 export const OutputCard = (props: CardProps) => {
     const [brand500] = useToken('colors', ['brand.500'])

     const titleMap = {
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
 
     return (
         <>
             <Box border= "1px solid #EDF2F7" boxShadow="sm" bg="white" borderRadius="lg" p="4">
                 <Stack justify="space-between" direction="row" spacing="4">
                     <Stack spacing="1">
                         <Text textStyle="md" fontWeight="medium">
                             {titleMap[props.row.output_type]}
                         </Text>
                         { props.row.attribute && (
                            <Text mt="2" textStyle="sm" color="fg.muted">
                                Outputs <Badge variant="solid" size="xs">{props.row.attribute}</Badge>
                            </Text>
                         )}
                         
                         
                         <HStack mt="2">
                         <Text textStyle="sm" fontWeight="bold">
                             Title: 
                         </Text>
                         <Text textStyle="sm" color="fg.muted">
                            "{props.row.title}"
                         </Text>
                         </HStack>
 
                         { props.row.text_content && (
                             <HStack mt="2">
                             <Text textStyle="sm" fontWeight="bold">
                                 Text content: 
                             </Text>
                             <Text textStyle="sm" color="fg.muted">
                                "{props.row.text_content}"
                             </Text>
                             </HStack>
     
                         )}
                         { props.row.gsheet_url && (
                             <HStack mt="2">
                             <Text textStyle="sm" fontWeight="bold">
                                 URL: 
                             </Text>
                             <Text textStyle="sm" color="fg.muted">
                                "{props.row.gsheet_url}"
                             </Text>
                             </HStack>
     
                         )}

                        { props.row.gsheet_url && (
                             <HStack mt="2">
                             <Text textStyle="sm" fontWeight="bold">
                                 Phone number: 
                             </Text>
                             <Text textStyle="sm" color="fg.muted">
                                "{props.row.phone_number}"
                             </Text>
                             </HStack>
     
                         )}

                        { props.row.email && (
                             <HStack mt="2">
                             <Text textStyle="sm" fontWeight="bold">
                                 Email: 
                             </Text>
                             <Text textStyle="sm" color="fg.muted">
                                "{props.row.email}"
                             </Text>
                             </HStack>
     
                         )}

                        { props.row.email_subject && (
                             <HStack mt="2">
                             <Text textStyle="sm" fontWeight="bold">
                                 Email subject: 
                             </Text>
                             <Text textStyle="sm" color="fg.muted">
                                "{props.row.email_subject}"
                             </Text>
                             </HStack>
     
                         )}
                         
                     </Stack>
                     <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: '0', sm: '1' }}>
                         
                         <Tooltip label="Delete" aria-label='Delete'>
                             <div><IconButton onClick={e => {props.delete(props.row.id)}} icon={<FiTrash2 />} variant="tertiary" aria-label="Delete experience" /></div>
                         </Tooltip>
                     </Stack>
                 </Stack>
             </Box>
         </>
     )
 }