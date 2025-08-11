import { useContext } from "react";
import { ThemeContext } from "../store/context/Theme-Context";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContext.Provider");
  }
  return context;
};
