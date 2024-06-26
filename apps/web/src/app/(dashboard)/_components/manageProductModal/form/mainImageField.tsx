import React, { useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { Label } from '@radix-ui/react-label'
import Image from 'next/image'
import { IImageFieldProps } from '@/constants'



export const MainImageField = ({thumbnail, setThumbnail, currentThumbnail, invalidMainImage, setInvalidMainImage}:IImageFieldProps) => {
 
  const renderImages = useMemo(
    () => (
      <Image
        width={168}
        height={168}
        className={`mb-2 rounded-md border-[1px] border-gray-200 w-[168px] h-[168px] object-cover object-center`}
        alt={'main image'}
        src={(thumbnail ? URL.createObjectURL(thumbnail) : currentThumbnail) || '/images/emptyimage.png'}
      />
    ),
    [thumbnail, currentThumbnail]
  );
  return (
    <div className='w-full'>
      <p className="font-bold text-base mb-2 max-md:text-center">Main Image</p>
      <div className='flex justify-center'>
        {thumbnail || currentThumbnail ?
          renderImages
          :
          <Image
            width={168}
            height={168}
            className={`mb-2 rounded-md border-[1px] border-gray-200 w-[168px] h-[168px] object-cover object-center`}
            alt={'main image'}
            src={'/images/emptyimage.png'}
          />
        }
      </div>
      <Label htmlFor='thumbnail' className='flex justify-center'>
        <div className='text-black font-medium text-sm w-full bg-white text-center rounded-md border-[1px] border-gray-200 py-2 hover:bg-secondary hover:cursor-pointer max-md:max-w-[168px]'>
          Upload
        </div>
      </Label>
      
      
      <div className="text-gray-500 text-[0.6rem] mt-1 max-md:text-center">.jpeg, .png, .gif, .jpg. Max 1 MB.</div>
      <div className={`text-red-500 text-[0.6rem] mt-1 ${invalidMainImage ? "block" : "hidden"} max-md:text-center`}>main image cannot be empty.</div>
      
      <Input
        id='thumbnail'
        name='thumbnail'
        type="file"
        accept="image/jpeg, image/png, image/gif, image/jpg"
        className='hidden'
        multiple={false}
        onChange={(e) => {
            const files = e.target.files
            if (files && files.length > 0) {
                const fileType = files[0].type.toLowerCase();
                const allowedExtensions = ["jpeg", "png", "gif", "jpg"];
                const fileSizeLimit = 1 * 1024 * 1024;
                const fileExtension = fileType.split("/")[1]
                if (!allowedExtensions.includes(fileExtension)) {
                    toast.error("Invalid file format. Please select a JPEG, PNG, GIF, or JPG file.");
                    e.target.value = '';
                } else if (files[0].size > fileSizeLimit) {
                    toast.error("File size exceeds 1MB. Please select a smaller file.");
                    e.target.value = '';
                } else {
                    if (setThumbnail) {setThumbnail(files[0])}
                    if (setInvalidMainImage) {setInvalidMainImage(false)}
                }
              }
        }}
      />
    </div>
  )
}
