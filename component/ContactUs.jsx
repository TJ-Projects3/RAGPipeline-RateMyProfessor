import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import Head from "next/head";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      to_name: "RateMyProfessor Support",
      subject: subject,
      message: message,
      reply_to: email,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then((result) => {
        setStatus({ type: "success", message: "Your feedback has been sent!" });
        setOpen(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch((error) => {
        setStatus({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <main id="Contact">
      <Head>
        <title>Contact Us - Rate My Professor</title>
        <meta
          name="description"
          content="Contact Rate My Professor for any inquiries or support"
        />
      </Head>

      <Container sx={{ mb: 6, maxWidth: 'sm' }}>
        <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, textAlign: "center" }}
            gutterBottom
          >
            Contact Us <ContactMailIcon sx={{ mr: 2 }} />
          </Typography>
          <Typography sx={{ fontSize: "18px", color: "#616060", mb: 4 }}>
            Have feedback or need help? Fill out the form below or reach out to
            us through one of our contact methods.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                margin="normal"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Send Feedback
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "left", mt: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 750, mb: 2 }}>
                Our Contact Information
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <PlaceIcon sx={{ mr: 1 }} />
                Chicago, Illinois,
                United States
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <EmailIcon sx={{ mr: 1 }} />
                Email: support@ratemyprofessor.com
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <PhoneIcon sx={{ mr: 1 }} />
                Phone: +1 (224) 619-9687
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={status.type}
            sx={{ width: "100%" }}
          >
            {status.message}
          </Alert>
        </Snackbar>
      </Container>
    </main>
  );
}
