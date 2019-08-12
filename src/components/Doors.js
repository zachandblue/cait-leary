import React from "react";
import { useSpring, animated } from "react-spring";
import Door from "./Door";
import styled from "styled-components";
import { update } from "./GlobalState";
import { colors } from "../styles/variables";

const DoorsWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  z-index: 200;

  .door-left {
    width: 50%;
    height: 100%;
    background: white;
  }
  .door-right {
    width: 50%;
    height: 100%;
    background: white;
  }
`;

const Content = styled.div`
  position: absolute;
  top: calc(50% + 3.6vw);
  left: 0%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 300;
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1,
  h2,
  h3,
  p {
    font-family: "Raleway";
    color: ${colors.light};
    font-weight: 200;
    text-shadow: 2px 2px 20px rgba(20, 20, 20, 0.9);
  }
  h1 {
    font-size: 5rem;
  }
  h2 {
    font-size: 3.5rem;
  }
  h3 {
    font-size: 1.75rem;
    &:nth-child(3) {
      margin-bottom: 0 !important;
      padding-bottom: 0;
    }
  }
  p {
    margin-top: 0;
    padding-top: 0;
    font-size: 0.9rem;
  }
  .hero-cta-btn {
    background: transparent;
    box-shadow: 2px 2px 10px rgba(10, 10, 10, 0.8);
    text-shadow: 2px 2px 10px rgba(10, 10, 10, 0.8);
    border: 2px solid ${colors.light};
    color: ${colors.light};
    border-radius: 2px;
    padding: 0.8vw 1vw;
    font-family: "Raleway";
    font-size: 2vw;
    transition: all 0.4s;
    &:hover {
      background: ${colors.light};
      color: #471548;
    }
    @media only screen and (max-width: 750px) {
      font-size: 2rem;
      padding: 1rem 1rem;
    }
  }
  @media only screen and (max-width: 750px) {
    width: 300px;
  }
`;

const Doors = ({ isOpen, setNavOpen }) => {
  const { x } = useSpring({
    x: isOpen ? 0 : 100,
  });

  return (
    <DoorsWrapper
      style={{
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      <animated.div
        style={{
          transform: x.interpolate(x => `translate3d(${x * -1}%, 0, 0)`),
          position: "relative",
        }}
        className="door-left"
      >
        <Door align={"left"} />
      </animated.div>
      <animated.div
        style={{
          transform: x.interpolate(x => `translate3d(${x}%, 0, 0)`),
        }}
        className="door-right"
      >
        <Content style={{ opacity: isOpen ? 1 : 0 }}>
          <h3>New Album</h3>
          <h1>Cait Leary</h1>
          <h3>Patterns</h3>
          <p>(coming soon)</p>
          <button
            className="hero-cta-btn"
            style={{ zIndex: 300 }}
            onClick={() => {
              setNavOpen(!isOpen);
              update();
            }}
          >
            ENTER
          </button>
        </Content>
        <Door align={"right"} />
      </animated.div>
    </DoorsWrapper>
  );
};

export default Doors;
