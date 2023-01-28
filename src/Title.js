import { useContext } from "react";
import { CountContext } from "./App";
import { Typography, Badge, Box } from "@mui/material";

export default function Title() {
  const Count = useContext(CountContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Badge badgeContent={Count} color="warning">
        <Typography variant="h6">To Do App</Typography>
      </Badge>
    </Box>
  );
}
