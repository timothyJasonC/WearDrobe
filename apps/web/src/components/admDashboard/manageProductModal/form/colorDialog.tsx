'use client'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { PiPlusBold } from "react-icons/pi";
import { Label } from "@radix-ui/react-label";
import { toast } from 'sonner'
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";

export function ColorDialog({setColor, color}:{setColor:any, color:any}) {
  const [open, setOpen] = useState(false);
  const [colorHEX, setColorHEX] = useState('#000000')
  const [colorName, setColorName] = useState('')
  const [colorImage, setColorImage] = useState<File | undefined>(undefined);

  const createColor = () => {
    const isDuplicateHEX = color.some((item: any) => item.code === colorHEX)
    const isDuplicateImage = color.some((item: any) => item.image.name === colorImage?.name && item.image.size === colorImage?.size);
    const isDuplicateName = color.some((item: any) => item.name.toLowerCase() === colorName.toLowerCase() );
    if (isDuplicateHEX) {
            toast.error("HEX code is used by a different variant.");
        } else if (isDuplicateImage) {
            toast.error("Image is used by a different variant.")
        } else if (isDuplicateName) {
            toast.error("Variant name is used by a different variant.")
        } else {
            const data = {code: colorHEX, image: colorImage, name: colorName}
            const updatedColors = [...color, {...data}];
            setColor(updatedColors)
            setColorHEX('#000000')
            setColorName('')
            setOpen(false)
            setColorImage(undefined)
        }
    }

  return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <div className='flex  items-center justify-center gap-1 font-semibold text-xs ]mr-3 bg-gray-100 rounded-sm p-1 cursor-pointer mb-2 w-40'>
                <p>Create color variant</p>
                <PiPlusBold/> 
            </div>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Create Color Variant</DialogTitle>
            </DialogHeader>
            <div className="flex gap-4">
                <div>
                    <Image src={colorImage? URL.createObjectURL(colorImage) : "/images/emptyimage.png"} alt="variant-image" width={150} height={150} className="border-[1px] w-[150px] h-[113px] object-cover object-center"  />
                </div>
                <div>
                    <p className="font-semibold text-sm">Variant Image</p>
                    <Input
                        id="variantImage"
                        type="file"
                        accept="image/jpeg, image/png, image/gif, image/jpg"
                        className="mb-1 text-sm my-2"
                        onChange={(e) => {
                            const files = e.target.files
                            if (files && files.length > 0) {
                                const fileSizeLimit = 1 * 1024 * 1024;
                                const fileType = files[0].type.toLowerCase();
                                const allowedExtensions = ["jpeg", "png", "gif", "jpg"];
                                const fileExtension = fileType.split("/")[1]
                                if (!allowedExtensions.includes(fileExtension)) {
                                    toast.error("Invalid file format. Please select a JPEG, PNG, GIF, or JPG file.");
                                    e.target.value = ''
                                } else if (files[0].size > fileSizeLimit) {
                                    toast.error("File size exceeds 1MB. Please select a smaller file.");
                                    e.target.value = ''
                                } else {
                                    setColorImage(files[0]);
                                }
                            }
                        }}
                    />
                    
                    <div className="text-gray-500 text-xs">Supported file formats: .jpeg, .png, .gif, .jpg. Max 1MB.</div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="colorname" className="text-sm w-24 font-semibold">Name</Label>
                        <Input 
                            name="colorname" 
                            className="text-sm h-8 focus-visible:ring-transparent focus-visible:border-[1px] focus-visible:border-black" 
                            placeholder="ex:Red" 
                            value={colorName} 
                            onChange={(e) => {setColorName(e.target.value)}}/>
                    </div>
                    <div className="flex items-center">
                        <Label htmlFor="hex" className="text-sm w-28 font-semibold">HEX code</Label>
                        <Input 
                            name="hex" 
                            className="text-sm h-8 focus-visible:ring-transparent focus-visible:border-[1px] focus-visible:border-black" 
                            value={colorHEX} onChange={(e) => setColorHEX(e.target.value)}/>
                        <Input 
                            type='color'
                            className='p-0 w-14 outline-none border-none hover:cursor-pointer'
                            value={colorHEX}
                            onChange={(e) => {setColorHEX(e.target.value)}}
                        />
                    </div>
                    
                </div>
                
            </div>
            

            
            <Button type="submit" onClick={createColor} disabled={colorHEX && colorName && colorImage ? false : true}>Create variant</Button>
        </DialogContent>
        </Dialog>
  )
}
