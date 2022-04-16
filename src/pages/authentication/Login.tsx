import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import {
  TextFieldWrapper,
} from "./StyledComponents";
import FlexBox from "../../components/FlexBox";
import LightTextField from "../../components/LightTextField";
import { H1, H3, Paragraph, Small } from "../../components/Typography";
import { useFormik } from "formik";

import { FC, useState, useEffect } from "react";
//import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { toast } from "react-toastify";

const Login: FC = () => {
  const [error, setError] = useState("");
  const { userStore, commonStore } = useStore();

  const initialValues = {
    email: "",
    password: "",
    tenant: "",
  };

  // form field value validation schema
  const validationSchema = Yup.object().shape({  
    tenant: Yup.string()
      .required('Tenant key is required'),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit, dirty, isSubmitting, isValid, setFieldValue, setFieldError, setFieldTouched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          await userStore.login(values);
          toast.success("Logged In Successfully!");
        } catch (error) {
          const message = (error as Error)?.message || "Login failed";
          toast.error(message);
          setFieldError("email", "Wrong user credentials");
          setFieldError("password", "Wrong user credentials");
        }
      },
    });


  //Admin Credentials button
  const handleAdminCredentials = () => {
    populateField("email", "admin@root.com");
    populateField("password", "Password123!");
    populateField("tenant", "root");
  }

  //To prepopulate a field it must be touched
  const populateField = (name: string, value: string) => {
    setFieldValue(name, value);
    setTimeout(() => setFieldTouched(name, true));
  };


  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: { sm: "100%" },
      }}
    >
      <Card sx={{ padding: 4, width: "100%", maxWidth: 600, boxShadow: 1 }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          mb={5}
        >
          <Box width={38} mb={1}>
            <img src="/logo/logo.svg" width="100%" alt="Logo" />
          </Box>
          <H1 fontSize={24} fontWeight={700}>
            Sign In to App
          </H1>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Email
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="user@email.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Password
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="password"
                  type="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password || ""}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </TextFieldWrapper>
              {/* If no subdomain is present, render the tenant field */}
              {!commonStore.hasSubdomain && (
                <TextFieldWrapper>
                  <Paragraph fontWeight={600} mb={1} mt={3}>
                    Tenant
                  </Paragraph>
                  <LightTextField
                    fullWidth
                    name="tenant"
                    type="text"
                    placeholder="tenant"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.tenant || ""}
                    error={Boolean(touched.tenant && errors.tenant)}
                    helperText={touched.tenant && errors.tenant}
                  />
                </TextFieldWrapper>
              )}



            </FlexBox>
            <FlexBox mt={2} alignItems="center" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Switch
                    name="remember"
                    checked
                  />
                }
                label="Remember Me"
                sx={{ "& .MuiTypography-root": { fontWeight: 600 } }}
              />
              <Link to="/forgot-password">
                <Small color="secondary.red">Forgot Password?</Small>
              </Link>
            </FlexBox>


            {error && (
              <FormHelperText
                error
                sx={{
                  mt: 2,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {error}
              </FormHelperText>
            )}

            <Box sx={{ mt: 4 }}>
              <LoadingButton
                sx={{ mb: 2 }}
                disabled={!isValid}
                color="primary" variant="contained"
                fullWidth
                type="submit"
                loading={isSubmitting}

              >
                Submit
              </LoadingButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                onClick={() => handleAdminCredentials()}
                color="primary"
                variant="outlined"

              >
                Admin Credentials
              </Button>
            </Box>
          </form>


        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default observer(Login);
