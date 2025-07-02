import mobile from "./mobile";
import desktop from "./desktop";
import { useCustomModal } from "./custom-modal";
import { UI } from "./ui";
import { FC } from "react";

let differentComponents = { desktop, mobile };

let components = { useCustomModal, UI, differentComponents };

export interface IDifferentComponents {
  TopMenu: FC;
  PostList: FC;
}

export default components;
