import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseThousandSeparator(num: number) {
    let [integerPart, fractionalPart] = num.toString().split('.');
    let formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    if (fractionalPart) {
        return `${formattedIntegerPart}.${fractionalPart}`;
    } else {
        return formattedIntegerPart;
    }
}

export function reverseParseThousandSeparator(formattedStr:string) {
    let numberStr = formattedStr.replace(/\./g, '');
    let number = parseFloat(numberStr);
    
    return number;
}


