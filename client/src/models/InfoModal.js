import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  useMediaQuery,
  Grid,
  List,
  ListItem,
  ListItemText,
  Backdrop,
} from "@mui/material";
import RagImage from "../assets/RAG.jpg";

const InfoModal = ({ open, onClose, onStart }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const techStackLeft = ["NodeJS", "ExpressJS", "MongoDB", "OpenAI LLM"];
  const techStackRight = ["VectorDB", "RAG", "Simple Prompts", "ReactJS"];

  return (
    <Modal
      open={open}
      onClose={(e, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isSmallScreen ? "90%" : 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          outline: "none",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          textAlign="center"
          sx={{ fontWeight: 800 }}
        >
          Gen-AI RAG App
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ opacity: "95%", mt: 2 }}
        >
          I am replica of Vinay. You can ask me anything about Vinay
        </Typography>
        <Box
          component="img"
          src={RagImage}
          alt="RAG"
          sx={{ height: "100%", width: "100%", mt: 2 }}
        />
        <Typography variant="h6" component="h5" sx={{ opacity: "95%", mt: 1 }}>
          Tech Stack Used:
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <List dense>
              {techStackLeft.map((tech, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText primary={`• ${tech}`} sx={{ my: 0 }} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={6}>
            <List dense>
              {techStackRight.map((tech, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText primary={`• ${tech}`} sx={{ my: 0 }} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <Button
          onClick={onStart}
          variant="contained"
          color="primary"
          sx={{ display: "block", mx: "auto", textTransform: "none", mt: 1 }}
        >
          Start
        </Button>
      </Box>
    </Modal>
  );
};

export default InfoModal;
