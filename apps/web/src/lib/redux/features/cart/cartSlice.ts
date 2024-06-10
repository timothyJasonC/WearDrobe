// src/features/cart/cartSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder, initialOrder } from '@/constants';

export interface CartState {
    value: IOrder | null
}

const initialState: CartState = {
    value: null
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.value = action.payload
        }
    },
});

export const {setCart} = cartSlice.actions;
