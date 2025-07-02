import CreatePost from "@/routes/pages/CreatePost";
import Home from "@/routes/pages/Home";
import Login from "@/routes/pages/Login";
import Signup from "@/routes/pages/Signup";
import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

const MainRoute: FC<IMainRouteProps> = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login {...props} />} />
      <Route path="/signup" element={<Signup {...props} />} />
      <Route path="/create-post" element={<CreatePost {...props} />} />
      <Route path="/*" element={<Home {...props} />} />
    </Routes>
  );
};

interface IMainRouteProps {
  TopMenu: FC;
  PostList: FC;
}

export default MainRoute;
