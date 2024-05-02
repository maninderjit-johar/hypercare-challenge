import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { UserList } from "./components/UserList";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <UserList />
      </div>
    </ThemeProvider>
  );
}

export default App;
