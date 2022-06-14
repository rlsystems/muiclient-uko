import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Card, Grid, MenuItem, Select, Switch } from "@mui/material";
import { H5, H6, Tiny } from "../../../components/Typography";
import { FC, useState } from "react";
import { StyledSelectInput, StyledFormControlLabel } from "components/StyledComponent";
import FlexBox from "components/FlexBox";
import { useStore } from "app/stores/store";
import { UpdatePreferencesRequest } from "app/models/user";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const Preferences: FC = () => {
  const { userStore } = useStore();
  const { currentUser, updatePreferences, getCurrentUser } = userStore;

  // const defaultPageSize = currentUser ? currentUser?.pageSizeDefault : "10";
  const darkModeDefault = currentUser ? currentUser?.darkModeDefault : true;


  //const [pageSize, setPageSize] = useState(defaultPageSize);

  const [isUpdating, setIsUpdating] = useState(false);



  const [preferencesFormValues, setPreferencesFormValues] = useState<UpdatePreferencesRequest>({ //Local State
    darkModeDefault: darkModeDefault,
    pageSizeDefault: currentUser?.pageSizeDefault || 10,

  });


  const { values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, isValid, dirty, setFieldValue, resetForm } = useFormik({
    initialValues: preferencesFormValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsUpdating(true);
      await updatePreferences(values);
      toast.success("Preferences Updated"); 
    
      resetForm(); 
      setIsUpdating(false);

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

              {[5, 10, 25, 50, 100].map((item) => (
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
            fullWidth
            size="small"
            type="submit"
            variant="contained"
            disabled={!dirty || !isValid || isSubmitting}
            loading={isUpdating}
            sx={{ width: 124, fontSize: 12 }}
          >
            Save
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
