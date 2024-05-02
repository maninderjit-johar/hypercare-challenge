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

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

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

export const useTheme = () => useContext(ThemeContext);
