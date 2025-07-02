import React, { FC } from "react";

const Home: FC<IHomeProps> = ({ TopMenu, PostList }) => {
  return (
    <>
      <TopMenu />
      <PostList />
    </>
  );
};

interface IHomeProps {
  TopMenu: FC;
  PostList: FC;
}

export default Home;
