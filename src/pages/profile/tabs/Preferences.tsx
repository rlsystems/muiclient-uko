import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Card, Grid, MenuItem, Select, Switch } from "@mui/material";
import { H5, H6, Tiny } from "../../../components/Typography";
import { FC, useState } from "react";
import { StyledSelectInput } from "components/formInput/InputsLight";
import StyledFormControlLabel  from "components/StyledFormControlLabel";
import FlexBox from "components/FlexBox";
import { useStore } from "app/stores/store";
import { UpdatePreferencesRequest } from "app/models/currentUser";
import { useFormik } from "formik";
import { toast } from "material-react-toastify";
import { LoadingButton } from "@mui/lab";

const Preferences: FC = () => {
  const { currentUserStore } = useStore();
  const { currentUser, updatePreferences, getCurrentUser } = currentUserStore;
  const darkModeDefault = currentUser ? currentUser?.darkModeDefault : true;

  const [preferencesFormValues, setPreferencesFormValues] = useState<UpdatePreferencesRequest>({ //Local State
    darkModeDefault: darkModeDefault,
    pageSizeDefault: currentUser?.pageSizeDefault || 10,

  });

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, isValid, dirty, setFieldValue, resetForm } = useFormik({
    initialValues: preferencesFormValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await updatePreferences(values);
      toast.dark("Preferences Updated");   
      resetForm(); 
      setPreferencesFormValues(values); 
      await getCurrentUser();
    },
  });

  return (
    <Card sx={{ padding: 3, pb: 5 }}>
      <H5 mb={2}>Preferences</H5>
      <form onSubmit={handleSubmit}>
        <Grid container gap={4} >
          <Grid item xs={7} mt={2}>
            <H6 mb={1}>Page Size Default</H6>
            <Select
              sx={{ maxWidth: "180px" }}
              name="pageSizeDefault"
              value={values.pageSizeDefault}
              onChange={handleChange}
              IconComponent={() => <KeyboardArrowDown />}
              input={<StyledSelectInput />}
            >
              {[5, 10, 25, 50, 100].map((item, index) => (
                <MenuItem value={item} key={index} sx={{ fontSize: 12, fontWeight: 500 }}>
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
              control={<Switch 
                name="darkModeDefault"
                checked={values.darkModeDefault} 
                onChange={handleChange} />}
              sx={{ mt: "1rem" }}
            />
          </Grid>
        </Grid>
        <FlexBox justifyContent={"flex-end"}>
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={!dirty || !isValid || isSubmitting}
            loading={isSubmitting} 
          >
            Save Changes
          </LoadingButton>
        </FlexBox>
      </form>
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
