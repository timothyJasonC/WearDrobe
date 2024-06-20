import React, { useCallback, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from '@radix-ui/react-label'
import Image from 'next/image'
import { PiTrashFill } from 'react-icons/pi'
import { toast } from 'sonner'
import { IEditAdditional, IImageFieldProps } from '@/constants'

export const AditionalImageField = ({additionalImage = [], setAdditionalImage, setCurrentAdditional, currentAdditional}:IImageFieldProps) => {
  const handleDelete = useCallback((idx: number) => {
    if (setAdditionalImage) {
      setAdditionalImage(additionalImage.filter((_, index) => index !== idx));
    }
  }, [additionalImage, setAdditionalImage]);

  const handleDeleteCurrent = (item:IEditAdditional, index:number) => {
    const data = {...item, isDeleted: true}
    if (currentAdditional && setCurrentAdditional) {
      const currentArray = [...currentAdditional]
      currentArray.splice(index, 1, data) 
      setCurrentAdditional(currentArray)
    }
}

  const renderImages = useMemo(
    () => 
      additionalImage.map((image, index) => (
        <div key={index} className='relative w-20 h-20'>
          <Image
            width={218}
            height={218}
            className='rounded-md border-[1px] border-gray-200 w-20 h-20 object-cover object-center'
            alt='main image'
            src={URL.createObjectURL(image)}
          />
          <PiTrashFill
            className='flex text-red-400 hover:text-red-500 hover:cursor-pointer absolute bottom-1 left-1 drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)]'
            onClick={() => handleDelete(index)}
          />
        </div>
      )),
    [additionalImage, handleDelete]
  );

  return (
    <div className='w-full'>
      <p className='font-bold text-base mb-2 max-md:text-center'>Additional Image(s)</p>
      <div className='flex items-center gap-2 flex-wrap max-md:justify-center'>
        {currentAdditional?.map((item, index) => {
          if (item.isDeleted !== true)
          return (
            <div key={index} className='relative w-20 h-20'>
              <Image
                width={218}
                height={218}
                className='rounded-md border-[1px] border-gray-200 w-20 h-20 object-cover object-center'
                alt='main image'
                src={(item.image ? item.image : '')}
              />
              <PiTrashFill
                className='flex text-red-400 hover:text-red-500 hover:cursor-pointer absolute bottom-1 left-1 drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)]'
                onClick={() => handleDeleteCurrent(item, index)}
              />
            </div>
          )
        })}
        {additionalImage.length ? renderImages : <div className='hidden'></div>}
        <Label htmlFor='additional'>
          <div className='flex justify-center items-center bg-white rounded-md border-[1px] border-gray-200 w-20 h-20 hover:bg-secondary hover:cursor-pointer'>
            <p className='text-black font-medium text-xl'>+</p>
          </div>
        </Label>
      </div>
      
      
      <div className="text-gray-500 text-[0.6rem] mt-1 max-md:text-center">.jpeg, .png, .gif, .jpg. Max 1 MB.</div>
      
      <Input
        id='additional'
        name='additional'
        type="file"
        accept="image/jpeg, image/png, image/gif, image/jpg"
        className='hidden'
        multiple
        onChange={(e) => {
            const files = e.target.files
            if (files && files.length > 0) {
              const allowedExtensions = ["jpeg", "png", "gif", "jpg"];
              const selectedImages = [];
              const fileSizeLimit = 1 * 1024 * 1024;
              for (let i = 0; i < files.length; i++) {
                const isDuplicateImage = additionalImage.some((item: any) => item.name === files[i].name && item.size === files[i].size);
                const fileType = files[i].type.toLowerCase();
                const fileExtension = fileType.split("/")[1];
                if (!allowedExtensions.includes(fileExtension)) {
                  toast.error("Invalid file format. Please select a JPEG, PNG, GIF, or JPG file.");
                } else if (files[i].size > fileSizeLimit) {
                  toast.error("File size exceeds 1MB. Please select a smaller file.");
                } else if (isDuplicateImage) {
                  toast.error("Image is already used.");
                } else {
                  selectedImages.push(files[i]);
                  if (setAdditionalImage) {setAdditionalImage([...additionalImage, ...selectedImages]);}
                }
              }
            }
          }}
      />
    </div>
  )
}
