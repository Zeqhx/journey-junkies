import {
  AppShell,
  LoadingOverlay,
  MantineProvider,
  MantineTheme,
  useMantineTheme,
  ColorScheme,
  ColorSchemeProvider,
  useMantineColorScheme,
} from "@mantine/core";
import { AuthModal, Header } from "../UI";
import { Outlet, useNavigation } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { useMemo, useState } from "react";

const containerStyles = (theme: MantineTheme) => ({
  main: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    paddingTop: theme.spacing.md,
  },
});

const Container = () => {
  const { location } = useNavigation();
  const theme = useMantineTheme();

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    typeof window !== "undefined" &&
      window.localStorage?.setItem("color-scheme", nextColorScheme);
    setColorScheme(nextColorScheme);
  };

  const modalProps = useMemo(
    () => ({
      centered: true,
      overlayProps: {
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      },
    }),
    [theme]
  );

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: colorScheme }}
      >
        <ModalsProvider modals={{ auth: AuthModal }} modalProps={modalProps}>
          <AppShell padding="md" styles={containerStyles} header={<Header />}>
            <Outlet />
          </AppShell>
          <LoadingOverlay
            visible={Boolean(location)}
            sx={{ position: "fixed" }}
          />
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default Container;
