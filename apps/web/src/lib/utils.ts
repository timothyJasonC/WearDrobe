import { type ClassValue, clsx } from "clsx"
import { jwtDecode } from "jwt-decode";
import { UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge"
import { getRequest } from "./fetchRequests";
import Cookies from "js-cookie";
import qs from 'query-string'
import { RemoveUrlQueryParams, UrlQueryParams } from "@/constants";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToIDR(amount: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export async function getAdminClientSide() {
    const token = Cookies.get('token')
    if(!token) return 
    let decoded: { id: string, role: string, iat: number, exp: number } = { id: '', role: '', iat: 0, exp: 0 }
    if (token || typeof token === 'string') decoded = jwtDecode(token)
    const res = await (await getRequest(`/admin/${decoded.id}`)).json()
    const admin = res.data
    return admin;
}

export async function getAdminServerSide(cookies: any) {
    try {
        const token = cookies().get('token')?.value
        let decoded: { id: string, role: string, iat: number, exp: number } = { id: '', role: '', iat: 0, exp: 0 }
        if (token) decoded = jwtDecode(token) 
        const res = await (await getRequest(`/admin/${decoded.id}`)).json()
        const user = res.data;
        return user;    
    } catch (error) {
        return null
    }
}

export async function getUserClientSide() {
    const token = Cookies.get('token')
    if(!token) return 
    let decoded: { id: string, role: string, iat: number, exp: number } = { id: '', role: '', iat: 0, exp: 0 }
    if (token || typeof token === 'string') decoded = jwtDecode(token)
    const res = await (await getRequest(`/user/${decoded.id}`)).json()
    const user = res.data
    return user;
}

export async function getUserServerSide(cookies:any) {
    try {
        const token = cookies().get('token')?.value
        let decoded: { id: string, role: string, iat: number, exp: number } = { id: '', role: '', iat: 0, exp: 0 }
        if (token) decoded = jwtDecode(token) 
        const res = await (await getRequest(`/user/${decoded.id}`)).json()
        const user = res.data;
        return user;    
    } catch (error) {
        return null
    }
}

// auth
export function isTokenExp(token: string) {
    try {
        const decodedToken : undefined | { exp: number, iat: number, id: string, role: string } = jwtDecode(token);
        if (decodedToken) {
            if (Date.now() <= decodedToken.exp * 1000) {
                return false
            } else return true
        } else {
            true
        }    
    } catch (error) {
        return true
    }
    
}

export function closeDialogCleanForm(dialogId: string, form?: UseFormReturn | any ) {
    form?.reset();
    document.getElementById(dialogId)?.classList.add('hidden')
    document.getElementById(dialogId)?.classList.remove('flex')
}

export function swipeToNextForm() {
    const firstForm = document.getElementById('verify-current-pass-form')
    const secondForm = document.getElementById('user-reset-new-pass-form')
    firstForm?.classList.add('-translate-x-96')
    secondForm?.classList.add('-translate-x-96')
}

export function swipeReverseToPrevForm() {
    const firstForm = document.getElementById('verify-current-pass-form')
    const secondForm = document.getElementById('user-reset-new-pass-form')
    firstForm?.classList.remove('-translate-x-96')
    secondForm?.classList.remove('-translate-x-96')
}

export function handleLogout() {
    Cookies.remove('token')
    Cookies.remove('role')
    // ... optional other function
}

export function calculateAge(dateString: string): any {
    
    if (dateString) {
        const birthDate: Date = new Date(dateString);
        const today: Date = new Date();
        let age: number = today.getFullYear() - birthDate.getFullYear();
        const monthDifference: number = today.getMonth() - birthDate.getMonth();
        const dayDifference: number = today.getDate() - birthDate.getDate();
        
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }
        return age;
    } else {
        return dateString
    }
}

export function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function catchError(error: Error | any) {
    if (error instanceof Error) {
        return { error: error.message };
    } return { error: 'An unknown error occurred' };
}

export const bandungSubDistricts = [
    "Andir",
    "Arcamanik",
    "Astanaanyar",
    "Babakan Ciparay",
    "Bandung Kidul",
    "Bandung Kulon",
    "Bandung Wetan",
    "Batununggal",
    "Bojongloa Kaler",
    "Bojongloa Kidul",
    "Buahbatu",
    "Cibeunying Kaler",
    "Cibeunying Kidul",
    "Cibiru",
    "Cicendo",
    "Cidadap",
    "Cinambo",
    "Coblong",
    "Gedebage",
    "Kiaracondong",
    "Lengkong",
    "Mandalajati",
    "Panyileukan",
    "Rancasari",
    "Regol",
    "Sukajadi",
    "Sukasari",
    "Sumur Bandung",
    "Ujungberung"
];

export function parseDate(date: any) {
    const parsed = new Date(date).toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' });
    return parsed;
}
export function formUrlQuery({ params, key, value }: UrlQueryParams) {
    const currentUrl = qs.parse(params)
  
    currentUrl[key] = value
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }
  
  export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
    const currentUrl = qs.parse(params)
  
    keysToRemove.forEach(key => {
      delete currentUrl[key]
    })
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }

  export const formatDateTime = (dateString: Date) => {
    const dateTimeOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
      month: 'short', // abbreviated month name (e.g., 'Oct')
      day: 'numeric', // numeric day of the month (e.g., '25')
      hour: 'numeric', // numeric hour (e.g., '8')
      minute: 'numeric', // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    }
  
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
      month: 'short', // abbreviated month name (e.g., 'Oct')
      year: 'numeric', // numeric year (e.g., '2023')
      day: 'numeric', // numeric day of the month (e.g., '25')
    }
  
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric', // numeric hour (e.g., '8')
      minute: 'numeric', // numeric minute (e.g., '30')
      hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    }
  
    const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions)
  
    const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions)
  
    const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions)
  
    return {
      dateTime: formattedDateTime,
      dateOnly: formattedDate,
      timeOnly: formattedTime,
    }
  }
