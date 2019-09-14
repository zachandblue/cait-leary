import React from "react";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

import { colors } from "../styles/variables";

const Container = styled.div`
  position: fixed;
  z-index: 500;
  min-height: 100vh;
  width: 100vw;
  background-color: rgba(10, 10, 10, 0.5);
`;

const ModalCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 60vw;
  max-height: 90vh;
  border-radius: 15px;
  @media only screen and (max-width: 750px) {
    width: 90vw;
  }

  .gatsby-image-wrapper {
    /* width: 70vw; */
    border-radius: 4px;
    box-shadow: 2px 2px 10px rgba(10, 10, 10, 0.4);
    margin: auto;
    object-fit: cover;
    max-width: 60vw;
    max-height: 90vh;
    opacity: 1 !important;
    @media only screen and (max-width: 750px) {
      max-width: 90vw;
    }
  }
`;

const CloseButton = styled(FaTimes)`
  background: none;
  border: none;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 501;
  color: ${colors.light};
  &:hover {
    cursor: pointer;
  }
`;

const Modal = ({ children, animation, toggle, on }) => {
  return (
    <Container>
      <animated.div style={animation}>
        <ModalCard onClick={e => e.stopPropagation()}>
          <CloseButton onClick={toggle}></CloseButton>
          {/* <Hamburger
            onClick={() => {
              toggle(false);
            }}
            open={true}
            toggleSideNav={toggle}
          ></Hamburger> */}
          {children}
        </ModalCard>
      </animated.div>
    </Container>
  );
};

const ModalWrapper = ({ children, on, toggle, fluid }) => {
  const transition = useTransition(on, null, {
    from: { opacity: 0 },
    enter: { opacity: 1.5 },
    leave: { opacity: 0 },
    config: {
      duration: 300,
    },
  });
  return (
    <div onClick={toggle}>
      {transition.map(
        ({ item, key, props: animation }) =>
          item && (
            <Modal
              key={fluid}
              animation={animation}
              toggle={toggle}
              children={children}
              on={on}
            ></Modal>
          )
      )}

      {/* {children} */}
    </div>
  );
};

export default ModalWrapper;
