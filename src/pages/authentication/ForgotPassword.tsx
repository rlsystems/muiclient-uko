import { LoadingButton } from "@mui/lab";
import { Box, Card, FormHelperText } from "@mui/material";
import { useStore } from "app/stores/store";
import FlexBox from "components/FlexBox";
import { LightTextField } from "components/formInput/InputsLight";
import { H1, Small } from "components/Typography";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "material-react-toastify";
import * as Yup from "yup";

const ForgotPassword: FC = () => {
  const { currentUserStore, commonStore } = useStore();

  const initialValues = {
    email: "demo@example.com",
    tenant: "root"
  };
  // form field value validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    tenant: Yup.string()
      .required("Tenant key is required"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit, isSubmitting, isValid } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        const result = await currentUserStore.forgotPassword(values);
        if (result?.succeeded === true) {
          toast.dark("Password reset email sent");
        } else {
          toast.error("Could not send email");
        }
      },
    });

  return (
    <FlexBox
      height="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Card sx={{ padding: 4, width: "100%", maxWidth: 600, marginTop: 4, boxShadow: 1 }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          mb={5}
        >
          <Box width={38} mb={1}>
            <img src="/logo/nanoLogo.png" width="100%" alt="Logo" />
          </Box>
          <H1 fontSize={24} fontWeight={700}>
            Reset your password
          </H1>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <LightTextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email || ""}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            {!commonStore.hasSubdomain && (
              <LightTextField
                sx={{
                  mt: 2
                }}
                fullWidth
                name="tenant"
                label="Tenant"
                type="text"
                placeholder="Tenant"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tenant || ""}
                error={Boolean(touched.tenant && errors.tenant)}
                helperText={touched.tenant && errors.tenant}
              />
            )}
       
            <Box sx={{ mt: 4 }}>
              <LoadingButton
                loading={isSubmitting}
                disabled={!isValid}
                fullWidth
                type="submit"
                variant="contained">
                Reset
              </LoadingButton>
            </Box>
          </form>

          <Small margin="auto" mt={3} color="text.disabled">
          {!commonStore.hasSubdomain && ("Tenant key required in testing ")}{" "}
            <Link to="/login">
              <Small color="primary.main">Return to login</Small>
            </Link>
          </Small>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default ForgotPassword;
