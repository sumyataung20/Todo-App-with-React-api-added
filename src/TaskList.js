import {
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Box,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  Undo as UndoIcon,
  Check as CheckIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

import { green, red, grey } from "@mui/material/colors";

export default function TaskList({ items, toggle, remove }) {
  return (
    <Box>
      {items.map((item) => (
        <List key={item._id}>
          <ListItem>
            <Button onClick={() => toggle(item._id)}>
              {item.done ? (
                <UndoIcon sx={{ color: grey[600] }} />
              ) : (
                <CheckIcon sx={{ color: green[800] }} />
              )}
            </Button>
            <ListItemText
              sx={{
                ml: 3,
                // color: item.done ? "grey" : "black",
                color: item.done ? "text.fade" : "text.light",
              }}
            >
              {item.subject}
            </ListItemText>
            <Link to={`edit/${item._id}`}>
              <IconButton>
                <EditIcon sx={{ color: grey[600] }} />
              </IconButton>
            </Link>
            <Button onClick={() => remove(item._id)}>
              <DeleteIcon sx={{ color: red[900] }} />
            </Button>
          </ListItem>
        </List>
      ))}
    </Box>
  );
}
