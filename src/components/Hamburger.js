import React from "react";
import styled from "styled-components";
import { colors } from "../styles/variables";

const Wrapper = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  z-index: 850;
  right: 15px;
  top: 20px;
  transition: all 0.3s;
  &:focus {
    outline: none;
  }
  &:hover {
    transform: scale(1.1);
  }

  .top-bun {
    transform: rotate(45deg);
    transform-origin: 1% 100%;
  }

  .bottom-bun {
    transform: rotate(-45deg);
    transform-origin: 10% 50%;
  }

  .vegetarian {
    transform: translateX(800px);
  }
  @media only screen and (min-width: 600px) {
    display: none;
  }
`;

const Bun = styled.div`
  background-color: ${colors.light};
  width: 30px;
  height: 4px;
  margin-bottom: 6px;
  transition: all 0.3s;

  &:nth-child(3) {
    margin-bottom: 0;
  }
`;

const Patty = styled(Bun)`
  transition: all 0.03s;
`;

const Hamburger = ({ isOpen, open, toggleSideNav }) => {
  // const fade = useSpring({
  //   x: sideNav ? 0 : 100,
  // });

  return (
    <Wrapper onClick={() => toggleSideNav(!open)}>
      <Bun className={open ? "top-bun" : ""} />
      <Patty className={open ? "vegetarian" : ""} />
      <Bun className={open ? "bottom-bun" : ""} />
    </Wrapper>
  );
};

export default Hamburger;
