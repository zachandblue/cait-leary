import React, { Component, useEffect, useState, useRef } from "react";
import { StaticQuery, graphql } from "gatsby";
import { useSpring, animated } from "react-spring";

import Img from "gatsby-image";
import styled from "styled-components";
import { colors } from "../styles/variables";
import { ImageWrapper } from "../Elements/ImageWrapper";

const AboutSection = styled.section`
  background: ${colors.light};
  color: ${colors.dark};
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }

  min-height: 500px;
  .left {
    align-self: center;
    justify-self: center;
    text-align: center;
    width: 300px;
    h1 {
      font-family: Abel;
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
      display: block;
    }
  }
  .right {
    display: grid;
    .gatsby-image-wrapper {
      align-self: center;
      justify-self: center;
      height: 350px;
      width: 350px;
      @media only screen and (max-width: 600px) {
        height: auto;
        width: 100%;
      }
    }
  }
`;

const About = () => {
  const [isVisible, setIsVisible] = useState(true);
  let aboutDiv = useRef();

  const fade = useSpring({
    opacity: isVisible ? 1 : 0,
  });

  // useEffect(() => {
  //   window.addEventListener("scroll", scrollHandler);
  //   return () => {
  //     window.removeEventListener("scroll", scrollHandler);
  //   };
  // });

  const scrollHandler = e => {
    if (
      aboutDiv &&
      aboutDiv.current &&
      window.scrollY + 900 > aboutDiv.current.offsetTop
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(true);
    }
  };

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
          <ImageWrapper>
            {/* <Img fluid={data.file.childImageSharp.fluid} /> */}
          </ImageWrapper>
          <animated.div className="left" style={fade}>
            <h1 ref={aboutDiv}>{data.wordpressWpAbout.title}</h1>
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
            <h1 ref={aboutDiv}>New Single</h1>
            <p>I don't want to fall in love again</p>
          </animated.div>
        </AboutSection>
      )}
    />
  );
};

export default About;
