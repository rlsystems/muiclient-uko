import { FC, useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Card, MenuItem, Select, Switch } from "@mui/material";
import { useStore } from "app/stores/store";
import { H5, H6, Tiny } from "components/Typography";
import { StyledFormControlLabel, StyledSelectInput } from "../StyledComponent";
import { observer } from "mobx-react-lite";

const Preferences: FC = () => {
  const { preferencesStore: {colorMode, setColorMode} } = useStore();
  const [language, setLanguage] = useState("english");
  console.log('preferencesStore.colorMode', colorMode)

  return (
    <Card sx={{ padding: 3, pb: 5 }}>
      <H5 mb={2}>Preferences</H5>
      <Box maxWidth={350}>
        <H6 mb={1}>Language</H6>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          IconComponent={() => <KeyboardArrowDown />}
          input={<StyledSelectInput />}
        >
          <MenuItem value="english" sx={{ fontSize: 12, fontWeight: 500 }}>
            English
          </MenuItem>
        </Select>
        {
          colorMode &&
          <StyledFormControlLabel
            label={
              <Label
              title="Dark Mode"
              body="Set dark mode as default mode."
              />
            }
            control={
              <Switch
                defaultChecked={colorMode === 'dark'}
                value={colorMode === 'dark'}
                onChange={e => setColorMode(e.target.checked? 'dark': 'light')}
            />}
            sx={{ mt: "1rem" }}
          />
        }


        <Button variant="contained" sx={{ mt: 4 }}>
          Save Changes
        </Button>
      </Box>
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

export default observer(Preferences);
