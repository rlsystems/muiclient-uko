import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import {
  SocialIconButton,
  TextFieldWrapper,
} from "./StyledComponents";
import FlexBox from "../../components/FlexBox";
import LightTextField from "../../components/LightTextField";
import { H1, H3, Paragraph, Small } from "../../components/Typography";
import { useFormik } from "formik";

import { FC, useState } from "react";
//import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

const Login: FC = () => {
  const [error, setError] = useState("");

  const { userStore } = useStore();


  const initialValues = {
    email: "admin@root.com",
    password: "Password123!",
    tenant: "root",
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

  const { errors, values, touched, handleBlur, handleChange, handleSubmit, dirty, isSubmitting, isValid } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        userStore.login(values);
        //toast.success("You Logged In Successfully test");
      },
    });

  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: { sm: "100%" },
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 1 }}>
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password || ""}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </TextFieldWrapper>
              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1} mt={3}>
                  Tenant
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="tenant"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tenant || ""}
                  error={Boolean(touched.tenant && errors.tenant)}
                  helperText={touched.tenant && errors.tenant}
                />
              </TextFieldWrapper>
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
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid}
                color="primary" variant="contained"
                fullWidth type="submit"
                loading={isSubmitting}

              >
                Submit
              </LoadingButton>
            </Box>
          </form>

          
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default observer(Login);
