import React, { useState } from "react";
// import { useSpring, animated } from "react-spring";

import Doors from "../components/Doors";
import Layout from "../components/layout";
import About from "../components/About";
import TourDates from "../components/TourDates";
import MusicPlayer from "../components/MusicPlayer";
import SEO from "../components/seo";

import { sameSite } from "../components/GlobalState";

const IndexPage = ({ location }) => {
  const [isNavOpen, setNavOpen] = useState(sameSite !== "no" ? false : true);
  // const navAnimation = useSpring({
  //   transform: isNavOpen
  //     ? `translate3d(0,0,0) scale(1) `
  //     : `translate3d(100%,100%,0) scale(0.6)`,
  // });
  // const fade = useSpring({
  //   from: {
  //     opacity: 0,
  //   },
  //   opacity: 1,
  // });

  // useEffect(() => {
  //   if (sameSite !== "no") {
  //     setNavOpen(false);
  //   }
  // });
  return (
    <Layout location={location} isNavOpen={isNavOpen}>
      <SEO
        title="Home"
        keywords={[`Cait`, `Leary`, `Nashville`, `songwriter`, `singer`]}
      />
      {!isNavOpen ? (
        <>
          <About />
          <MusicPlayer />
          <TourDates />
        </>
      ) : null}
      <Doors isOpen={isNavOpen} setNavOpen={setNavOpen} />
    </Layout>
  );
};

export default IndexPage;
