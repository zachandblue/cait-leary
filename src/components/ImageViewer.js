import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { useTransition, animated } from "react-spring";

const ImageTransition = styled.div`
  .transition {
    position: relative;
  }
  .animated {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 50%;
    color: white;
    font-weight: 800;
    font-size: 25em;
    will-change: transform, opacity;
    text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
  }
`;

const ImageViewer = ({ children, images }) => {
  const imageList = images.map(item => {
    return ({ style }) => (
      <animated.div
        className="animated"
        style={{ ...style, position: "absolute" }}
      >
        <Img fluid={item} />
      </animated.div>
    );
  });
  const [index, set] = useState(0);
  const onClick = useCallback(() => set(state => (state + 1) % 6), []);
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });
  return (
    <ImageTransition className="transition" onClick={onClick}>
      {transitions.map(({ item, props, key }) => {
        const Image = imageList[item];
        return <Image key={key} style={props} />;
      })}
    </ImageTransition>
  );
};

export default ImageViewer;
