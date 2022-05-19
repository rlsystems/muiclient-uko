import { FC, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Switch,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H5, H6, Tiny } from "components/Typography";
import NanoAvatar from "components/NanoAvatar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StyledBadge, StyledFormControlLabel } from "../../StyledComponent";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { UpdateProfileRequest } from "app/models/user";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import getBase64 from "app/utils/getBase64";
import ImagePopover from "./ImagePopover";

const UserInfo: FC = () => {
  const {
    userStore: {
      currentUser, updateCurrentUser, getCurrentUser
    }
  } = useStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [tempImage, setTempImage] = useState(currentUser?.imageUrl)

  const [userFormValues, setUserFormValues] = useState<UpdateProfileRequest>({ //Local State
    id: currentUser?.id || "",
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    phoneNumber: currentUser?.phoneNumber || "",
    email: currentUser?.email || "",
    imageFile: undefined,
    imageUrl: currentUser?.imageUrl || "",
    deleteCurrentImage: false
  });

  const fieldValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too Short")
      .required("First Name is Required!"),
    lastName: Yup.string().required("Last Name is Required!"),
    email: Yup.string().required('The email is required').email(),
  });

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, isValid, dirty, setFieldValue, resetForm } = useFormik({
    initialValues: userFormValues,
    validationSchema: fieldValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsUpdating(true);
      await updateCurrentUser(values);
      toast.success("Profile Updated"); //how does it know if updateCurrentUser is success or failure?
      // The above toast is only called if updateCurrentUser runs without fail
      // the await keyword runs the promise there, and terminates the whole async function if the promise doesn't get resolved
      resetForm(); // is this how we make the save button go back to being disabled? (make the form untouched again), strange that isSubmitting doesnt work
      // It's working now actually, you can check again if I'm missing something
      setIsUpdating(false);

      // Performing both the below operations right now, will move to more optimized way to doing it after looking into the problem a little
      // First one updates the field for the current page
      // Second one updates currentUser with the latest data on Mobx store
      setUserFormValues(values); //full page pattern?
      await getCurrentUser();


      //after selecting an image, the image should display in the UI (like even before its uploaded)
      //check this link: https://medium.com/geekculture/how-to-upload-and-preview-images-in-react-js-4e22a903f3db

      //create the popover for Add / Delete
      //to handle delete, send deleteCurrentImage = true (this is already working on API)

    },
  });

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = async (evt) => {
    const file = evt.target?.files?.[0];
    setFieldValue("imageFile", file); //formik
    const base64 = await getBase64(file!) as string;
    if (base64) setTempImage(base64);
  }

  const handleImageRemove = async () => {
    await updateCurrentUser({ ...values, deleteCurrentImage: true });
    setTempImage("");
  }

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
                <ImagePopover
                  handleImageUpdate={handleImageUpload}
                  handleImageRemove={handleImageRemove}
                />
              }
            >
              <NanoAvatar
                alt="Avatar"
                src={tempImage || ""}
                sx={{ width: 90, height: 90 }}
              />
            </StyledBadge>
            <Box ml="1rem">
              <H5>{currentUser?.firstName}</H5>
              <Tiny color="text.disabled" sx={{ textTransform: "capitalize" }}>{currentUser?.roleId} Level User</Tiny>
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
              loading={isUpdating} //ok to use local state?
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
