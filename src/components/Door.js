/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import Header from "./header";
import FixedHeader from "./FixedHeader";
import "./layout.css";
import { colors } from "../styles/variables";

const HeroWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .gatsby-image-wrapper {
    width: 100vw;
    min-height: 100vh;
  }
  .overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(30, 30, 30, 0.1);
    z-index: 100;
  }
  .hero-cta {
    z-index: 120;
    position: absolute;
    width: 80%;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .hero-cta-btn {
      background: transparent;
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
    }
    h1 {
      color: ${colors.light};
      font-family: "Abel";
      font-size: 6rem;
      font-size: 10vw;
      font-weight: 400;
    }
  }
`;

const Door = ({ align }) => (
  <StaticQuery
    query={graphql`
      query DoorsImageQuery {
        file(relativePath: { regex: "/water3/" }) {
          childImageSharp {
            fluid(maxWidth: 4000) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <HeroWrapper>
          <div className="overlay" />
          <Img
            style={{
              transform:
                align === "left" ? "translateX(0%)" : "translateX(-50%)",
            }}
            fluid={data.file.childImageSharp.fluid}
          />
        </HeroWrapper>
      </>
    )}
  />
);

export default Door;
