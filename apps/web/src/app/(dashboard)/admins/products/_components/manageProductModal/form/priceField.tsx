import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"

  interface IPriceForm {
    price: number, 
    setPrice: React.Dispatch<React.SetStateAction<number>>, 
    priceErrorMessage: string, 
    setPriceErrorMessage: React.Dispatch<React.SetStateAction<string>>
  }

export const PriceField = ({price, setPrice, priceErrorMessage, setPriceErrorMessage}: IPriceForm) => {
  function validatePrice(num: number) {
    if (isNaN(num) || num < 1000) {
      setPriceErrorMessage("Price cannot be lower than Rp1.000.");
    } else {
      setPriceErrorMessage('');
    }

    setPrice(num);
  }

  return (
    <FormField
      name="price"
      render={() => (
        <FormItem>
          <FormLabel className="font-bold text-base max-sm:block max-sm:text-center">Price</FormLabel>
          <div className="flex max-sm:justify-center">
            <FormControl>
              <Input
                type='text'
                inputMode='decimal'
                placeholder="0"
                value={price ?? ''}
                onChange={(e) => {
                const value = e.target.value;
                if (value === "" || !isNaN(Number(value))) {
                    validatePrice(Number(value));
                }
                }}
                className="focus-visible:ring-transparent text-sm w-36 text-center"
              />
            </FormControl>
          </div>
          <div className={`text-red-500 text-sm font-medium mt-2 ${priceErrorMessage ? "block" : "hidden"}`}>{priceErrorMessage}</div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
