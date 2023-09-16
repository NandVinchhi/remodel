import { Box, IconButton, Stack, Text, Tooltip, useToken,
    Badge, Button, HStack, VStack } from '@chakra-ui/react'
 import { FiEdit2, FiTrash2 } from 'react-icons/fi'
 import { useRouter } from 'next/navigation'
 import { useState } from 'react'
 import { deleteEntity, renameEntity } from '../SupabaseFunctions'
 import { Row } from '../SupabaseTypes'
 
 interface CardProps {
     row: Row<'ProcessorBlocks'>,
     delete(id: number): void
 }
 
 export const ProcessorCard = (props: CardProps) => {
     const [brand500] = useToken('colors', ['brand.500'])
 
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
                             {processorMap[props.row.processor_type]}
                         </Text>
                         <Text mt="2" textStyle="sm" color="fg.muted">
                             Stores <Badge variant="solid" size="xs">{props.row.attribute}</Badge>  as <Badge variant="solid" size="xs" colorScheme="teal">{props.row.outgoing_type.toUpperCase()}</Badge>
                         </Text>
 
                         <HStack mt="2">
                         <Text textStyle="sm" fontWeight="bold">
                             Prompt: 
                         </Text>
                         <Text textStyle="sm" color="fg.muted">
                            "{props.row.prompt}"
                         </Text>
                         </HStack>
                         
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