import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    value: { 
        currentAccount: {},
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
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
                    currentAccount: {}
                }
            }
        }
    }
})

export const { setCurrentAccount, clearCurrentAccount } = authSlice.actions
export default authSlice.reducer;