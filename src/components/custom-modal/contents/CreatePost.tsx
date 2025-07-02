import React, { FC, useState } from "react";

import "./CreatePost.sass";
import { UI } from "@comp/ui";
import { IModalContentProps } from "../index.types";
import CloseButton from "../components/CloseButton";

const CreatePost: FC<IModalContentProps> = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="CreatePost Desktop">
      <UI.Title>Новый пост</UI.Title>
      <CloseButton className="close" onClick={closeModal} />
      <form>
        <UI.Minimalist.Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <UI.Minimalist.Input
          visibilityType="many-rows"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <UI.Button
          visibilityType="colored"
          className="submit-button"
          onClick={() => {}}
        >
          создать
        </UI.Button>
      </form>
    </div>
  );
};

export default CreatePost;
