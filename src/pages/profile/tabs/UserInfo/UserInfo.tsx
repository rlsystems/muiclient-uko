import { FC, useState } from "react";
import {
  Badge,
  Box,
  Card,
  Grid,
  styled,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { LightTextField } from "components/formInput/InputsLight";
import { H5, Tiny } from "components/Typography";
import NanoAvatar from "components/NanoAvatar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { ChangeProfileImageRequest, UpdateProfileRequest } from "app/models/currentUser";
import { LoadingButton } from "@mui/lab";
import { toast } from "material-react-toastify";
import getBase64 from "app/utils/getBase64";
import ImagePopover from "./ImagePopover";

const UserInfo: FC = () => {
  const {
    currentUserStore: {
      currentUser, updateCurrentUser, updateProfileImage
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
      let response = await updateCurrentUser(values);
      if(response.succeeded) {
        toast.dark("Profile Updated");
        resetForm();   
        setUserFormValues(values);
      } else {
        response.messages.forEach(error => {
          toast.error(error);
        })
      }
      setIsUpdating(false);
    },
  });

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = async (evt) => {
    const file = evt.target?.files?.[0];
    let imageRequest: ChangeProfileImageRequest = {
      imageFile: file
    }
    await updateProfileImage(imageRequest)
    const base64 = await getBase64(file!) as string;
    if (base64) setTempImage(base64);
  }

  const handleImageRemove = async () => {
    let imageRequest: ChangeProfileImageRequest = {
      deleteCurrentImage: true
    }
    await updateProfileImage(imageRequest);
    setTempImage("");
  }


  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      width: 25,
      height: 25,
      borderRadius: "50%",
      backgroundColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));

  return (
    <Card sx={{ padding: "1.5rem", pb: "4rem" }}>
      <H5>Edit your account information:</H5>

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
      </FlexBox>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} mt={1}>
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
          <Grid item xs={12} sm={6} >
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
          <Grid item xs={12} display="flex" justifyContent="flex-end" mt={3}>
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={!dirty || !isValid || isSubmitting}
              loading={isUpdating}
            >
              Save Changes
            </LoadingButton>
          </Grid>


        </Grid>
      </form>
    </Card>
  );
};


export default observer(UserInfo);
