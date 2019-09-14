import React, { useState, useRef } from "react";
import { StaticQuery, graphql } from "gatsby";
import { useSpring, animated } from "react-spring";

import Img from "gatsby-image";
import styled from "styled-components";
import { colors } from "../styles/variables";
// import { ImageWrapper } from "../Elements/ImageWrapper";
import moment from "moment";

const Container = styled.div`
  width: 100%;
  position: relative;
  background: ${colors.dark};
  color: ${colors.light};
  font-family: Abel;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  width: 100vw;
  position: relative;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100%;
  position: absolute;
  z-index: 1;
  background-color: black;
  opacity: 0.5;
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const countDown = () => {
  const eventdate = moment("2019-09-27");
  const todaysdate = moment();
  return eventdate.diff(todaysdate, "days");
};

const Download = () => {
  return (
    <StaticQuery
      query={graphql`
        query DownloadImageQuery {
          file(relativePath: { regex: "/vibes2/" }) {
            childImageSharp {
              fluid(maxHeight: 1800) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      `}
      render={data => (
        <Container>
          <Overlay />

          <ImageWrapper>
            <Img fluid={data.file.childImageSharp.fluid} />
          </ImageWrapper>

          <Content>
            <h1>I Don't Want To Fall In Love Again</h1>
            <h2>Available for Download In:</h2>
            <p>{countDown()} days</p>
          </Content>
        </Container>
      )}
    />
  );
};

export default Download;
