import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CreateCategoryPopover } from './createCategoryPopover';
import { PiDotOutlineFill } from "react-icons/pi";
import { DeleteCategoryAlert } from './deleteCategoryAlert';
import { EditCatagoryDialog } from './editCategoryDialog';



interface ICategory {
  id?: string;
  category?: string;
}

export const CategoryAccordion = ({ type, data, gender, getCategoryData }: { type: string; data: ICategory[], gender:string, getCategoryData: () => void }) => {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
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
          />
          </div>          
          <div className='flex flex-wrap w-full'>
            {data.length === 0 ? (
            <div className='min-w-40 grow flex-1 text-sm text-gray-500'>No categories available</div>
            ) : (
              data.map((item) => (
                <div key={item.id} className='sm:flex-1 min-w-48 text-sm my-1 flex'>
                    <div className='group flex items-center justify-start gap-1 hover:cursor-pointer hover:underline'>
                        
                        <PiDotOutlineFill /> 
                        <EditCatagoryDialog 
                        gender={gender}
                        type={type}
                        category={item.category!}
                        getCategoryData={getCategoryData}
                        />
                        
                        <DeleteCategoryAlert 
                        id={item.id!}
                        getCategoryData={getCategoryData}
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
