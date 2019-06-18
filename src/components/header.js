import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSpring, animated, useTrail } from "react-spring";

import styled from "styled-components";
import { colors } from "../styles/variables";

const HeaderNav = styled(animated.header)`
  background: linear-gradient(rgba(30, 10, 10, 0.8), rgba(20, 20, 20, 0));
  position: absolute;
  z-index: 150;
  width: 100%;
  @media only screen and (max-width: 600px) {
    background: rgba(40, 35, 35, 0.9);
    height: 200vh;
    width: 100vw;
    nav {
      flex-direction: column;
      align-items: flex-end;
      transform: translateY(45px);
    }
    nav > * {
      margin: 1.25rem 0;
    }
  }
`;

const NavItem = styled(animated.div)`
  a {
    color: #f9e9dd;
    color: ${colors.light};
    font-family: "Source Code Pro", monospace;
    font-weight: 400;
    text-decoration: none !important;
    padding: 1.5rem;
    font-size: 18px;
    @media only screen and (max-width: 600px) {
      font-size: 1.75rem;
    }
  }
`;

const Header = ({ siteTitle, menu, location, sideNav }) => {
  let innerWidth = 601;
  if (typeof window !== "undefined" && window) {
    if (window.innerWidth) {
      innerWidth = window.innerWidth;
    }
  }

  const [width, setWidth] = useState(innerWidth);
  const { x } = useSpring({
    x: sideNav ? 0 : 100,
  });

  const trail = useTrail(2, {
    opacity: sideNav ? 1 : 0,
    x: sideNav ? 0 : 180,
    height: sideNav ? 180 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <HeaderNav
      style={
        width > 600
          ? {}
          : {
              transform: x.interpolate(x => `translate3d(${x * -1}%, 0, 0)`),
            }
      }
    >
      <div
        style={{
          margin: `0 auto`,
          padding: `1.45rem 1.0875rem`,
          position: "relative",
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NavItem style={trail}>
            <Link to="/">Home</Link>
          </NavItem>
          {!sideNav
            ? menu.map(item => (
                <NavItem style={trail} key={`/${item.object_slug}`}>
                  <Link
                    key={`/${item.object_slug}`}
                    to={`/${item.object_slug}`}
                  >
                    {item.title}
                  </Link>
                </NavItem>
              ))
            : trail.map(({ x, height, ...rest }, index) => (
                <NavItem
                  style={{
                    ...rest,
                    transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
                  }}
                  key={`/${menu[index].object_slug}`}
                >
                  <Link to={`/${menu[index].object_slug}`}>
                    {menu[index].title}
                  </Link>
                </NavItem>
              ))}
        </nav>
      </div>
    </HeaderNav>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;