import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./form.module.css";


const Form = () => {
  const [id, setId] = useState(null);
  const [quesId, setQuesId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id && quesId ) {
      apiCall();
    } else {
      toast.error("Please enter both ID's");
    }
  };

  const apiCall = async () => {
    const data = {
      form_id: id,   
      email: "",
      responses: [
        {
          question_id: quesId,     
          type: "SHORT_TEXT",
          text: '1234',
        },
      ],
      submit_time: "1729151684968",
      storage_used: 0,
    };

    try {
      const response = await axios.post(
        `https://stage.form.heartfullapps.com/response`,
        data
      );
      console.log("API Response:", response.data);
      toast.success("Response Added successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("There was an error adding response.");
    }
  };

  return (
    <div className={styles.main}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          maxWidth: 400,
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 4,
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          label="Form ID"
          name="Fid"
          onChange={(e) => setId(e.target.value)}
        />
         <TextField
          fullWidth
          margin="normal"
          label="Question ID"
          name="Qid"
          onChange={(e) => setQuesId(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Response
        </Button>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Form;
