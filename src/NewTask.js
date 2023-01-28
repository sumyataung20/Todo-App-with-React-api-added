import { useRef } from "react";
import { InputAdornment, OutlinedInput, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { green } from "@mui/material/colors";
export default function NewTask({ add }) {
  const input = useRef();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const subject = input.current.value;
        if (!subject) return false;
        add(subject);

        input.current.value = "";
        input.current.focus();
      }}
    >
      <OutlinedInput
        color="success"
        type="text"
        inputRef={input}
        fullWidth
        placeholder="Enter Task"
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="submit">
              <AddIcon
                sx={{
                  color: "white",
                  bgcolor: green[600],
                  borderRadius: "50px",
                }}
              />
            </IconButton>
          </InputAdornment>
        }
      />

      {/* <input type="text" ref={input} />
      <button>Add</button> */}
    </form>
  );
}
