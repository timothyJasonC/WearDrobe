import React from 'react'
import { MainImageField } from './mainImageField'
import { AditionalImageField } from './additionalImage'
import { Separator } from '@radix-ui/react-separator'
import { IImageFieldProps } from '@/constants'


  export const ImageField = ({thumbnail, currentAdditional, setCurrentAdditional, currentThumbnail, setThumbnail,invalidMainImage,setInvalidMainImage,additionalImage,setAdditionalImage}:IImageFieldProps) => {
   
  return (
    <div>
        <div className="flex flex-1 ">
            <MainImageField 
            currentThumbnail={currentThumbnail}
            setThumbnail={setThumbnail}
            thumbnail={thumbnail}
            invalidMainImage={invalidMainImage}
            setInvalidMainImage={setInvalidMainImage}
            />
        </div>
        
        <Separator className="my-4 bg-gray-300"/>

        <div className="flex flex-1">
            <AditionalImageField
            setCurrentAdditional={setCurrentAdditional}
            currentAdditional={currentAdditional}
            setAdditionalImage={setAdditionalImage}
            additionalImage={additionalImage}
            />
        </div>
    </div>
  )
}
