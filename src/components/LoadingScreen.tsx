import { Box, CircularProgress, Stack } from "@mui/material";
import NProgress from "nprogress";
import { useEffect } from "react";
import { H3 } from "./Typography";

interface IProps {
  content?: React.ReactNode
}

const LoadingScreen = (props: IProps) => {
  NProgress.configure({
    showSpinner: false,
  });

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={1} alignItems="center">
        <CircularProgress />
        <H3>{props.content}</H3>
      </Stack>
    </Box>
  );
};

export default LoadingScreen;
