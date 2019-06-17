import React, { Component, Fragment, useState } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import styled from "styled-components";
import { colors } from "../styles/variables";
import getLyrics from "../lyrics/FallInLoveAgain";

const LyricsWrapper = styled.div`
  position: absolute;
  left: 5.5%;
  bottom: 6rem;
  display: flex;
  justify-content: flex-start;
  /* align-self: flex-end; */
  flex-direction: column;
  width: 300px;
  max-height: calc(6rem + 20px);
  overflow: hidden;

  p {
    color: #ccc;
    font-family: "Abel";
    font-weight: 500;
    text-shadow: 2px 2px 9px rgba(20, 20, 20, 059);
    font-size: 1.5rem;
    height: 3rem;
    min-height: 3rem;
    text-align: left;
    padding: 0;
    margin: 0.35rem 0;
    text-transform: none;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .active {
    color: ${colors.light};
  }
`;

const Lyrics = ({ progress, activeKey }) => {
  const lyrics = getLyrics();
  const [items, setItems] = useState(lyrics);
  const [sdprogress, incrementProgress] = useState(0);
  const [aactiveKey, incrementKey] = useState(0);

  const scroll = useSpring({
    from: {
      transform: `translateY(${progress}rem)`,
    },
    transform: `translateY(-${progress}rem )`,
  });

  const fade = useSpring({
    from: {
      opacity: 0,
    },
    opacity: 1,
  });

  return (
    <Fragment>
      <LyricsWrapper>
        {Object.keys(lyrics).map(key => (
          <animated.p
            style={scroll}
            key={key}
            style={{
              ...scroll,
              color: activeKey == key ? "white" : "#ccc",
            }}
          >
            {lyrics[key]}
          </animated.p>
        ))}
      </LyricsWrapper>
      {/* <animated.button
        onClick={() => {
          incrementProgress(progress + 3.7);
          incrementKey(activeKey + 1);
        }}
      >
        Toggle
      </animated.button> */}
    </Fragment>
  );
};

export default Lyrics;
