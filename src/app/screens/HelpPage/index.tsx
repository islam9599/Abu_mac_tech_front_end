import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Stack,
  Tabs,
  Typography,
} from "@mui/material";
import "../../../css/help.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Cancel, ExpandMore, Home } from "@mui/icons-material";
import Marginer from "../../component/marginer";
import { Textarea } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export function HelpPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const faq = [
    {
      question: "How Secure Is Information About Me",
      answer:
        "We work to protect the security of your personal information during transmission by using encryption protocols and software. We maintain physical, electronic, and procedural safeguards in connection with the collection, storage, and disclosure of customer personal information. Our security procedures mean that we may ask to verify your identity before we disclose personal information to you.",
    },
    {
      question: "What About Advertising?",
      answer:
        "Third-Party Advertisers and Links to Other Websites: our services may include third-party advertising and links to other websites and apps. Third-party advertising partners may collect information about you when you interact with their content, advertising, and services. For more information about third-party advertising at Amazon, including interest-based ads, please read our Interest-Based Ads notice. To adjust your advertising preferences, please go to the Your Ads Privacy Choices page.",
    },
    {
      question: "REVIEWS, COMMENTS, COMMUNICATIONS, AND OTHER CONTENT?",
      answer:
        "You may post reviews, comments, photos, videos, and other content; send e-cards and other communications; and submit suggestions, ideas, comments, questions, or other information, so long as the content is not illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights (including publicity rights), or otherwise injurious to third parties or objectionable, and does not consist of or contain software viruses, political campaigning, commercial solicitation, chain letters, mass mailings, or any form of spam or unsolicited commercial electronic messages. You may not use a false e-mail address, impersonate any person or entity, or otherwise mislead as to the origin of a card or other content!",
    },
    {
      question: "How do I promote my products?",
      answer:
        "There are numerous ways to boost your sales through promotion. Head to our Seller University for helpful tips, articles, videos & manuals!!",
    },
    {
      question: "How long does it take to sign up to Abu_Mac_Tech Marketplace?",
      answer:
        "It usually takes up to 5 business days if all documents are correctly submitted!",
    },
    {
      question:
        "If I want to find out more about which rules apply to my products, where can I look?",
      answer:
        "You can refer to our list of government resources here. Please note this is not an exhaustive list but to provide some useful starting guides!",
    },
  ];

  const rules = [
    "Purchase and delivery of products and services. We use your personal information to take and handle orders, deliver products and services, process payments, and communicate with you about orders, products and services, and promotional offers!",
    "Provide, troubleshoot, and improve our Services. We use your personal information to provide functionality, analyze performance, fix errors, and improve the usability and effectiveness of the our Services!",
    "Recommendations and personalization. We use your personal information to recommend features, products, and services that might be of interest to you, identify your preferences, and personalize your experience with Abu_Mac_Tech Services!",
    "Advertising. We use your personal information to display interest-based ads for features, products, and services that might be of interest to you. We do not use information that personally identifies you to display interest-based ads. To learn more, please read our Interest-Based Ads notice!",
    "To enable our systems to recognize your browser or device and to provide and improve Abu_Mac_Tech Services, we use cookies and other identifiers. For more information about cookies and how we use them, please read our Cookies Notice!",
    "Third-Party Service Providers: We employ other companies and individuals to perform functions on our behalf. Examples include fulfilling orders for products or services, delivering packages, sending postal mail and email, removing repetitive information from customer lists, analyzing data, providing marketing assistance, providing search results and links (including paid listings and links), processing payments, transmitting content, scoring, assessing and managing credit risk, and providing customer service. These third-party service providers have access to personal information needed to perform their functions, but may not use it for other purposes!",
    "Business Transfers: As we continue to develop our business, we might sell or buy other businesses or services. In such transactions, customer information generally is one of the transferred business assets but remains subject to the promises made in any pre-existing Privacy Notice (unless, of course, the customer consents otherwise). Also, in the unlikely event that abu_mac_tech.com, Inc. or substantially all of its assets are acquired, customer information will of course be one of the transferred assets!",
    "Information from Other Sources: We might receive information about you from other sources, such as updated delivery and address information from our carriers, which we use to correct our records and deliver your next purchase more easily. Click here to see additional examples of the information we receive!",
    "Other than as set out above, you will receive notice when personal information about you might be shared with third parties, and you will have an opportunity to choose not to share the information!",
  ];
  const navigate = useNavigate();

  const navigateToHomeHandler = () => {
    navigate("/");
  };
  return (
    <div className="help_page">
      <Container>
        <Stack>
          <Box mt={5}>
            <Marginer
              direction="horizontal"
              width="100%"
              height="2"
              bg="#999"
            />
          </Box>
          <Stack width={"100%"}>
            <Stack
              className="navigate_home_wrapper"
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Home className="navigate_home navigate_home_icon" />
              <Typography className="navigate_home" variant="h6">
                Homepage
              </Typography>
              <Marginer width="1" height="15" bg="#000" direction="vertical" />
              <Typography className="navigate_home" variant="h6">
                Help-page
              </Typography>

              <Cancel
                sx={{ width: "10px", height: "10px" }}
                className="navigate_home navigate_home_icon"
                onClick={() => {
                  navigate("/");
                }}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              m: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                bgcolor: "#f1f1f2",
                width: "90%",
                margin: 5,
                borderRadius: "9px",
                border: "2px solid #129cb8",
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      sx={{ fontWeight: "bold", fontSize: "13px" }}
                      label="Website Privacy"
                      value="1"
                    />
                    <Tab
                      sx={{ fontWeight: "bold", fontSize: "13px" }}
                      label="FAQ"
                      value="2"
                    />
                    <Tab
                      sx={{ fontWeight: "bold", fontSize: "13px" }}
                      label="Message to Admin"
                      value="3"
                    />
                  </Tabs>
                </Box>
                <Stack
                  alignItems={"center"}
                  sx={{
                    width: "100%",
                    height: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Stack className="help_main_container">
                    <TabPanel value="1">
                      <Stack className="rule_box">
                        <Box className="rule_ele">
                          {rules.map((ele) => {
                            return (
                              <div>
                                <h3>{ele}</h3>
                                <Marginer width="100%" height="2" bg="#000" />
                              </div>
                            );
                          })}
                        </Box>
                      </Stack>
                    </TabPanel>
                    <TabPanel value="2">
                      <Stack className="faq_container">
                        {faq.map((ele) => {
                          return (
                            <Accordion sx={{ background: "whitesmoke" }}>
                              <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panella-content"
                                id="panella-header"
                                color="#f1f1f2"
                              >
                                <Typography variant="h5">
                                  {ele.question}
                                </Typography>
                              </AccordionSummary>

                              <AccordionDetails>
                                <Typography variant="h6">
                                  {ele.answer}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          );
                        })}
                      </Stack>
                    </TabPanel>
                    <TabPanel value="3">
                      <Stack className="message_to_admin">
                        <Stack className="message_title">
                          <span>Message to Admin</span>
                          <p>Please fill all fields!</p>
                        </Stack>
                        <form
                          action="#"
                          method="POST"
                          className="message_frame"
                        >
                          <div className="message_input_box">
                            <label htmlFor="">Name</label>
                            <input
                              type="text"
                              name="mb_nick"
                              placeholder="Your name"
                            />
                          </div>
                          <div className="message_input_box">
                            <label htmlFor="">Email</label>
                            <input
                              type="text"
                              name="mb_email"
                              placeholder="email"
                            />
                          </div>
                          <div className="message_input_box">
                            <label htmlFor="">Message</label>
                            <textarea name="mb_msg" placeholder="Message" />
                          </div>
                          <Box className="message_admin_btn">
                            <Button variant="contained">Send</Button>
                          </Box>
                        </form>
                      </Stack>
                    </TabPanel>
                  </Stack>
                </Stack>
              </TabContext>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
