import { useState, createContext, useContext, useEffect } from "react";
import NewTask from "./NewTask";
import TaskList from "./TaskList";
import Title from "./Title";
import Edit from "./Edit";
import { Routes, Route } from "react-router-dom";

import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";

import { lightGreen } from "@mui/material/colors";
import { ModeContext } from "./ThemedApp";

import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
const api = "http://localhost:8000";
export const CountContext = createContext(0);
export default function App() {
  const theme = useTheme();
  const [items, setItems] = useState([
    // { id: 1, subject: "Egg", done: false },
    // { id: 2, subject: "Cake", done: false },
    // { id: 3, subject: "Orange", done: true },
  ]);

  const changeMode = useContext(ModeContext);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/tasks");
      const result = await res.json();
      setItems(result);
      console.log(result);
      // isLoading(false);
    })();
  }, []);

  const toggle = (id) => {
    fetch(`http://localhost:8000/tasks/${id}/toggle`, {
      method: "PUT",
    });

    setItems((items) =>
      items.map((item) => {
        if (item._id === id) item.done = !item.done;
        return item;
      })
    );
  };

  const clear = () => {
    setItems((items) => items.filter((item) => !item.done));
    fetch("http://localhost:8000/tasks/", {
      method: "DELETE",
    });
  };

  const update = (id, newData) => {
    setItems((items) => {
      return items.map((item) => {
        if (item._id === id) item.subject = newData;
        return item;
      });
    });
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject: newData }),
    });
  };

  function add(subject) {
    (async () => {
      const res = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject }),
      });
      const task = await res.json();

      setItems((items) => [...items, task]);
    })();
  }

  function remove(id) {
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    });
    setItems(items.filter((item) => item._id !== id));
  }
  return (
    <CountContext.Provider value={items.length}>
      <Box>
        <AppBar position="static" sx={{ bgcolor: lightGreen[500] }}>
          <Toolbar>
            <Title />
            {theme.palette.mode === "dark" ? (
              <IconButton
                onClick={() => {
                  changeMode();
                }}
              >
                <LightModeIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  changeMode();
                }}
              >
                <DarkModeIcon />
              </IconButton>
            )}

            <Button
              varient="contained"
              sx={{ bgcolor: "inherit", color: "white" }}
              onClick={clear}
            >
              Clear
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ mt: 2, px: { lg: "600px", md: "300px", sm: "200px" } }}>
          <Routes>
            <Route
              path="/"
              element={
                <Box>
                  <NewTask add={add} />

                  <TaskList
                    items={items.filter((item) => !item.done)}
                    toggle={toggle}
                    remove={remove}
                  />

                  <Divider />
                  <TaskList
                    items={items.filter((item) => item.done)}
                    toggle={toggle}
                    remove={remove}
                  />
                </Box>
              }
            />

            <Route path="/edit/:id" element={<Edit update={update} />} />
          </Routes>
        </Box>
      </Box>
    </CountContext.Provider>
  );
}
