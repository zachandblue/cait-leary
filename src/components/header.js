import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSpring, animated, useTrail } from "react-spring";

import styled from "styled-components";
import { colors } from "../styles/variables";
import { update } from "./GlobalState";

const HeaderNav = styled(animated.header)`
  background: linear-gradient(rgba(30, 10, 10, 0.7), rgba(20, 20, 20, 0));
  position: absolute;
  z-index: 500;
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
    color: ${colors.light};
    font-family: "Source Code Pro", monospace;
    font-weight: ${props => (props.active ? "500" : 300)};
    text-decoration: none !important;
    padding: 1.5rem;
    font-size: ${props => (props.active ? "19px" : "18px")};
    &:hover {
      color: white;
      filter: drop-shadow(2px 2px 2px rgba(255, 255, 255, 0.2));
    }
    &:before {
      content: ${props => (props.active ? "-d" : "dd")};
    }
    &.active {
      color: white;
      filter: drop-shadow(2px 2px 2px rgba(255, 255, 255, 0.2));
    }

    @media only screen and (max-width: 600px) {
      font-size: 1.75rem;
      &.active {
        color: white;
        filter: drop-shadow(2px 2px 2px rgba(255, 255, 255, 0.2));
        &:before {
          content: "✓";
        }
      }
    }
  }
`;

const Header = ({ siteTitle, menu, location, sideNav, setNavOpen }) => {
  let innerWidth = 601;
  if (typeof window !== "undefined" && window) {
    if (window.innerWidth) {
      innerWidth = window.innerWidth;
    }
  }

  const [width, setWidth] = useState(innerWidth);
  const { X } = useSpring({
    X: sideNav ? 0 : 100,
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
              transform: X.interpolate(X => `translate3d(${X * -1}%, 0, 0)`),
            }
      }
    >
      <div
        style={{
          // margin: `0 auto`,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: "auto",
          marginRight: "auto",
          padding: `1.45rem 1.0875rem`,
          // padding: "1rem",
          position: "relative",
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NavItem>
            <Link to="/" className={`/` === location.pathname ? "active" : ""}>
              Home
            </Link>
          </NavItem>

          {/* {trail.map(({ x, height, ...rest }, index) => (
            <NavItem
              style={{
                ...rest,
                transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
              }}
              key={`1`}
            >
              <Link to="/">Home</Link>
            </NavItem>
          ))} */}

          {sideNav
            ? trail.map(({ x, height, ...rest }, index) => (
                <NavItem
                  style={{
                    ...rest,
                    transform: x.interpolate(x => `translate3d(0,${x}px,0)`),
                  }}
                  key={`/${menu[index].object_slug}`}
                >
                  <Link
                    to={`/${menu[index].object_slug}`}
                    className={
                      `/${menu[index].object_slug}` === location.pathname
                        ? "active"
                        : ""
                    }
                  >
                    {menu[index].title}
                  </Link>
                </NavItem>
              ))
            : menu.map(item => (
                <NavItem key={`/${item.object_slug}`}>
                  <Link
                    key={`/${item.object_slug}`}
                    to={`/${item.object_slug}`}
                    className={
                      `/${item.object_slug}` === location.pathname
                        ? "active"
                        : ""
                    }
                  >
                    {item.title}
                  </Link>
                </NavItem>
              ))}
          {/* {trail.map(({ x, height, ...rest }, index) => (
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
          ))} */}
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
