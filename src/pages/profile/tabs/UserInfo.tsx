import {
  CameraAlt,
  Clear,
  Facebook,
  Instagram,

  SportsBasketball,
  Twitter,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Switch,
} from "@mui/material";
import FlexBox from "../../../components/FlexBox";
import LightTextField from "../../../components/LightTextField";
import { H5, H6, Tiny } from "../../../components/Typography";
import UkoAvatar from "../../../components/UkoAvatar";
import { useFormik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import { StyledBadge, StyledChip, StyledFormControlLabel, StyledInput } from "../StyledComponent";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { User } from "../../../app/models/user";
import { LoadingButton } from "@mui/lab";

const UserInfo: FC = () => {
  const { userStore, commonStore } = useStore();

  const { currentUser, updateCurrentUser } = userStore;

  


  const [userFormValues, setUserFormValues] = useState<User>({ //Local State
    id: currentUser?.id || "",
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",  
    phoneNumber: currentUser?.phoneNumber || "",  
    email: currentUser?.email || "",  
    isActive: true,
    roleId: "",
});

  const fieldValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too Short")
      .required("First Name is Required!"),
    lastName: Yup.string().required("Last Name is Required!"),
    email: Yup.string().required('The email is required').email(),

  });

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, isValid, dirty  } = useFormik({
    initialValues: userFormValues,
    validationSchema: fieldValidationSchema,
    onSubmit: (values) => {
      updateCurrentUser(values);
    },
  });

  return (
    <Card sx={{ padding: "1.5rem", pb: "4rem" }}>
      <H5>Edit your account information:</H5>
      <form onSubmit={handleSubmit}>
        <FlexBox
          my="1.5rem"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <FlexBox alignItems="center">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              badgeContent={
                <label htmlFor="icon-button-file">
                  <input
                    type="file"
                    accept="image/*"
                    id="icon-button-file"
                    style={{ display: "none" }}
                  />

                  <IconButton aria-label="upload picture" component="span">
                    <CameraAlt
                      sx={{ fontSize: 16, color: "background.paper" }}
                    />
                  </IconButton>
                </label>
              }
            >
              <UkoAvatar
                alt="Avatar"
                src={"/static/avatar/001-man.svg"}
                sx={{ width: 90, height: 90 }}
              />
            </StyledBadge>
            <Box ml="1rem">
              <H5>{currentUser?.firstName}</H5>
              <Tiny color="text.disabled">UI / UX Designer</Tiny>
            </Box>
          </FlexBox>

          <FlexBox justifyContent="space-between" width={270}>
            <Button
              variant="outlined"
              sx={{
                width: 124,
                color: "text.disabled",
                borderColor: "text.disabled",
              }}
              fullWidth
            >
              Cancel
            </Button>
            <LoadingButton
              fullWidth
              size="small"
              type="submit"
              variant="contained"
              disabled={!dirty || !isValid || isSubmitting}
              loading={isSubmitting}
              sx={{ width: 124, fontSize: 12 }}
            >
              Save
            </LoadingButton>
          </FlexBox>
        </FlexBox>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="firstName"
              label="First Name"
              value={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.firstName && errors.firstName}
              error={Boolean(touched.firstName && errors.firstName)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="lastName"
              label="Last Name"
              value={values.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={touched.lastName && errors.lastName}
              error={Boolean(touched.lastName && errors.lastName)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email && errors.email}
              error={Boolean(touched.email && errors.email)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LightTextField
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.phoneNumber && errors.phoneNumber}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
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

export default observer(UserInfo);
