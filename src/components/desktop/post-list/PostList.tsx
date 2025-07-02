import React, { FC, useContext, useState } from "react";

import "./PostList.sass";
import Post from "./components/Post";
import { IPostContent } from "../../../main.types";
import { UI } from "@comp/ui";
import appContext from "@/contexts/app.context";

const PostList: FC = () => {
  const { toggleModal } = useContext(appContext);
  const [searchValue, setSearchValue] = useState("");
  const posts: IPostContent[] = [
    { title: "название", theUserWants: "хочет", theUserOffers: "даст" },
    { title: "название", theUserWants: "хочет", theUserOffers: "даст" },
    { title: "название", theUserWants: "хочет", theUserOffers: "даст" },
    { title: "название", theUserWants: "хочет", theUserOffers: "даст" },
    { title: "название", theUserWants: "хочет", theUserOffers: "даст" },
    { title: "название", theUserWants: "хочет", theUserOffers: "даст" },
    { title: "название", theUserWants: "хочет", theUserOffers: "даст" },
  ];

  return (
    <div className="PostList Desktop">
      <div className="filters">
        <UI.Button
          visibilityType="colored"
          onClick={() => toggleModal("create post")}
        >
          Создать пост
        </UI.Button>
        <UI.Input
          visibilityType="search"
          className="search-input"
          placeholder="Поиск"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          value={searchValue}
          onSearch={() => console.log("click: search")} // api plug
        />
      </div>
      <div className="posts">
        {posts.map((post, index) => {
          return <Post id={index.toString()} key={index} content={post} />;
        })}
      </div>
    </div>
  );
};

export default PostList;
