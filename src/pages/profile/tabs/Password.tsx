import { Box, Card, Grid, LinearProgress } from "@mui/material";
import { LightTextField } from "../../../components/formInput/InputsLight";
import { H5, H6, Tiny } from "../../../components/Typography";
import React, { FC, useState } from "react";
import { useStore } from "app/stores/store";
import { ChangePasswordRequest } from "app/models/currentUser";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { toast } from "material-react-toastify";
import checkPasswordStrength from "app/utils/checkPasswordStrength";

const Password: FC = () => {
  const { currentUserStore, commonStore } = useStore();
  const { changePassword } = currentUserStore;
  const [strength, setStrength] = useState(0);

  const [passwordFormValues, setPasswordFormValues] = useState<ChangePasswordRequest>({ //Local State
    password: "",
    newPassword: "",
    confirmNewPassword: "",

  });

  const fieldValidationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Current password is required!"),
    newPassword: Yup.string()
      .required("New password is required!"),
    confirmNewPassword: Yup.string()
      .required("Confirm new password is required!").oneOf([Yup.ref('newPassword')], 'Your passwords do not match!'),
  });

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting, resetForm, isValid, dirty } = useFormik({
    initialValues: passwordFormValues,
    validationSchema: fieldValidationSchema,
    onSubmit: async (values) => {
      const result = await changePassword(values);
      if (result?.succeeded === true) {
        toast.dark("Password updated");
      } else {
        toast.error("Problem updating password");
      }
      setStrength(10);
      resetForm();
    },
  });

  const handlePasswordFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const newPassword = e.target.value;
    const passwordStrength = checkPasswordStrength(newPassword, {
      checkFor: ['length', 'lowerCase', 'upperCase', 'number']
    }).strength
    setStrength(passwordStrength);
  }

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
      <form onSubmit={handleSubmit}>
        <Grid container columnSpacing={6}>
          <Grid item xs={12} md={6}>
            <LightTextField
              fullWidth
              name="newPassword"
              type="password"
              value={values.newPassword}
              onChange={handlePasswordFieldChange}
              onBlur={handleBlur}
              helperText={touched.newPassword && errors.newPassword}
              error={Boolean(touched.newPassword && errors.newPassword)}
              sx={{ mt: 2, mb: 1 }}
              placeholder="Enter new password"
            />
            <LinearProgress variant="determinate" value={strength} color={ strength === 100 ? "success" : "error" } />
          </Grid>
          <Grid item xs={12} md={6}>
            <LightTextField
              fullWidth
              name="confirmNewPassword"
              type="password"
              value={values.confirmNewPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              sx={{ mt: 2 }}
              placeholder="Confirm new password"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LightTextField
              fullWidth
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password && errors.password}
              error={Boolean(touched.password && errors.password)}
              sx={{ mt: 2 }}
              placeholder="Enter current password"
            />
          </Grid>
          <Grid item xs={12}>
            <Box paddingTop={3}>
              <H6>Password requirements:</H6>
              <Tiny fontWeight={500} color="text.disabled">
                Ensure that these requirements are met:
              </Tiny>
              <ul>
                <li>Minimum 6 characters long</li>
                <li>At least one lowercase character</li>
                <li>At least one uppercase character</li>
                <li>At least one number</li>
              </ul>

            </Box>

          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <LoadingButton
              variant="contained"
              disabled={!dirty || !isValid || isSubmitting}
              loading={isSubmitting}
              type="submit">
              Save Changes
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default Password;
