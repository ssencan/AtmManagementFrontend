import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  padding: "20px",
  marginTop: "20px",
  backgroundColor: "#f7f7f7",
  borderRadius: "10px",
});

const StyledHeading = styled(Typography)({
  color: "#006400",
  marginBottom: "15px",
});

const StyledSubHeading = styled(Typography)({
  color: "#333333",
  marginTop: "10px",
  marginBottom: "10px",
});

const StyledParagraph = styled(Typography)({
  color: "#555555",
  marginBottom: "10px",
});

const About = () => {
  return (
    <StyledContainer>
      <StyledHeading variant="h4" component="h1">
        About Us
      </StyledHeading>

      <StyledSubHeading variant="h5" component="h2">
        For 69 years, we have proudly carried out our aim of being Turkey's
        Sustainable Bank!
      </StyledSubHeading>

      <Box mt={3}>
        <StyledSubHeading variant="h6">Our Mission</StyledSubHeading>
        <StyledParagraph variant="body1">
          From village to city, with the understanding of “Community Banking"
          and within the scope of modern banking, we consider local
          characteristics and needs. We introduce banking services to those who
          do not have, grow together by creating value with its delighted
          customers, workers, and partners, and draw strength from the
          deep-rooted history.
        </StyledParagraph>
      </Box>

      <Box mt={3}>
        <Typography variant="h6">Our Vision</Typography>
        <Typography variant="body1">
          As the "leading bank in funding small enterprises," our vision is to
          be among Turkey's top ten private banks in terms of total assets.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6">Our Sustainable Banking activities</Typography>
        <Typography variant="body1">
          With the awareness that the only thing that does not change is the
          change itself, we sustain our transformation focus, equip our banking
          tradition by increasing technological competencies and changing our
          way of business with the focus on sustainable development which became
          even more important with the pandemic.
        </Typography>
        <Typography variant="body1">
          Dr. Hasan Basri Göktan, Chairman of the Board
        </Typography>
      </Box>
    </StyledContainer>
  );
};

export default About;
