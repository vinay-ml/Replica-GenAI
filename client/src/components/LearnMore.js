import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import RagImage from "../assets/RAG.jpg";
import CodeSnippet0 from "../CodeSnippet/CodeSnippet0";
import CodeSnippet1 from "../CodeSnippet/CodeSnippet1";
import CodeSnippet2 from "../CodeSnippet/CodeSnippet2";
import CodeSnippet3 from "../CodeSnippet/CodeSnippet3";
import CodeSnippet4 from "../CodeSnippet/CodeSnippet4";

const LearnMore = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Box
      p={2}
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: "75%",
          lg: "50%",
          xl: "50%",
        },
        margin: "0 auto",
      }}
    >
      <IconButton
        onClick={handleBackToHome}
        sx={{
          mb: 2,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": { backgroundColor: theme.palette.primary.dark },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        How This AI Chat Application is Created ?
      </Typography>
      <Box
        component="img"
        src={RagImage}
        alt="RAG"
        sx={{ height: "100%", width: "85%", mt: 2, borderRadius: 5 }}
      />
      <Typography variant="body1" sx={{ fontWeight: 700, mt: 1.5 }}>
        Full Description:
      </Typography>
      <Typography variant="body1">
        first it will split my personal information into smaller chunks for
        easier processing. These text chunks are then vectorized using OpenAI's
        embedding model, which transforms the text into numerical vectors that
        capture semantic meaning. These vectorized chunks are subsequently
        stored in the MongoDB database for later retrieval.When it comes to the
        chat service, the application manages user information and chat history
        within the MongoDB database. Upon receiving a user query, the
        Retrieval-Augmented Generation (RAG) service is called to find the most
        relevant information from the vectorized data using cosine similarity.
        The chat service then constructs a prompt using the retrieved context
        and the user’s message. This prompt is sent to OpenAI's chat completion
        API, which generates a response that mimics the user's conversational
        style.
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 700, mt: 2 }}>
        Vectorize And Store:
      </Typography>
      <Typography variant="body1">
        first it will split my personal information into smaller chunks for
        easier processing. These text chunks are then vectorized using OpenAI's
        embedding model, which transforms the text into numerical vectors that
        capture semantic meaning. These vectorized chunks are subsequently
        stored in the MongoDB database for later retrieval.
      </Typography>
      <CodeSnippet0 />
      <CodeSnippet1 />
      <Typography variant="body1" sx={{ fontWeight: 700, mt: 2.5 }}>
        Retrieval-Augmented Generation (RAG):
      </Typography>
      <Typography variant="body1">
        for chat service, the application manages user information and chat
        history within the MongoDB database. Upon receiving a user query, the
        Retrieval-Augmented Generation (RAG) service is called to find the most
        relevant information from the vectorized data using cosine similarity.
      </Typography>
      <CodeSnippet2 />
      <Typography variant="body1" sx={{ fontWeight: 700, mt: 2.5 }}>
        Chat service:
      </Typography>
      <Typography variant="body1">
        The chat service then constructs a prompt using the retrieved context
        and the user’s message. This prompt is sent to OpenAI's chat completion
        API, which generates a response that mimics the user's conversational
        style.
      </Typography>
      <CodeSnippet3 />
      <Typography variant="body1" sx={{ fontWeight: 700, mt: 2.5 }}>
        API Endpoint:
      </Typography>
      <CodeSnippet4 />
    </Box>
  );
};

export default LearnMore;
