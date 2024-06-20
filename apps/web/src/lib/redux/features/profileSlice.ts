import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    value: File | null
}

const initialState: AuthState = {
    value: null
}

export const profileSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { 
        setNewFile: (state, action) => {
            return {
                value: action.payload
            }
        },
    }
})

export const { setNewFile } = profileSlice.actions