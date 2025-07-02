import { TModalContentType } from "@comp/custom-modal/index.types";
import React, { createContext } from "react";

interface IAppContext {
  toggleModal: (
    modalContentType: TModalContentType,
    style?: React.CSSProperties
  ) => void;
  setModalStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  windowWidth: number;
  windowHeight: number;
  isMobile: boolean;
}

export default createContext<IAppContext>(null);
