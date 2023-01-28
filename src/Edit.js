import { useParams, useNavigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  IconButton,
  OutlinedInput,
  Container,
  InputAdornment,
  Box,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
const api = "http://localhost:8000";
export default function Edit({ update }) {
  const { id } = useParams();

  const [subject, setSubject] = useState("");

  const navigate = useNavigate();

  // useEffect(() => {
  //   setSubject(get(id).subject);
  // }, [id, get]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${api}/tasks/${id}`);
      const result = await res.json();
      setSubject(result.subject);
    })();
  }, [id]);
  return (
    <Container>
      <IconButton onClick={() => navigate("/")}>
        <ArrowBackIcon sx={{ color: grey[800] }} />
      </IconButton>
      <Box className="container">
        <form
          className="center"
          onSubmit={(e) => {
            e.preventDefault();
            update(id, subject);
            navigate("/");
          }}
        >
          <OutlinedInput
            color="success"
            type="text"
            placeholder="Edit Task"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit">
                  <SaveIcon sx={{ color: green[800] }} />
                </IconButton>
              </InputAdornment>
            }
          />
        </form>
      </Box>
    </Container>
  );
}
