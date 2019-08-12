import React, { Component, useState } from "react";
import { useTransition } from "react-spring";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import BackgroundImage from "gatsby-background-image";
import styled from "styled-components";
import { FaFacebook, FaInstagram, FaTwitter, FaBars } from "react-icons/fa";

import Layout, { HeroWrapper } from "../components/layout";
import ImageViewer from "../components/ImageViewer";
import Modal from "../components/Modal";

import SEO from "../components/seo";
import { colors } from "../styles/variables";

const Wrapper = styled.div`
  position: relative;
  font-family: "Raleway";
  /* max-height: 100vh; */
  overflow: scroll;
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.light};

  h1 {
    color: ${colors.light};
    text-align: center;
    font-family: "Abel";
    font-size: 50px;
    width: 100%;
    margin-bottom: 30px;
  }

  h2 {
    width: 80%;
    color: ${colors.light};
    max-width: 400px;
    padding: 3rem 0;
    margin: 0 auto;
    font-size: 3rem;
    font-family: Abel;
    text-align: center;
  }
  p {
    color: ${colors.light};
    text-align: center;
    font-family: "Abel";
    text-transform: none;
    margin: 20px 0;
    font-size: 26px;
    @media only screen and (max-width: 600px) {
      max-width: 90%;
    }
  }

  .background {
    position: absolute;
    height: 100vh;
    width: 100vw;
  }

  .gatsby-image-wrapper {
    height: 100vh;
    z-index: 1;
    filter: sepia(0%) brightness(0.4) saturate(350%);
  }
  .gatsby-image-wrapper > picture > img {
    object-position: center top !important;
  }
`;

const Content = styled.div`
  z-index: 2;
  position: relative;
  margin: auto;
  /* top: 50%;
  left: 50%;
  transform: translate3d(-50%, 50%, 0); */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .section {
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    /* background-image: radial-gradient(black 9px, transparent 10px),
      repeating-radial-gradient(
        black 0,
        black 4px,
        #020101 5px,
        #020101 20px,
        black 21px,
        black 25px,
        #020101 26px,
        #020101 50px
      );
    background-size: 30px 30px, 90px 90px;
    background-position: 0 0; */
  }
`;

const ContentWrapper = styled.section`
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const VideoContainer = styled.div`
  z-index: 3;
  position: relative;
  width: 100%;
  margin: 3rem 0 30vh;
  padding-bottom: 56.25%;
  height: 0;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const ImageContainer = styled.div`
  z-index: 3;
  margin: 0vh auto 20vh;
  width: 90%;
  max-width: 900px;
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  /* display: grid;
  grid-gap: 0rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 200px; */

  .photo {
    align-self: center;
    justify-self: center;
    /* min-height: 200px;
    max-height: 400px; */
    width: 250px;
    height: auto;
    max-height: 450px;
    height: 250px;
    margin: 10px;
    @media only screen and (max-width: 600px) {
      height: auto;
      width: 100%;
    }
  }

  .gatsby-image-wrapper {
    align-self: center;
    justify-self: center;
    /* min-height: 200px;
    max-height: 400px; */
    width: 250px;
    height: auto;
    max-height: 450px;
    height: 250px;
    /* margin: 10px; */
    /* transition: 1s all linear; */

    img {
      transition: 0.5s all linear !important;
      opacity: 1 !important;
      &:hover {
        opacity: 0.1 !important;
      }
    }
    picture > img {
      transition: 0.5s all linear !important;

      opacity: 0.5 !important;
      &:hover {
        opacity: 0.9 !important;
      }
    }
    @media only screen and (max-width: 600px) {
      height: auto;
      width: 100%;
    }
  }
`;

export default class TheBad extends Component {
  state = {
    loading: false,
    modal: false,
    fluid: "",
  };

  toggleModal = image => {
    this.setState({ modal: !this.state.modal, fluid: image });
  };

  componentDidMount() {}

  render() {
    const { data, location } = this.props;
    const {
      email,
      text,
      loading,
      phoneNumber6tY4bPYk,
      modal,
      fluid,
    } = this.state;
    return (
      <StaticQuery
        query={graphql`
          query TheBadQuery {
            heroImage: file(relativePath: { regex: "/band1/" }) {
              childImageSharp {
                fluid(maxHeight: 1500) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
            videoBackground: file(relativePath: { regex: "/LIVE4/" }) {
              childImageSharp {
                fluid(maxHeight: 1500) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
            allWordpressWpImage {
              edges {
                node {
                  featured_media {
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 1500) {
                          ...GatsbyImageSharpFluid_tracedSVG
                        }
                      }
                    }
                  }
                }
              }
            }
            wordpressPage(slug: { eq: "the-bad" }) {
              title
              acf {
                about
                video
                video_title
                video_description
              }
            }
          }
        `}
        render={data => (
          <Layout location={location}>
            <SEO title={data.wordpressPage.title} />
            <Modal toggle={this.toggleModal} on={modal}>
              <Img fluid={fluid} />
            </Modal>
            <Wrapper>
              <HeroWrapper>
                <div className="overlay" />
                <Img fluid={data.heroImage.childImageSharp.fluid} />
                <div className="hero-cta">
                  <h1>{data.wordpressPage.title}</h1>
                  <p>{data.wordpressPage.acf.about}</p>
                </div>
              </HeroWrapper>
              <Content>
                <div
                  // Tag="section"
                  className="section"
                  // fluid={[
                  //   `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0))`,
                  //   // data.videoBackground.childImageSharp.fluid,
                  // ]}
                  // backgroundColor={`#FFFFFF`}
                >
                  <ContentWrapper>
                    <h2>{data.wordpressPage.acf.video_title}</h2>
                    <p>{data.wordpressPage.acf.video_description}</p>

                    <VideoContainer>
                      <iframe
                        width="100%"
                        src={`https://www.youtube.com/embed/${data.wordpressPage.acf.video}`}
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </VideoContainer>
                  </ContentWrapper>
                </div>
                <h2 style={{ color: "black" }}>Gallery</h2>
                <ImageContainer>
                  {data.allWordpressWpImage.edges.map(item => {
                    return (
                      <div
                        className="photo"
                        onClick={() =>
                          this.toggleModal(
                            item.node.featured_media.localFile.childImageSharp
                              .fluid
                          )
                        }
                      >
                        <Img
                          onClick={this.toggleModal}
                          fluid={
                            item.node.featured_media.localFile.childImageSharp
                              .fluid
                          }
                        />
                      </div>
                      // </div>
                    );
                  })}
                </ImageContainer>
              </Content>

              {/* <div
                dangerouslySetInnerHTML={{
                  __html: data.wordpressPage.content,
                }}
              /> */}
              {/* <div className="overlay" /> */}
            </Wrapper>
          </Layout>
        )}
      />
    );
  }
}
