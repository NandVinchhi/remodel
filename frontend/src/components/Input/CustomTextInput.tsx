import React, { useState, useRef } from 'react';
import { Box, Button, HStack, VStack, Textarea, Badge } from '@chakra-ui/react';

interface CustomTextInputProps {
    attributes: string[],
    text: string,
    setValue: (val: string) => void
}

export const CustomTextInput  = (props: CustomTextInputProps) => {

    const handleChange = (e: any) => {
        // Get the current value of the textarea
        const currentValue = e.target.value;
      
        // Get the previous value of the textarea before the change event
        const previousValue = e.target.defaultValue;
      
        // Check if a curly brace has been added in the current change
        const curlyBraceAdded =
          (currentValue.match(/{/g) || []).length > (previousValue.match(/{/g) || []).length ||
          (currentValue.match(/}/g) || []).length > (previousValue.match(/}/g) || []).length;
      
        // If a curly brace has been added, prevent the change
        if (curlyBraceAdded) {
          e.preventDefault();
        } else {
          // Otherwise, update the defaultValue to the current value so we have it for the next change event
          e.target.defaultValue = currentValue;
          props.setValue(e.target.defaultValue)
        }
      };
    const handleAttributeInsertion = (e: string) => {
        props.setValue(props.text + "{" + e + "}")
    }

    return (
        <>
        <HStack mt="2">
            {props.attributes.map((attr, index) => (
                <Badge size="xs" variant="solid" key={index} style={{ cursor: "pointer"}} onClick={() => handleAttributeInsertion(attr)}>
                    {attr}
                </Badge>
            ))}
        </HStack>
        <Textarea mt="2" value={props.text} onChange={handleChange}>

        </Textarea>
            
        </>
    );
}