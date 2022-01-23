import React from 'react';
import Header from './header/header';
import './layout.scss';
import { type AppState } from '../../store/combiner';
import { useSelector, shallowEqual } from "react-redux";

const Layout = function (props: { children: JSX.Element }) {
  const layoutMode = useSelector(({ layoutMode }: AppState) => (layoutMode), shallowEqual);

  return (
    <>
      <Header isDark={!!layoutMode}/>
      <div className={`container-fluid main-wrapper ${layoutMode ? "dark" : ""}`} id="main-container">
        {props.children}
      </div>
    </>
  )
};

export default Layout;
