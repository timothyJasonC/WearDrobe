// src/features/cart/cartSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWarehouse } from '@/constants';

interface WarehouseState {
    value: IWarehouse
}

const initialState: WarehouseState = {
    value: {}
};

export const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {
        setWarehouse: (state, action) => {
            state.value = action.payload
        }
    },
});

export const {setWarehouse} = warehouseSlice.actions;
