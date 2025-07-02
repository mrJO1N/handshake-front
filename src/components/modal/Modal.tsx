import React, { FC, useCallback, useRef } from "react";
// eslint-disable-next-line
import {
  AnimatedModal,
  ModalAnimation,
  AnimatedModalObject,
} from "@dorbus/react-animated-modal";
import { IModalProps } from "./index.types";

import "./Modal.sass";

export const useModal = () => {
  const modalRef = useRef<AnimatedModalObject>(null);

  // Крепкий костыль для управления модалкой извне
  const toggleModal = useCallback(() => {
    const modalElement = document.getElementById("animated-modal-container");
    if (modalElement.className === "reveal") {
      document.getElementById("animated-modal-background").click();
    } else {
      modalRef.current.OpenModal();
    }
  }, []);

  const Modal: FC<IModalProps> = ({ children, style }) => {
    return (
      <AnimatedModal
        ref={modalRef}
        animation={ModalAnimation.Reveal}
        modalStyle={style}
      >
        {children}
      </AnimatedModal>
    );
  };

  const isModalOpen = modalRef.current?.OpenModal === undefined;

  return { toggleModal, Modal, isModalOpen };
};
