import { Box, Button, Card, LinearProgress } from "@mui/material";
import LightTextField from "../../../components/LightTextField";
import { H5, H6, Tiny } from "../../../components/Typography";
import React, { FC } from "react";

const Password: FC = () => {
  return (
    <Card
      sx={{
        padding: 3,
        pb: 5,
        "& li": {
          fontSize: 10,
          fontWeight: 500,
          color: "text.disabled",
        },
      }}
    >
      <H5>Change Your Password</H5>
      <Box maxWidth={350}>
        <LightTextField
          fullWidth
          sx={{ mt: 2 }}
          placeholder="Enter current password"
        />
        <LightTextField
          fullWidth
          sx={{ mt: 2, mb: 1 }}
          placeholder="Enter new password"
        />
        <LinearProgress variant="determinate" value={10} />
        <LightTextField
          fullWidth
          sx={{ mt: 2 }}
          placeholder="Confirm new password"
        />

        <Box my={3}>
          <H6>Password requirements:</H6>
          <Tiny fontWeight={500} color="text.disabled">
            Ensure that these requirements are met:
          </Tiny>
          <ul>
            <li>Minimum 8 characters long - the more, the better</li>
            <li>At least one lowercase character</li>
            <li>At least one uppercase character</li>
            <li>At least one number, symbol, or whitespace character</li>
          </ul>
        </Box>

        <Button variant="contained">Save Changes</Button>
      </Box>
    </Card>
  );
};

export default Password;
