'use client'
import { useState } from 'react';
import { auth, facebookProvider, googleProvider } from "@/firebase/config";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

export default function useAuth() {
    const [ SSOUserData, setSSOUserData ] = useState<any>();

    async function googleSSO() {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                if (token && user) setSSOUserData({ token, user }) 
            
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
        });
    
    }

    async function facebookSSO() {
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                const user = result.user;
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential?.accessToken;
                if (accessToken && user) setSSOUserData({ token: accessToken, user })
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }

    return { googleSSO, facebookSSO, SSOUserData };
}
