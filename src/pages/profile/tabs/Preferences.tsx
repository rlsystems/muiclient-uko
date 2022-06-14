import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Card, Grid, MenuItem, Select, Switch } from "@mui/material";
import { H5, H6, Tiny } from "../../../components/Typography";
import { FC, useState } from "react";
import { StyledSelectInput, StyledFormControlLabel } from "components/StyledComponent";
import FlexBox from "components/FlexBox";

const Preferences: FC = () => {

  const [pageSize, setPageSize] = useState("10");
  return (
    <Card sx={{ padding: 3, pb: 5 }}>
      <H5 mb={2}>Preferences</H5>
      <Grid container gap={4} >
       
        <Grid item xs={7} mt={2}>
          <H6 mb={1}>Page Size Default</H6>
          <Select
            sx={{ maxWidth: "180px" }}
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            IconComponent={() => <KeyboardArrowDown />}
            input={<StyledSelectInput />}
          >

            {["5", "10", "25", "50", "100"].map((item) => (
              <MenuItem value={item} sx={{ fontSize: 12, fontWeight: 500 }}>
                {item}
              </MenuItem>

            ))}

          </Select>
        </Grid>
        <Grid item xs={7}>
          <StyledFormControlLabel
            label={
              <Label
                title="Dark Mode"
                body="Set dark mode as default mode."
              />
            }
            control={<Switch defaultChecked />}
            sx={{ mt: "1rem" }}
          />
        </Grid>


      </Grid>
      <FlexBox justifyContent={"flex-end"}>
        <Button variant="contained" sx={{ mt: 4 }}>
          Save Changes
        </Button>
      </FlexBox>

    </Card>
  );
};

function Label({ title, body }: { title: string; body: string }) {
  return (
    <Box>
      <H6>{title}</H6>
      <Tiny fontWeight={500} color="text.disabled">
        {body}
      </Tiny>
    </Box>
  );
}

export default Preferences;
