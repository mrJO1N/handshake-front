import { ClipboardEventHandler } from "react";

export const preventClipboard: ClipboardEventHandler<HTMLInputElement> = (e) => e.preventDefault();
