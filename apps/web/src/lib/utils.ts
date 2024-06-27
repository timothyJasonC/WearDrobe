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