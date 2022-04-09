import { Box, useTheme } from "@mui/material";
import FlexBox from "components/FlexBox";
import { H1, Paragraph } from "components/Typography";
import { FC } from "react";
import { NavLink } from "react-router-dom";

const ErrorPage: FC = () => {
  const theme = useTheme();

  return (
    <FlexBox
      p={4}
      height="100%"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box maxWidth={350}>
        <img
          src="/static/illustration/error-page.svg"
          width="100%"
          alt="Error 403"
        />
      </Box>
      <H1 fontSize={64} fontWeight={700} color="primary.main" mt={3}>
        Ooops... 403!
      </H1>
      <Paragraph color="text.disabled" fontWeight="500">
        You are not authorized to view this page.
      </Paragraph>

      <NavLink
        to="/venues"
        style={{
          display: "block",
          marginTop: "1.5rem",
          fontWeight: 600,
          textDecoration: "underline",
          color: theme.palette.primary.main,
        }}
      >
        Back to Venue Management
      </NavLink>
    </FlexBox>
  );
};

export default ErrorPage;
