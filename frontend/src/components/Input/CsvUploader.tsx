"use client";
import React, { useRef } from "react";
import {
    Box,
    Button,
    IconButton,
    HStack,
    Icon,
    Stack,
    Image,
    Text,
    useToken,
    Square
} from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FiFileText } from "react-icons/fi";
import { useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

interface UploadProps {
    setValue(k: any): any
}
export const CsvUploader = (props: UploadProps) => {
   
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [csvURL, setCsvURL] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [size, setSize] = useState<number>(0);

    const bytesToSize = (bytes: number): string => {
        const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
        if (bytes === 0) return '0 Byte';
        if (bytes < 0) return 'Invalid Size';  // Handle negative values if necessary
    
        const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
        return Math.round(bytes / Math.pow(1024, i)).toString() + ' ' + sizes[i];
    }

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        
        if (file) {
            const data = new FormData()
            data.append("file", file)
            data.append("filename", "upload.csv")
            fetch("http://127.0.0.1:5000/upload", {method: "POST", body: data}).then(response => response.json()).then(result => {
                props.setValue(result.data)
            })
            const objectURL = URL.createObjectURL(file);
            setName(file.name);
            setSize(parseInt(file.size))
            setCsvURL(objectURL);
        }
    };

    const reset = () => {
       setCsvURL(null)
       props.setValue(null)
       setName(null)
       setSize(0)
    };


    return (
        <Box
            borderWidth={{ base: "0", md: "1px" }}
            p={{ base: "0", md: "4" }}
            borderRadius="lg"
        >
            <div id="container"></div>
            {!csvURL ? (
                <>
                    
                    <HStack spacing={2}>
                        <input 
                            type="file" 
                            style={{display: "none"}}
                            accept=".csv" 
                            ref={inputRef}
                            onChange={handleFileChange} 
                        />
                        
                        <Button
                            leftIcon={<FaUpload />}
                            onClick={() => {inputRef.current?.click()}}
                            colorScheme='teal'
                        >
                            Upload
                        </Button>
                    </HStack>
                </>
            ) : (
                <Stack justify="space-between" direction={{ base: 'column', md: 'row' }} spacing="5">
              <HStack spacing="3">
              <Square size="10" bg="bg.subtle" borderRadius="lg">
                  <Icon as={FiFileText} boxSize="5" />
                </Square>
                <Box fontSize="sm">
                  <Text color="empahsized" fontWeight="medium">
                    {name}
                  </Text>
                  <Text color="fg.muted">{bytesToSize(size)}</Text>
                </Box>
              </HStack>
              <Stack spacing="3" direction={{ base: 'column-reverse', md: 'row' }}>
                <Button colorScheme="red" onClick={reset} size="sm">Remove</Button>
              </Stack>
            </Stack>
            )}
        </Box>
    );
};
