import { closeModal, ModalType, openModal } from "@/entities/modal";
import { useDispatch } from "react-redux";

export const useModal = () => {
    const dispatch = useDispatch();
    return {
        open: (type: ModalType) => dispatch(openModal(type)),
        close: () => dispatch(closeModal()),
    };
};