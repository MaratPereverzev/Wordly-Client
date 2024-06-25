import { Box } from "@components";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Page } from "../page";
import { useEffect } from "react";

const Default = (props) => {
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        let link = document.querySelector("link[rel~='icon']");

        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.getElementsByTagName("head")[0].appendChild(link);
        }
        console.log(colorScheme === "dark");
        link.href =
          colorScheme === "dark" ? "./WordlyDark.png" : "./WordlyLight.png";
        console.log(link.href);
      });
  }, []);

  return (
    <Box flex column gap grow sx={{ backgroundColor: "#ededed", p: 1 }}>
      <Header
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
        }}
      />
      <Box flex grow gap>
        <Sidebar
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
          }}
        />
        <Page />
      </Box>
    </Box>
  );
};

export { Default as Dashboard };
