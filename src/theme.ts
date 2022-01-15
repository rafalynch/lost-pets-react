import { extendTheme } from "@chakra-ui/react";

const colors = {
  styles: {
    global: {
      body: {
        color: "black",
        fontFamily: "Poppins",
      },
    },
  },
};

export const customTheme = extendTheme(colors);
