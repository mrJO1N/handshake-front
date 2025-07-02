import React, { FC, useState } from "react";

import "./PostList.sass";
import Post from "./components/Post";
import { IPostContent } from "../../../main.types";
import { UI } from "@comp/ui";
import { useNavigate } from "react-router-dom";

const PostList: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
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
    <div className="PostList Mobile">
      <div className="create-post-container">
        <UI.Button
          className="create-post-button"
          visibilityType="colored"
          onClick={() => navigate("/create-post")}
        >
          Создать пост
        </UI.Button>
      </div>
      <UI.Input
        className="search-input"
        visibilityType="search"
        placeholder="Поиск"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
        onSearch={() => console.log("click: search")} // api plug
      />
      <div className="posts">
        {posts.map((post, index) => {
          return <Post id={index.toString()} key={index} content={post} />;
        })}
      </div>
    </div>
  );
};

export default PostList;
