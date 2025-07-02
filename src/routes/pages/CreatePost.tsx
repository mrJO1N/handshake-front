import React, { FC, useState } from "react";

import "./CreatePost.sass";
import { UI } from "@comp/ui";

const CreatePost: FC<ICreatePostProps> = ({ TopMenu, PostList }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <TopMenu visibilityType="clear" />
      <div className="CreatePost Mobile">
        <UI.Title>Новый пост</UI.Title>

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
    </>
  );
};

interface ICreatePostProps {
  TopMenu: FC<any>;
  PostList: FC;
}

export default CreatePost;
