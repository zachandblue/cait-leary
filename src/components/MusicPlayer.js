import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Sound from "react-sound";
import { FaPlay, FaPause } from "react-icons/fa";
import styled from "styled-components";
import { colors } from "../styles/variables";
import Again from "../audio/Again.m4a";
import ScrollableAnchor from "react-scrollable-anchor";
import Lyrics from "./Lyrics";

const Wrapper = styled.div`
  padding: 0rem 6rem 10rem;
  background: ${colors.dark};
  background: #1b1d1c;
  background-color: white;
  background-image: radial-gradient(black 9px, transparent 10px),
    repeating-radial-gradient(
      black 0,
      black 4px,
      #030101 5px,
      #030101 20px,
      black 21px,
      black 25px,
      #030101 26px,
      #030101 50px
    );
  background-size: 30px 30px, 90px 90px;
  background-position: 0 0;
  z-index: -1;

  @media only screen and (max-width: 950px) {
    padding: 0 0 9rem;
  }
  @media only screen and (max-width: 600px) {
    /* padding: 10rem 0 0; */
    background: #1b1d1c;
    padding: 0;
  }
`;

const H2Text = styled.h2`
  width: 80%;
  color: ${colors.light};
  max-width: 400px;
  padding: 2rem 0;
  margin: 0 auto;
  font-size: 3rem;
  font-family: Abel;
  text-align: center;
  @media only screen and (max-width: 600px) {
    /* padding: 10rem 0 0; */
    display: none;
  }
`;

const ParagraphText = styled.p`
  font-family: "Source Code Pro", monospace;
  line-height: 35px;
  color: ${colors.light};
  width: 400px;
  max-width: 400px;
  margin: 0 auto;
  padding: 0 0 2rem 0;
  text-align: center;
  @media only screen and (max-width: 600px) {
    /* padding: 10rem 0 0; */
    display: none;
  }
`;

const MusicSection = styled.section`
  position: relative;
  overflow: hidden;
  /* height: 50vw; */
  .gatsby-image-wrapper {
    position: relative;
    top: 0;
    @media only screen and (max-width: 600px) {
      min-height: 100vw;
    }
  }
  /* @media only screen and (max-width: 600px) {
    box-shadow: 4px 4px 5px black;
  } */
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
`;

const AbsoluteWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(30, 30, 30, 0.3);
  /* background-color: rgba(195, 195, 105, 0.1); */
  z-index: 2;
`;

const TitleTextWrapper = styled.div`
  position: absolute;
  left: 5.5%;
  top: 1rem;

  * {
    color: ${colors.light};
    font-family: "Abel";
    text-transform: none;
    opacity: 0.9;
    padding: 0;
    margin: 0;
  }
  .title {
    font-size: 1.75rem;
    padding-bottom: 0.5rem;
  }
  .artist {
    font-size: 1.25rem;
  }
`;

const Equalizer = styled.div`
  position: absolute;
  top: 0.25rem;
  right: 5.5%;
  /* padding: 1rem; */
  display: flex;
  align-items: flex-end;
  height: 4rem;
  z-index: 90;

  @keyframes bounce {
    0% {
      height: 0.25rem;
    }
    100% {
      height: 1.5rem;
    }
  }

  div {
    padding: 0.25rem;
    margin: 0.25rem;
    width: 0.5rem;
    height: 0.25rem;
    background: ${colors.light};
    opacity: 0.9;
    animation-fill-mode: both;
    animation-direction: alternate;
    animation-timing-function: ease;
  }

  .two {
    animation-delay: 0.25s;
    animation-duration: 0.4s;
  }
  .three {
    animation-delay: 0.55s;
    animation-duration: 0.3s;
  }
`;

// const LyricsWrapper = styled.div`
//   position: absolute;
//   right: 5%;
//   bottom: 6rem;
//   /* transform: translate3d(0%, -50%, 0); */
//   display: flex;
//   justify-content: flex-start;
//   flex-direction: column;
//   width: 25%;
//   .overlay {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     /* background: linear-gradient(black, transparent); */
//     opacity: 0.5;
//     /* z-index: -1; */
//   }
//   p {
//     color: ${colors.light};
//     font-family: "Abel";
//     font-weight: 500;
//     text-shadow: 2px 2px 9px rgba(20, 20, 20, 059);
//     font-size: 1.5rem;
//     /* line-height: 1.2rem; */
//     text-align: left;
//     padding: 0;
//     margin: 5px 0;
//   }
//   p:nth-child(1) {
//     color: #ccc;
//     text-shadow: 0px 0px 0px #222;
//     /* top: 45%; */
//   }
//   p:nth-child(2) {
//     color: ${colors.light};
//   }
//   p:nth-child(3) {
//     color: #ccc;
//     text-shadow: 0px 0px 0px #222;
//     /* top: 55%; */
//   }
// `;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 3.5rem;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;

  .full-bar {
    position: relative;
    width: 88%;
    height: 4px;
    background: ${colors.lightTransparent};
    display: flex;
    justify-content: flex-start;
  }
  .progress {
    position: absolute;
    align-self: flex-start;
    width: 50%;
    background: ${colors.light};
    z-index: 150;
    transition: width 0.1s linear;
    height: 4px;
  }
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0rem;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 6%;
  font-family: "Abel";

  p {
    color: ${colors.light};
  }
  .button {
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
    color: ${colors.light};
    transition: all 0.5s;
    &:hover {
      transform: scale(1.1);
    }
    &:focus {
      outline: none;
    }
  }
`;
const AlbumCoverWrapper = styled.div`
  position: absolute;
  bottom: 6rem;
  left: 6%;
  height: 5rem;
  width: 5rem;
  /* border: 1px solid white; */
`;

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      status: "STOPPED",
      seconds: "00",
      minutes: 0,
      progress: 0,
      total: "0:00",
      duration: 0,
      lyricsProgress: 0,
      activeKey: 0,
    };

    this.audio = React.createRef();
    this.progress = React.createRef();
  }

  handleSongLoading = ({ bytesLoaded, bytesTotal, duration }) => {
    let total = Math.floor(duration / 1000);
    let minutes = "0";
    let seconds = "00";

    if (parseInt(total) < 10) {
      seconds = "0" + total.toString();
    } else if (total < 60) {
      seconds = total;
    } else if (total > 60) {
      minutes = Math.floor(total / 60);
      seconds = Math.floor(total % 60);
      if (seconds < 10) {
        seconds = "0" + seconds.toString();
      }
    }
    this.setState({ total: minutes + ":" + seconds, duration });
  };

  handleSongPlaying = position => {
    this.setState({ position: position.position });
    const currentTime = Math.floor(position.position / 1000);

    if (parseInt(currentTime) < 10) {
      //
      this.setState({ seconds: "0" + currentTime.toString() });
    } else if (currentTime < 60) {
      //
      this.setState({ seconds: currentTime });
    } else if (currentTime > 60) {
      //
      let minutes = Math.floor(currentTime / 60);
      let seconds = Math.floor(currentTime % 60);
      if (seconds < 10) {
        seconds = "0" + seconds.toString();
      }
      this.setState({ minutes, seconds });
    }
    const progress = (position.position / position.duration) * 100;
    this.moveLyrics(progress);
    this.setState({ progress });
    if (progress > 100) {
      this.handleSongFinishedPlaying();
    }
  };

  moveLyrics = percent => {
    const { activeKey } = this.state;
    const progress = percent / 100;
    switch (true) {
      // case progress >= 16 / 241 && progress < 23 / 241:
      //   this.setState({ activeKey: 1, lyricsProgress: activeKey * 3.7 });
      //   break;
      case progress >= 23 / 241 && progress < 31 / 241:
        this.setState({ activeKey: 1, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 31 / 241 && progress < 39 / 241:
        this.setState({ activeKey: 2, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 39 / 241 && progress < 48 / 241:
        this.setState({ activeKey: 3, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 48 / 241 && progress < 51 / 241:
        this.setState({ activeKey: 4, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 51 / 241 && progress < 56 / 241:
        this.setState({ activeKey: 5, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 56 / 241 && progress < 63 / 241:
        this.setState({ activeKey: 6, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 63 / 241 && progress < 67 / 241:
        this.setState({ activeKey: 7, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 67 / 241 && progress < 71 / 241:
        this.setState({ activeKey: 8, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 71 / 241 && progress < 74 / 241:
        this.setState({ activeKey: 9, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 74 / 241 && progress < 79 / 241:
        this.setState({ activeKey: 10, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 79 / 241 && progress < 83 / 241:
        this.setState({ activeKey: 11, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 83 / 241 && progress < 102 / 241:
        this.setState({ activeKey: 12, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 102 / 241 && progress < 110 / 241:
        this.setState({ activeKey: 13, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 110 / 241 && progress < 118 / 241:
        this.setState({ activeKey: 14, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 118 / 241 && progress < 126 / 241:
        this.setState({ activeKey: 15, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 126 / 241 && progress < 134 / 241:
        this.setState({ activeKey: 16, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 134 / 241 && progress < 138 / 241:
        this.setState({ activeKey: 17, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 138 / 241 && progress < 140 / 241:
        this.setState({ activeKey: 18, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 140 / 241 && progress < 145 / 241:
        this.setState({ activeKey: 19, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 145 / 241 && progress < 150 / 241:
        this.setState({ activeKey: 20, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 150 / 241 && progress < 154 / 241:
        this.setState({ activeKey: 21, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 154 / 241 && progress < 158 / 241:
        this.setState({ activeKey: 22, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 158 / 241 && progress < 161 / 241:
        this.setState({ activeKey: 23, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 161 / 241 && progress < 164 / 241:
        this.setState({ activeKey: 24, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 164 / 241 && progress < 170 / 241:
        this.setState({ activeKey: 25, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 170 / 241 && progress < 189 / 241:
        this.setState({ activeKey: 26, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 189 / 241 && progress < 191 / 241:
        this.setState({ activeKey: 27, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 191 / 241 && progress < 197 / 241:
        this.setState({ activeKey: 27, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 197 / 241 && progress < 204 / 241:
        this.setState({ activeKey: 28, lyricsProgress: activeKey * 3.7 });
        break;

      case progress >= 204 / 241 && progress < 207 / 241:
        this.setState({ activeKey: 29, lyricsProgress: activeKey * 3.7 });
        break;

      case progress >= 207 / 241 && progress < 213 / 241:
        this.setState({ activeKey: 29, lyricsProgress: activeKey * 3.7 });
        break;

      case progress >= 213 / 241 && progress < 221 / 241:
        this.setState({ activeKey: 30, lyricsProgress: activeKey * 3.7 });
        break;
      case progress >= 221 / 241:
        this.setState({ activeKey: 31, lyricsProgress: activeKey * 3.7 });
        break;

      default:
        this.setState({ lyricsProgress: 0 });
    }
  };

  handleSongFinishedPlaying = () => {
    this.setState({ status: "STOPPED" });
  };

  handleControlButton = () => {
    const { status } = this.state;
    if (status === "STOPPED") {
      this.setState({ status: "PLAYING" });
    } else if (status === "PLAYING") {
      this.setState({ status: "STOPPED" });
    }
  };

  setProgress = e => {
    const { duration } = this.state;
    const margin = (window.innerWidth - this.progress.current.clientWidth) / 2;
    const percent = (e.clientX - margin) / this.progress.current.clientWidth;

    this.setState({
      position: percent * duration,
      seconds: "00",
      minutes: 0,
      progress: 0,
    });
  };

  render() {
    const { progress, status, minutes, seconds, total, position } = this.state;
    // const lyrics = getLyrics();
    // console.log(getLyrics());
    return (
      <StaticQuery
        query={graphql`
          query MusicImageQuery {
            file(relativePath: { regex: "/redcoat/" }) {
              childImageSharp {
                fluid(maxHeight: 800) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        `}
        render={data => (
          <Wrapper>
            <H2Text>New Single</H2Text>
            <ParagraphText>I Don't Want To Fall In Love Again</ParagraphText>
            <MusicSection>
              <AbsoluteWrapper>
                <TitleTextWrapper>
                  <ScrollableAnchor id={"music"}>
                    <h2 className="title">Cait Leary</h2>
                  </ScrollableAnchor>
                  <h3 className="artist">I Don't Want To Fall In Love Again</h3>
                </TitleTextWrapper>
                <Equalizer>
                  <div
                    css={
                      status === "PLAYING"
                        ? `
                  animation: bounce 0.5s infinite;
                  `
                        : ``
                    }
                    className="one"
                  />
                  <div
                    css={
                      status === "PLAYING"
                        ? `
                  animation: bounce 0.5s infinite;
                  `
                        : ``
                    }
                    className="two"
                  />
                  <div
                    css={
                      status === "PLAYING"
                        ? `
                  animation: bounce 0.5s infinite;
                  `
                        : ``
                    }
                    className="three"
                  />
                </Equalizer>
                <Lyrics
                  progress={this.state.lyricsProgress}
                  activeKey={this.state.activeKey}
                />

                <ProgressBar
                  onClick={e => {
                    this.setProgress(e);
                  }}
                >
                  <div className="full-bar" ref={this.progress}>
                    <div
                      className="progress"
                      style={{ width: progress + "%" }}
                    />
                  </div>
                </ProgressBar>
                <Controls>
                  <p>
                    {minutes}:{seconds}
                  </p>
                  <button className="button" onClick={this.handleControlButton}>
                    {status === "PLAYING" ? <FaPause /> : <FaPlay />}
                  </button>
                  <p>{total}</p>
                </Controls>
                <AlbumCoverWrapper />
                <Sound
                  url={Again}
                  playStatus={
                    status === "PLAYING"
                      ? Sound.status.PLAYING
                      : Sound.status.PAUSED
                  }
                  autoLoad={true}
                  onLoading={this.handleSongLoading}
                  onLoad={this.handleSongLoaded}
                  onPlaying={this.handleSongPlaying}
                  onFinishedPlaying={this.handleSongFinishedPlaying}
                  volume={50}
                  position={position}
                />
              </AbsoluteWrapper>
              <ImageWrapper>
                <Img fluid={data.file.childImageSharp.fluid} />
              </ImageWrapper>
            </MusicSection>
          </Wrapper>
        )}
      />
    );
  }
}

export default MusicPlayer;
