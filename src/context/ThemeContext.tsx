import React, { createContext, useReducer, useContext, useEffect } from "react";

type ThemeState = {
  theme: "light" | "dark";
};

type ThemeAction = { type: "TOGGLE_THEME" };

// Initial state
const initialState: ThemeState = {
  theme: "dark",
};

const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Reducer function that returns a new state based on the given action
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
};

// Context Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Effect to set data-theme on body element
  useEffect(() => {
    document.body.setAttribute("data-theme", state.theme);
    console.log("Theme", state.theme);
  }, [state.theme]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
