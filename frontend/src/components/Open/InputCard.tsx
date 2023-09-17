import { Box, IconButton, Stack, Text, Tooltip, useToken,
   Badge, Button, HStack, VStack } from '@chakra-ui/react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteEntity, renameEntity } from '../SupabaseFunctions'
import { Row } from '../SupabaseTypes'

interface CardProps {
    row: Row<'InputBlocks'>,
    delete(id: number): void
}

export const InputCard = (props: CardProps) => {
    const [brand500] = useToken('colors', ['brand.500'])

    const titleMap = {
        "text": "Text Input", "image": "Image Upload", "voice": "Voice Record", "pdf": "PDF Upload", "csv": "CSV Upload", "mcq": "Multiple Choice", "date": "Date Select"
    }
    const processorMap = {
        "ocr": "OCR",
        "image2text": "Image analysis",
        "text2image": "Stable Diffusion",
        "text2text": "Lllama 2"
    }

    return (
        <>
            <Box mt="2" border= "1px solid #EDF2F7" boxShadow="sm" bg="white" borderRadius="lg" p="4">
                <Stack justify="space-between" direction="row" spacing="4">
                    <Stack spacing="1">
                        <Text textStyle="md" fontWeight="medium">
                            {titleMap[props.row.input_type]}
                        </Text>
                        <Text mt="2" textStyle="sm" color="fg.muted">
                            Accepts <Badge variant="solid" size="xs">{props.row.attribute}</Badge>  as <Badge variant="solid" size="xs" colorScheme="teal">{props.row.outgoing_type.toUpperCase()}</Badge>
                        </Text>

                        <HStack mt="2">
                        <Text textStyle="sm" fontWeight="bold">
                            Title: 
                        </Text>
                        <Text textStyle="sm" color="fg.muted">
                           "{props.row.title}"
                        </Text>
                        </HStack>

                        { props.row.mcq_options && props.row.mcq_options.length > 0 && (
                            <Stack mt="2">
                            <Text textStyle="sm" fontWeight="bold">
                                Choices:
                            </Text>

                            {props.row.mcq_options.map((option, i) => (
                                <Text textStyle="sm" color="fg.muted">
                                ➜ "{option}"
                             </Text>
                            ))}
                            
                            </Stack>
                        )}

                        { props.row.image_processor && props.row.input_type == "image" && (
                            <HStack mt="2">
                            <Text textStyle="sm" fontWeight="bold">
                                Process with: 
                            </Text>
                            <Badge size="xs" variant="solid">
                               {processorMap[props.row.image_processor]}
                            </Badge>
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