import { Box, Button, Card, LinearProgress } from "@mui/material";
import LightTextField from "../../../components/LightTextField";
import { H5, H6, Tiny } from "../../../components/Typography";
import React, { FC, useState } from "react";
import { useStore } from "app/stores/store";
import { ChangePasswordRequest } from "app/models/user";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import FlexBox from "components/FlexBox";

const Password: FC = () => {
  const { userStore, commonStore } = useStore();
  const { changePassword } = userStore;

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
        toast.success("Password updated");
      } else {
        toast.error("Problem updating password");
      }
      setStrength(10);
      resetForm();
    },

  });

  const checkPasswordStrength = (password: string) => {
    let calculatedStrength = 0;
    const checkLength = new RegExp('(?=.{8,})');
    const checkLower = new RegExp('(?=.*[a-z])');
    const checkUpper = new RegExp('(?=.*[A-Z])');
    const checkNumber = new RegExp('(?=.*[0-9])');
    const checkSpecial = new RegExp('(?=.*[^A-Za-z0-9])');

    checkLower.test(password) ? calculatedStrength += 20 : calculatedStrength;
    checkUpper.test(password) ? calculatedStrength += 20 : calculatedStrength;
    checkLength.test(password) ? calculatedStrength += 20 : calculatedStrength;
    checkNumber.test(password) ? calculatedStrength += 20 : calculatedStrength;
    checkSpecial.test(password) ? calculatedStrength += 20 : calculatedStrength;
    setStrength(calculatedStrength);
  }

  //What type should 'e' be
  const handlePasswordFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const newPassword = e.target.value;
    checkPasswordStrength(newPassword);
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
        <FlexBox flexWrap="wrap">
          <Box width={"50%"} paddingRight={8}>
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
            <LinearProgress variant="determinate" value={strength} />
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

            <Box my={3}>
              <H6>Password requirements:</H6>
              <Tiny fontWeight={500} color="text.disabled">
                Ensure that these requirements are met:
              </Tiny>
              <ul>
                <li>Minimum 8 characters long</li>
                <li>At least one lowercase character</li>
                <li>At least one uppercase character</li>
                <li>At least one number</li>
              </ul>
            </Box>

            <LoadingButton
              variant="contained"
              disabled={!dirty || !isValid || isSubmitting}
              loading={isSubmitting}
              type="submit">
              Save Changes
            </LoadingButton>
          </Box>
          <Box width={"50%"} paddingRight={8}>
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
          </Box>
        </FlexBox>

      </form>

    </Card>
  );
};

export default Password;
