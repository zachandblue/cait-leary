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
import moment from "moment";
import { configureAnchors } from "react-scrollable-anchor";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaBars,
  FaSpotify,
} from "react-icons/fa";

import Header from "./header";
import FixedHeader from "./FixedHeader";
import Hamburger from "./Hamburger";
import { sameSite } from "./GlobalState";

import "./layout.css";
import { ImageWrapper } from "../Elements/ImageWrapper";
import { colors } from "../styles/variables";

configureAnchors({
  offset: -100,
  scrollDuration: 400,
  keepLastAnchorHash: false,
});

export const HeroWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  .gatsby-image-wrapper {
    height: 55vw;
    height: 100vh;

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
      &:focus {
        outline: none;
        box-shadow: 4px 4px 10px rgba(10, 10, 10, 0.8);
      }
      @media only screen and (max-width: 750px) {
        font-size: 1.65rem;
        padding: 0.8rem 0.8rem;
      }
      @media only screen and (max-width: 600px) {
        /* margin-top: 8rem; */
      }
    }

    .spotify {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      transform: scale(1.1);
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
    h2 {
      color: ${colors.light};
      text-shadow: 2px 2px 10px rgba(10, 10, 10, 0.8);

      font-family: "Abel";
      font-size: 2rem;
      font-weight: 400;
      margin: 0;
      @media only screen and (max-width: 750px) {
        font-size: 1.8rem;
        padding: 1rem 1rem;
      }
    }
    .days {
      margin-top: 40px;
      font-size: 3rem !important;
    }
  }
`;

const NewMusic = styled.div`
  margin: 50px;
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

const countDown = () => {
  const eventdate = moment("2019-09-27");
  const todaysdate = moment();
  return eventdate.diff(todaysdate, "days");
};

const beforeReleaseDate = () => {
  const eventdate = moment("2019-09-27");
  const todaysdate = moment();
  const diff = eventdate.diff(todaysdate, "days");
  if (diff > 0) {
    return true;
  } else {
    return false;
  }
};

const Layout = ({ children, location, isNavOpen, setNavOpen }) => {
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
          allWordpressWpDownload {
            edges {
              node {
                acf {
                  download_link
                  button_name
                }
              }
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
            setNavOpen={setNavOpen}
            toggleSidNav={() => toggleSideNav(false)}
          />
          <FixedHeader
            siteTitle={data.site.siteMetadata.title}
            menu={data.wordpressWpApiMenusMenusItems.items}
            location={location}
            setNavOpen={setNavOpen}
            show={true}
          />
          <Hamburger
            onClick={() => {
              toggleSideNav(!sideNav);
            }}
            open={sideNav}
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

                {beforeReleaseDate() ? (
                  <NewMusic>
                    <h2>New music available for download in...</h2>
                    <h2 className="days">{countDown()} days</h2>
                  </NewMusic>
                ) : (
                  <a
                    style={{ marginTop: "20px" }}
                    href={
                      data.allWordpressWpDownload.edges[0].node.acf
                        .download_link
                    }
                  >
                    <button className="hero-cta-btn">
                      {
                        data.allWordpressWpDownload.edges[0].node.acf
                          .button_name
                      }
                    </button>
                  </a>
                )}
                <div class="spotify">
                  <iframe
                    src="https://open.spotify.com/follow/1/?uri=spotify:artist:1jECbQgWzYppXgukwEIw9q&size=basic&theme=dark&show-count=0"
                    width="100"
                    height="35"
                    scrolling="no"
                    frameborder="0"
                    style={{ border: "none", overflow: "hidden" }}
                    allowtransparency="true"
                  ></iframe>
                </div>
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
            {location && !location.pathname.includes("/contact") && !isNavOpen && (
              <Footer>
                <div className="socials">
                  <a
                    href="https://www.instagram.com/caitleary/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="social" />
                  </a>
                  <a
                    href="https://www.facebook.com/CaitLeary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="social" />
                  </a>
                  {/* <a
                    href="https://twitter.com/caitleary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter className="social" />
                  </a> */}
                  <a
                    href="https://open.spotify.com/artist/1ERYRLjkTwjbE6ECkKDILz?si=BGFvN2DeT5KO9pkqhr-_aw"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSpotify className="social" />
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
