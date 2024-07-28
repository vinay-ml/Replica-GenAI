import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  Backdrop,
} from "@mui/material";

const NameModal = ({ open, onSubmit }) => {
  const [name, setName] = useState("");
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
    }
  };

  return (
    <Modal
      open={open}
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
          p: 2,
          outline: "none",
          borderRadius: 2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h6" component="h2">
          What's your name?
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ mt: 2, textTransform: "none" }}
        >
          Send
        </Button>
      </Box>
    </Modal>
  );
};

export default NameModal;
