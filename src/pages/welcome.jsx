import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "80vh",
  backgroundColor: "#f5f5f5",
  margin: "20px auto",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.2)",
  position: "relative",
});

const StyledImage = styled("img")({
  width: "17%",
  borderRadius: "10%",
  position: "absolute",
  top: 0,
  marginTop: "15px",
  left: "50%",
  transform: "translateX(-50%)",
});

const Welcome = () => {
  return (
    <StyledContainer>
      <StyledImage src="/images/sekerbank-welcome.jpg" alt="Welcome" />
      <Box mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the ATM Management System
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="body1" component="p" paragraph>
          Thank you for choosing our ATM Management System. With our powerful
          and user-friendly application, you can efficiently manage and monitor
          your ATMs and branches.
        </Typography>
      </Box>
      <Typography variant="body1" component="p" paragraph>
        Our system provides you with real-time insights, automated reporting,
        and intuitive tools to streamline your ATM operations. Whether you're a
        small business or a large corporation, our solution is designed to meet
        your needs.
      </Typography>
      <Typography variant="body1" component="p">
        Get ready to experience a new level of ATM management efficiency with
        our advanced features and seamless user interface.
      </Typography>
    </StyledContainer>
  );
};

export default Welcome;
