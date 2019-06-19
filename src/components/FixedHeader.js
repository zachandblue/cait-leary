import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import { debounce } from "debounce";

const NavItem = styled.div`
  a {
    color: #f9e9dd;
    font-family: "Source Code Pro", monospace;
    font-weight: 400;
    text-decoration: none !important;
    padding: 1.5rem;
    font-size: 18px;
    &:hover {
      color: white;
      filter: drop-shadow(2px 2px 2px rgba(255, 255, 255, 0.2));
    }
  }
`;

const Header = styled.header`
  background: rgba(40, 35, 35, 0.9);
  position: fixed;
  opacity: 0;
  z-index: 150;
  width: 100%;
  transition: opacity 1.5s;
  &:hover {
    opacity: 1;
  }
  &.show {
    opacity: 1 !important;
  }

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

class FixedHeader extends Component {
  state = {
    pageYOffset: 0,
  };
  componentDidMount() {
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  hideMenu = debounce(() => this.setState({ show: false }), 2000);

  really = () => {};

  handleScroll = e => {
    const currentOffset = this.state.pageYOffset;

    if (window.pageYOffset > currentOffset) {
      this.setState({ show: false, pageYOffset: window.pageYOffset });
    } else {
      this.setState({ show: true, pageYOffset: window.pageYOffset });
      this.hideMenu();
    }
    if (window.pageYOffset <= 100) {
      this.setState({ show: false });
    }
  };
  render() {
    // const show = this.state.pageYOffset > 100 ? true : false
    const { show } = this.state;
    const { siteTitle, menu, location } = this.props;
    return (
      <Header className={show ? "show" : ""}>
        <div
          style={{
            margin: `0 auto`,
            padding: `1.45rem 1.0875rem`,
            position: "relative",
          }}
        >
          <nav
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            {menu.map(item => (
              <NavItem key={`/${item.object_slug}`}>
                <Link key={`/${item.object_slug}`} to={`/${item.object_slug}`}>
                  {item.title}
                </Link>
              </NavItem>
            ))}
          </nav>
        </div>
      </Header>
    );
  }
}

FixedHeader.propTypes = {
  siteTitle: PropTypes.string,
};

FixedHeader.defaultProps = {
  siteTitle: ``,
};

export default FixedHeader;
