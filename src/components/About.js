import React, { useState, useRef } from "react";
import { StaticQuery, graphql } from "gatsby";
import { useSpring, animated } from "react-spring";

import Img from "gatsby-image";
import styled from "styled-components";
import { colors } from "../styles/variables";
import { ImageWrapper } from "../Elements/ImageWrapper";

const AboutSection = styled.section`
  background: ${colors.light};
  color: ${colors.dark};
  display: flex;
  flex-direction: column;
  height: auto;
  /* grid-template-columns: 1fr; */

  h2 {
    width: 80%;
    max-width: 400px;
    padding: 2rem 0;
    margin: 0 auto;
    font-size: 3rem;
    font-family: Abel;
    text-align: center;
  }

  .left {
    flex: 1;
    align-self: center;
    justify-self: center;
    text-align: center;
    width: 300px;
    /* min-height: 300px !important; */
    h1 {
      font-family: Abel;
      margin: 40px;
    }
    p {
      font-family: "Source Code Pro", monospace;
      line-height: 35px;
    }
    @media only screen and (max-width: 600px) {
      padding: 3rem 0;
      h1 {
        font-size: 4rem;
      }
      p {
        font-size: 2rem;
      }
    }
    @media only screen and (max-width: 350px) {
      h1 {
        font-size: 3rem;
      }
      p {
        font-size: 1.5rem;
      }
    }
  }
  .mobile-only {
    display: none;
    @media only screen and (max-width: 600px) {
      flex: 1;

      display: block;
    }
  }
  .right {
    flex: 1;

    display: grid;
    .gatsby-image-wrapper {
      align-self: center;
      justify-self: center;
      height: 650px;
      width: 650px;
      margin-bottom: 20vh;

      @media only screen and (max-width: 600px) {
        height: 100vw;
        width: 100%;
        margin-bottom: 0vh;
      }
    }
  }
`;

const About = () => {
  const [isVisible] = useState(true);
  let aboutDiv = useRef();
  const fade = useSpring({
    opacity: isVisible ? 1 : 0,
  });

  return (
    <StaticQuery
      query={graphql`
        query AboutQuery {
          wordpressWpAbout(slug: { eq: "hey" }) {
            id
            date
            title
            acf {
              about
            }

            featured_media {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        <AboutSection>
          {/* <ImageWrapper>
            <Img fluid={data.file.childImageSharp.fluid} />
          </ImageWrapper> */}
          <animated.div className="left" style={fade}>
            <h2 ref={aboutDiv}>{data.wordpressWpAbout.title}</h2>
            <p>{data.wordpressWpAbout.acf.about}</p>
          </animated.div>
          <animated.div className="right" style={fade}>
            <Img
              fluid={
                data.wordpressWpAbout.featured_media.localFile.childImageSharp
                  .fluid
              }
            />
          </animated.div>
          <animated.div className="left mobile-only" style={fade}>
            <h2 ref={aboutDiv}>New Single</h2>
            <p>I don't want to fall in love again</p>
          </animated.div>
        </AboutSection>
      )}
    />
  );
};

export default About;
