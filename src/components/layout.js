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
import { configureAnchors } from "react-scrollable-anchor";
import { FaFacebook, FaInstagram, FaTwitter, FaBars } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import Header from "./header";
import FixedHeader from "./FixedHeader";
import Hamburger from "./Hamburger";
import "./layout.css";
import { ImageWrapper } from "../Elements/ImageWrapper";
import { colors } from "../styles/variables";

configureAnchors({
  offset: -100,
  scrollDuration: 400,
  keepLastAnchorHash: true,
});

const HeroWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  .gatsby-image-wrapper {
    height: 55vw;

    div {
      padding-bottom: 55%;
    }
    picture {
      img {
        object-position: bottom !important;
        @media only screen and (max-width: 430px) {
          object-position: left !important;
        }
      }
    }
    @media only screen and (max-width: 600px) {
      min-height: 68vh;
    }
    @media only screen and (max-width: 430px) {
      min-height: 73vh;
    }
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    @media only screen and (max-width: 750px) {
      justify-content: space-around;
      width: 100%;
    }

    .hero-cta-btn {
      background: transparent;
      background: rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 10px rgba(10, 10, 10, 0.8);
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.99);

      border: 2.2px solid ${colors.light};
      color: ${colors.light};
      border-radius: 2px;
      padding: 0.8vw 1vw;
      font-family: "Raleway";
      font-size: 2.5vw;
      transition: all 0.4s;
      font-weight: 550;

      &:hover {
        background: ${colors.light};
        color: #471548;
      }
      @media only screen and (max-width: 750px) {
        font-size: 1.65rem;
        padding: 0.8rem 0.8rem;
      }
      @media only screen and (max-width: 600px) {
        margin-top: 8rem;
      }
    }
    h1 {
      color: ${colors.light};
      text-shadow: 2px 2px 10px rgba(10, 10, 10, 0.8);

      font-family: "Abel";
      font-size: 6rem;
      font-size: 10vw;
      font-weight: 400;
      @media only screen and (max-width: 750px) {
        font-size: 4.5rem;
        padding: 1rem 1rem;
      }
    }
  }
`;

const Footer = styled.footer`
  height: 300px;
  width: 100%;
  position: relative;
  overflow: hidden;
  /* background: ${colors.dark}; */
  color: ${colors.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-around; */
  color: ${colors.light};
  .socials {
    width: 300px;
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 350;
    
  }
  .social {
    padding: 1px;
    font-size: 2rem;
    transition: all .2s;
    &:hover {
      color: white;
      transform: scale(1.1)
    }
  }
  .copyright {
    z-index: 350;
    position: absolute;
    bottom: 20px;
    font-family: "Raleway";
    font-size: 1rem;
    color: ${colors.light}
  }
  img {

    position: absolute;
  }
  .gatsby-image-wrapper {
    height: 300px;
    width: 100vw;
    position: absolute;

    div {
      padding-bottom: 55%;
    }
    picture {
      img {
        object-position: center !important;
        /* @media only screen and (max-width: 430px) {
          object-position: left !important;
        } */
      }
    }
    /* @media only screen and (max-width: 600px) {
      min-height: 68vh;
    }
    @media only screen and (max-width: 430px) {
      min-height: 73vh;
    } */
  }
  .overlay {
    position: absolute;
    height: 300px;
    width: 100%;
    background-color: rgba(20, 15, 10, 0.8);
    z-index: 100;
  }
  a {
    color: ${colors.light}
  }
`;

const Layout = ({ children, location, isNavOpen }) => {
  const [sideNav, toggleSideNav] = useState(false);

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
          image1: file(relativePath: { regex: "/mirror/" }) {
            childImageSharp {
              fluid(maxWidth: 3000) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          image2: file(relativePath: { regex: "/vibes7/" }) {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          wordpressWpApiMenusMenusItems(slug: { eq: "main-nav" }) {
            items {
              title
              url
              object_slug
            }
          }
        }
      `}
      render={data => (
        <>
          <Header
            siteTitle={data.site.siteMetadata.title}
            menu={data.wordpressWpApiMenusMenusItems.items}
            location={location}
            sideNav={sideNav}
            toggleSidNav={toggleSideNav}
          />
          <FixedHeader
            siteTitle={data.site.siteMetadata.title}
            menu={data.wordpressWpApiMenusMenusItems.items}
            location={location}
            show={true}
          />
          <Hamburger
            onClick={() => {
              toggleSideNav(!sideNav);
            }}
            sideNav={sideNav}
            toggleSideNav={toggleSideNav}
          >
            <FaBars />
          </Hamburger>
          {location && location.pathname === "/" && (
            <HeroWrapper>
              <div className="overlay" />
              <Img fluid={data.image1.childImageSharp.fluid} />
              <div className="hero-cta">
                <h1>{data.site.siteMetadata.title}</h1>
                <a href="#music">
                  <button className="hero-cta-btn">LISTEN</button>
                </a>
              </div>
            </HeroWrapper>
          )}
          <div
            style={{
              margin: `0 auto`,
              paddingTop: 0,
            }}
          >
            <main style={{ overflow: "hidden" }}>{children}</main>
            {location &&
              !location.pathname.includes("/contact") &&
              !location.pathname.includes("/sample-page") &&
              !isNavOpen && (
                <Footer>
                  <div className="socials">
                    <a
                      href="https://www.instagram.com/caitleary/"
                      target="_blank"
                    >
                      <FaInstagram className="social" />
                    </a>
                    <a
                      href="https://www.facebook.com/CaitLearyMusic"
                      target="_blank"
                    >
                      <FaFacebook className="social" />
                    </a>
                    <a href="https://twitter.com/caitleary" target="_blank">
                      <FaTwitter className="social" />
                    </a>
                  </div>
                  <div className="copyright">
                    © {new Date().getFullYear()} Cait Leary{" "}
                  </div>
                  <div className="overlay" />
                  <ImageWrapper>
                    <Img fluid={data.image2.childImageSharp.fluid} />
                  </ImageWrapper>
                </Footer>
              )}
          </div>
        </>
      )}
    />
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
