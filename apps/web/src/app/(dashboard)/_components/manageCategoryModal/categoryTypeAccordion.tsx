import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CreateCategoryPopover } from './createCategoryPopover';
import { PiDotOutlineFill } from "react-icons/pi";
import { PiTrashFill } from "react-icons/pi";
import { EditCatagoryDialog } from './editCategoryDialog';
import { SubmitAlert } from '../../../../components/submitAlertTemplate';
import { deleteCategory } from "@/app/action";
import { toast } from "sonner";



interface ICategory {
  id?: string;
  category?: string;
  
}

export const CategoryAccordion = ({ type, data, gender, getCategoryData, isSuper }: { type: string; data: ICategory[], isSuper:boolean, gender:string, getCategoryData: () => void }) => {
  const handleDelete = async (id:string) => {
    const data = await deleteCategory(id);
    if (data.status === "ok") {
        toast.success(data.message)
    } else if (data.status === "error") {
        toast.error(data.message)
    }
    getCategoryData();
  };


  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className='justify-start gap-2'>
          {type}
        </AccordionTrigger>
        <AccordionContent>
          <div className='flex justify-start '>
            <CreateCategoryPopover 
            gender={gender}
            type={type}
            getCategoryData={getCategoryData}
            isSuper={isSuper}
          />
          </div>          
          <div className='flex flex-wrap w-full'>
            {data.length === 0 ? (
            <div className='min-w-40 grow flex-1 text-sm text-gray-500'>No categories available</div>
            ) : (
              data.map((item) => (
                <div key={item.id} className='sm:flex-1 min-w-44 text-sm my-1 flex'>
                    <div className='flex items-center justify-start gap-1'>
                        <PiDotOutlineFill />
                        <div className="flex items-center gap-1">
                          {item.category} 
                          <EditCatagoryDialog 
                          gender={gender}
                          type={type}
                          category={item.category!}
                          getCategoryData={getCategoryData}
                          isSuper={isSuper}
                          />
                        </div>

                        <SubmitAlert 
                          action={() => handleDelete(item.id!)} 
                          title={"Delete category?"} 
                          icon={<PiTrashFill className='flex text-red-400 hover:text-red-500'/>} 
                          message={"Category will be permanently deleted. Action cannot be undone."}
                          hidden={isSuper ? false : true}
                        />
                    </div>
                </div>
              ))
            )}
          </div>

        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
