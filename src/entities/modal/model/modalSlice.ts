import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = 'login' | 'register' | 'createPost' | null;

export interface ModalState {
    active: ModalType;
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: { active: null } as ModalState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalType>) => {
            state.active = action.payload;
        },
        closeModal: (state) => {
            state.active = null;
        },
    },
});


export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;