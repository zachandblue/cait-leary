import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { FaFacebook, FaInstagram, FaTwitter, FaBars } from "react-icons/fa";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { colors } from "../styles/variables";
import axios from "axios";

const Wrapper = styled.div`
  position: relative;
  font-family: "Raleway";
  max-height: 100vh;
  overflow: hidden;
  h1 {
    color: ${colors.light};
    text-align: center;
    font-family: "Abel";
    font-size: 50px;
    /* text-transform: none; */
    width: 100%;
    /* text-shadow: 1px 1px 1px black; */
    margin-bottom: 30px;
  }
  p {
    color: ${colors.light};
    text-align: center;
    font-family: "Abel";
    text-transform: none;
    /* font-weight: bold; */
    /* text-shadow: 1px 1px 1px black; */
    margin: 40px 0;
    font-size: 26px;
    @media only screen and (max-width: 600px) {
      max-width: 90%;
    }
  }
  .gatsby-image-wrapper {
    min-height: 100vh;
    z-index: -1;
    /* filter: blur(5px);

    
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%); */
    filter: sepia(0%) brightness(0.4) saturate(350%);
  }
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
  }
  a {
    color: ${colors.light};
  }
  * {
    z-index: 400;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    /* background: linear-gradient(
      90deg,
      rgba(20, 15, 10, 0.7),
      rgba(20, 15, 10, 0.9)
    ); */
    z-index: 90;
  }
`;

const FormWrapper = styled.form`
  position: absolute;
  /* flex-direction: column; */

  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .phone {
    display: none;
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.33);
  border: none;
  padding: 12px 10px;
  flex: 3;
  position: relative;
  color: ${colors.light};
  font-weight: 600;
  min-width: 150px;
  flex-wrap: wrap;

  &::placeholder {
    color: white;
    opacity: 0.75;
  }
  &:focus {
    outline: 1px solid white;
  }
  @media only screen and (max-width: 600px) {
    order: 1;
    width: 90%;
  }
`;

const Button = styled.button`
  flex: 1;
  margin-left: 10px;
  background: rgba(255, 255, 255, 0.33);
  border: none;
  padding: 12px 11px;
  color: white;
  color: ${colors.light};
  font-weight: 600;
  min-width: 80px;
  position: relative;
  opacity: ${props => (props.loading ? 0.55 : 1)};
  &:focus {
    outline: 1px solid white;
  }
  @media only screen and (max-width: 600px) {
    order: 3;
    flex: 3;
    margin-left: 0;
    margin-top: 10px;
    width: 90%;
  }
`;

const InputBody = styled.textarea`
  background: rgba(255, 255, 255, 0.3);
  border: none;
  padding: 12px 10px;
  flex: 3;
  position: relative;
  color: ${colors.light};
  font-weight: 600;
  &::placeholder {
    color: white;
    opacity: 0.75;
  }
  &:focus {
    outline: 1px solid white;
  }
  height: 100px;
  min-width: 400px;
  margin-top: 10px;
  @media only screen and (max-width: 600px) {
    order: 2;
    min-width: 290px;
    width: 90%;
  }
`;

export default class Page extends Component {
  state = {
    activeInput: "",
    email: "",
    text: "",
    phoneNumber6tY4bPYk: "",
    loading: false,
    timeStamp: "",
  };

  componentDidMount() {
    this.setState({ timeStamp: Date.now() });
  }

  sendEmail = e => {
    e.preventDefault();

    const { email, text, loading, phoneNumber6tY4bPYk, timeStamp } = this.state;
    const now = Date.now();

    if (now - timeStamp < 4500) {
      return;
    }
    if (phoneNumber6tY4bPYk.length > 0) {
      return;
    }
    if (!loading) {
      this.setState({ loading: true });
      axios
        .get(
          `https://hbd4h5d9l2.execute-api.us-east-2.amazonaws.com/prod/CaitContact?subject=Contact&message=${text}&email=${email}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(response => {
          console.log(response);
          this.setState({
            email: "",
            text: "",
            loading: false,
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            loading: false,
          });
        });
    }
  };

  handleTextInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { data, location } = this.props;
    const { email, text, loading, phoneNumber6tY4bPYk } = this.state;
    return (
      <StaticQuery
        query={graphql`
          query ContactPageQuery {
            file(relativePath: { regex: "/Cait3/" }) {
              childImageSharp {
                fluid(maxHeight: 800) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
            wordpressPage(slug: { eq: "contact" }) {
              title
            }
          }
        `}
        render={data => (
          <Layout location={location}>
            <SEO title={data.wordpressPage.title} />
            <Wrapper>
              <Img fluid={data.file.childImageSharp.fluid} />

              <FormWrapper onSubmit={this.sendEmail}>
                <h1>Contact</h1>
                <Input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Email Address"
                  onChange={this.handleTextInput}
                />
                <Button
                  disabled={loading}
                  loading={loading}
                  onClick={e => this.sendEmail(e)}
                >
                  Submit
                </Button>
                <InputBody
                  className="input-body"
                  type="textarea"
                  name="text"
                  value={text}
                  placeholder="Your Message"
                  onChange={this.handleTextInput}
                />
                <input
                  className="phone"
                  type="text"
                  name="phoneNumber6tY4bPYk"
                  value={phoneNumber6tY4bPYk}
                  autoComplete="off"
                  onChange={this.handleTextInput}
                />

                <p style={{ order: 4 }}>
                  Whether you're a fan of my music or you just would like to say
                  hi, I'd love to hear from you. Follow me on social media or
                  simply use this contact form to send me an email.
                </p>

                <div className="socials" style={{ order: 5 }}>
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
              </FormWrapper>

              {/* <div
                dangerouslySetInnerHTML={{
                  __html: data.wordpressPage.content,
                }}
              /> */}
              <div className="overlay" />
            </Wrapper>
          </Layout>
        )}
      />
    );
  }
}

// export const query = graphql`
//   query PageQuery($slug: String) {
//     wordpressPage(slug: { eq: $slug }) {
//       title
//       slug
//       content
//     }
//   }
// `;
