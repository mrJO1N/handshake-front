import React, { FC } from "react";

import "./Post.sass";
import { IPostContent } from "../../../../main.types";

const Post: FC<IPostProps> = (props) => {
  const post = props.content;

  return (
    <div className="Post">
      <div className="header">
        <span className="title">{post.title.toUpperCase()}</span>
        {!props.id ? (
          ""
        ) : (
          <>
            <div className="separator" />
            <span className="post-id">ПОСТ #{+props.id + 1}</span>
          </>
        )}
      </div>
      <div className="content">
        <div className="the-user-wants">
          ПОЛЬЗОВАТЕЛЬ ХОЧЕТ: {post.theUserWants}
        </div>
        <div className="the-user-offers">
          ПОЛЬЗОВАТЕЛЬ ДАСТ: {post.theUserOffers}
        </div>
      </div>
    </div>
  );
};

interface IPostProps {
  id?: string;
  content: IPostContent;
}

export default Post;
