import React, { FC, useEffect, useState } from "react";

import "./App.sass";
import components, { IDifferentComponents } from "@comp/index";
import { useNavigate } from "react-router-dom";
import AppContext from "./contexts/app.context";
import { useCustomModal } from "./components/custom-modal";
import { useWindowSize } from "./hooks/useWindowSize";
import { getFromConfig } from "./services/config.service";
import MainRoutes from "./routes/index";

const App: FC = () => {
  const { toggleModalTo, setModalStyle, CustomModal } = useCustomModal();
  const [windowWidth, windowHeight] = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [usedComponents, setUsedComponents] = useState<IDifferentComponents>({
    TopMenu: components.differentComponents.desktop.TopMenu,
    PostList: components.differentComponents.desktop.PostList,
  });
  const navigate = useNavigate();

  const MIN_DESKTOP_WIDTH = getFromConfig("MIN_DESKTOP_WIDTH");

  useEffect(() => {
    if (MIN_DESKTOP_WIDTH && windowWidth < +MIN_DESKTOP_WIDTH) {
      setIsMobile(true);
      setUsedComponents(components.differentComponents.mobile);
    } else {
      setIsMobile(false);
      setUsedComponents(components.differentComponents.desktop);

      navigate("/");
    }
  }, [
    windowWidth,
    setIsMobile,
    MIN_DESKTOP_WIDTH,
    setUsedComponents,
    navigate,
  ]);

  return (
    <AppContext.Provider
      value={{
        isMobile,
        windowWidth,
        windowHeight,
        setModalStyle,
        toggleModal: toggleModalTo,
      }}
    >
      <div className="App">
        <MainRoutes
          TopMenu={usedComponents.TopMenu}
          PostList={usedComponents.PostList}
        />
      </div>
      <CustomModal />
    </AppContext.Provider>
  );
};

export default App;
