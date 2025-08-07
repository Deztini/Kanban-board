import { useContext } from "react";
import { ThemeContext } from "../store/context/Theme-Context";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
