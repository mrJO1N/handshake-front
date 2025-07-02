import React, { useCallback, useEffect, useState } from "react";

import "./CustomModal.sass";
import useModal from "../modal";
import { TModalContentType } from "./index.types";
import Auth from "./contents/Auth";
import CreatePost from "./contents/CreatePost";

const useCustomModal = () => {
  const { Modal, toggleModal } = useModal();
  const [modalContentType, setModalContentType] =
    useState<TModalContentType>(null);
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({});

  const ModalContent = () => {
    switch (modalContentType) {
      case "auth":
        return <Auth closeModal={toggleModal} />;
      case "create post":
        return <CreatePost closeModal={toggleModal} />;
      default:
        return <></>;
    }
  };

  const CustomModal = () => (
    <Modal style={modalStyle}>
      <ModalContent />
    </Modal>
  );

  const toggleModalTo = useCallback(
    (contentType: TModalContentType, style?: React.CSSProperties) => {
      setModalContentType(contentType);

      if (contentType === modalContentType) setModalContentType(null);
      toggleModal();
    },
    // eslint-disable-next-line
    [setModalContentType, toggleModal]
  );

  useEffect(() => {
    if (modalContentType) {
      toggleModal();
    }
  }, [modalContentType, toggleModal]);

  return {
    CustomModal,
    toggleModalTo,
    setModalStyle,
  };
};

export default useCustomModal;
