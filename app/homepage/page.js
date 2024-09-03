'use client'
import Footer from "@/component/Footer"
import NavBar from "@/component/Navbar"
import Resources from "@/component/Resources"
import ContactUs from "@/component/ContactUs"
import { Container, Typography, Button, Box, Grid, Divider } from "@mui/material"
import Head from "next/head";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PlaceIcon from '@mui/icons-material/Place';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';

export default function page() {
    const router = useRouter();

    return (
      <>
        <NavBar></NavBar>
        <Head>
          <title>Rate My Professor</title>
          <meta
            name="description"
            content="Create flashcard from your text"
          ></meta>
        </Head>
        <div
          id="header"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <div className="welcome-bg">
              <Typography
                className="welcome-title"
                variant="h3"
                component="h1"
                gutterBottom
              >
                Empower Your Academic Journey:
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                Discover the Best Professors with AI-Driven Insights
              </Typography>
            </div>
            <Button
              className="button-white"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                mr: 2,
                backgroundColor: "white",
                color: "black",
                fontWeight: 600,
                borderRadius: "10px",
                padding: "5px 15px 5px 15px",
                marginLeft: "10px",
                "&:hover": { backgroundColor: "#e2e2e2" },
              }}
              onClick={() => router.push("/sign-in")}
            >
              Get Started
            </Button>
            <Button
              className="button-blue"
              variant="outlined"
                        color="primary"
                        href="#Resources"
              sx={{
                mt: 2,
                backgroundColor: "#2E46CD",
                color: "white",
                fontWeight: 600,
                borderRadius: "10px",
                padding: "5px 15px 5px 15px",
                marginLeft: "10px",
                "&:hover": { backgroundColor: "#1565C0" },
              }}
            >
              Learn More
            </Button>
          </Box>
        </div>
        <Container className="feature-box" id="About">
          <Box sx={{ my: 6 }}>
            <Typography
              sx={{ fontWeight: 600, textAlign: "center" }}
              variant="h4"
              component="h2"
              gutterBottom
            >
              Features
            </Typography>
            <Typography
              sx={{ fontSize: "18px", color: "#616060", marginBottom: "65px" }}
            >
              {" "}
              Unlock insightful tools designed to enhance your academic
              experience! From personalized professor recommendations and
              natural language queries to advanced search capabilities and
              comprehensive data analysis, our AI-driven platform is built to
              help you choose the best professors and excel in your studies.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <PsychologyIcon></PsychologyIcon>

                <Typography variant="h6" sx={{ fontWeight: 750 }}>
                  Peer Reviews
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#616060" }}
                >
                  {" "}
                  Explore real student experiences and feedback to choose the
                  best professors for your academic needs
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <AutoFixHighIcon></AutoFixHighIcon>
                <Typography variant="h6" sx={{ fontWeight: 750 }}>
                  Personalized Recommendations
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#616060" }}
                >
                  {" "}
                  Receive professor suggestions tailored to your academic
                  preferences and learning style.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextSnippetIcon></TextSnippetIcon>
                <Typography variant="h6" sx={{ fontWeight: 750 }}>
                  Data-Driven Insights
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#616060" }}
                >
                  {" "}
                  Access comprehensive data on teaching styles, student
                  satisfaction, and course difficulty to make informed
                  decisions.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container id="FAQ">
          <Typography
            sx={{ fontWeight: 600, textAlign: "center" }}
            variant="h4"
            component="h2"
            gutterBottom
          >
            Frequently Asked Questions
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 750 }}>
                How does the AI Assistant recommend professors?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="h6"
                sx={{ fontSize: "18px", color: "#616060" }}
              >
                The assistant uses machine learning models from OpenAI to
                analyze your academic preferences, past course selections, and
                professor ratings to suggest the best matches for you.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 750 }}>
                What data is used to generate professor insights?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="h6"
                sx={{ fontSize: "18px", color: "#616060" }}
              >
                We aggregate data from existing professor ratings, reviews, and
                course information to provide a comprehensive analysis of each
                professor's performance.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 750 }}>
                Can I ask the AI Assistant questions in natural language?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="h6"
                sx={{ fontSize: "18px", color: "#616060" }}
              >
                Yes, the assistant is designed to understand and respond to
                questions in plain English, making it easy to get the
                information you need.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
        <div
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="faq-box"
        >
          <img
            src="\faq.jfif"
            width="400px"
            style={{ padding: "0 50px 50px 0" }}
          />
            </div>
            <Resources />
            <ContactUs />
        <Footer></Footer>
      </>
    );
}