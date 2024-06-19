import { IOrder } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

interface IAddressList {
    id: string;
    address: string;
    coordinate: string;
    userID: string;
    mainAddress: boolean;
    user: IUser; // Assuming IUser is already defined
}

interface IUser {
    id: string;
    accountActive: boolean;
    username?: string | null;
    email: string;
    password?: string | null;
    gender?: Gender | null;
    dob?: Date | null;
    createdAt: Date;
    imgUrl?: string | null;
    addresses: IAddressList[];
    orders: IOrder[];
}

interface CurrentAccount {
    currentAccount: IUser | null
}

interface AuthState {
    value: CurrentAccount
}

const initialState: AuthState = {
    value: { 
        currentAccount: null,
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { 
        setCurrentAccount: (state, action) => {
            return {
                value: {
                    currentAccount: action.payload
                }
            }
        },
        clearCurrentAccount: () => {
            return {
                value: {
                    currentAccount: null
                }
            }
        }
    }
})

export const { setCurrentAccount, clearCurrentAccount } = authSlice.actions