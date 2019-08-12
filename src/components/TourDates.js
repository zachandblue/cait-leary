import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import moment from "moment";
import { colors } from "../styles/variables";

const TourDatesSection = styled.section`
  position: relative;
  background: ${colors.light};

  /* background-color: white;
  background-image: radial-gradient(black 9px, transparent 10px),
    repeating-radial-gradient(
      black 0,
      black 4px,
      #060606 5px,
      #060606 20px,
      black 21px,
      black 25px,
      #060606 26px,
      #060606 50px
    );
  background-size: 30px 30px, 90px 90px;
  background-position: 0 0; */
  color: ${colors.dark};
  min-height: 400px;

  h2 {
    width: 80%;
    max-width: 400px;
    padding: 4rem 0 2rem;
    margin: 0 auto;
    font-size: 3rem;
    font-family: Abel;
    text-align: center;
  }
`;
const TourDatesList = styled.div`
  width: 80vw;
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  @media only screen and (max-width: 600px) {
    padding: 0.5rem;
    width: 95%;
    max-width: 600px;
  }
`;
const TourDate = styled.div`
  display: flex;
  font-family: "Source Code Pro", monospace;
  justify-content: space-between;
  padding: 1rem;
`;

const TourDates = () => (
  <StaticQuery
    query={graphql`
      query TourDatesQuery {
        allWordpressWpTourDates {
          edges {
            node {
              id
              date
              acf {
                date
                venue
                city
              }
            }
          }
        }
      }
    `}
    render={data => {
      const filteredByDate = data.allWordpressWpTourDates.edges.sort((a, b) => {
        return new Date(b.node.acf.date) - new Date(a.node.acf.date);
      });
      return (
        <TourDatesSection>
          <h2>Tour Dates</h2>
          <TourDatesList>
            {filteredByDate.map(item => {
              return (
                <TourDate key={item.node.id}>
                  <p>{moment(item.node.acf.date).format("MMM Do YYYY")}</p>
                  <p>{item.node.acf.venue}</p>
                  <p>{item.node.acf.city}</p>
                </TourDate>
              );
            })}
          </TourDatesList>
        </TourDatesSection>
      );
    }}
  />
);

export default TourDates;
