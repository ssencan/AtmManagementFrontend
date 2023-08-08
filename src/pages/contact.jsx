import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)({
  padding: "20px",
  marginTop: "20px",
  backgroundColor: "#f7f7f7",
  borderRadius: "10px",
  boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.1)",
});

const ContactTitle = styled(Typography)({
  marginBottom: "20px",
  fontWeight: "bold",
});

const ContactInfoItem = styled(Grid)(({ theme }) => ({
  marginBottom: "15px",
  padding: "10px",
  backgroundColor: "#fff",
  borderRadius: "5px",
  boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.1)",
  "& h6": {
    marginBottom: "5px",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
}));

const Contact = () => {
  return (
    <StyledContainer>
      <ContactTitle variant="h4" component="h1" gutterBottom>
        Contact Us
      </ContactTitle>
      <Typography variant="body1" component="p" paragraph>
        Welcome to the Contact page of the ATM Management System. If you have
        any questions or inquiries, please feel free to get in touch with us.
        Our dedicated customer support team is here to assist you.
      </Typography>
      <ContactInfoItem container>
        <Grid item xs={12}>
          <Typography variant="h6">Headquarters</Typography>
          <Typography variant="body2">
            Our main office is located at Emniyet Evleri Mah. Eski Büyükdere
            Cad. No: 1/1A, 34415 Kağıthane İSTANBUL. If you're in the area, feel
            free to drop by and visit us!
          </Typography>
        </Grid>
      </ContactInfoItem>
      <ContactInfoItem container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Call Center</Typography>
          <Typography variant="body2">
            Our 24/7 call center is always available to assist you. Reach out to
            us at 0850 222 78 78 (444 78 78) for any inquiries or assistance you
            may need.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Telephone</Typography>
          <Typography variant="body2">
            If you prefer to speak with us directly, you can call our telephone
            line at 00 90 212 319 70 00. Our team is ready to help!
          </Typography>
        </Grid>
      </ContactInfoItem>
      <Typography variant="body1" component="p" gutterBottom>
        We value your privacy. Cookies are used on our website to enhance your
        browsing experience. You can learn more about our data usage and privacy
        practices in our{" "}
        <Box component="span" color="primary.main">
          Cookie Policy
        </Box>
        .
      </Typography>
      <Typography variant="h6">How can we help you?</Typography>
      <Typography variant="body1" component="p">
        Whether you have questions, need support, or want to provide feedback,
        our team is here to assist. Don't hesitate to{" "}
        <Box component="span" color="primary.main">
          Contact Us
        </Box>{" "}
        for any inquiries you may have.
      </Typography>
    </StyledContainer>
  );
};

export default Contact;
