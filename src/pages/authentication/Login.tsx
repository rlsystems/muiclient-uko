import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  styled,
  Switch,
} from "@mui/material";

import FlexBox from "../../components/FlexBox";
import { StyledSelectInput, LightTextField } from "../../components/formInput/InputsLight";
import { H1, H3, Paragraph, Small, Tiny } from "../../components/Typography";
import { useFormik } from "formik";

import { FC, useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { toast } from "react-toastify";
import { KeyboardArrowDown } from "@mui/icons-material";

const Login: FC = () => {
  const [error, setError] = useState("");
  const { currentUserStore, commonStore, tenantStore } = useStore();
  const { loadTenants, tenantsSorted, loadingInitial } = tenantStore;

  const initialValues = {
    email: "",
    password: "",
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

  const { errors, values, touched, handleBlur, handleChange, handleSubmit, dirty, isSubmitting, isValid, setFieldValue, setFieldError, setFieldTouched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        console.log(values);
        try {
          await currentUserStore.login(values);
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
    populateField("email", "admin@email.com");
    populateField("password", "Password123!");
    populateField("tenant", "root");
  }

  //To prepopulate a field it must be touched
  const populateField = (name: string, value: string) => {
    setFieldValue(name, value);
    setTimeout(() => setFieldTouched(name, true));
  };

  useEffect(() => {
    loadTenants();
  }, [loadTenants])


  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: { xs: "0px", sm: "50px" }
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
            <img src="/logo/nanoLogo.png" width="100%" alt="Logo" />
          </Box>
          <H1 fontSize={24} fontWeight={700}>
            Sign In
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




            </FlexBox>
            <FlexBox mt={2} alignItems="center" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Switch
                    name="remember"
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

            <Divider sx={{ mt: 3, width: "100%", alignItems: "center" }}>
              <H3 color="text.disabled" px={1}>
                Welcome
              </H3>
            </Divider>
            <Box sx={{ mt: 1 }}>
              <Tiny display="block" color="text.disabled" fontWeight={500} textAlign="center">
                For the demo, specify the tenant with the dropdown. ASP Nano can resolve tenants by subdomain in real deployments. Click the Admin Credentials to quickly populate fields.
              </Tiny>
            </Box>

            <Box sx={{ display: "flex", alignItems: { xs: "center", sm: "flex-end" }, justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" }, paddingTop: { xs: "20px", sm: "0px" } }}>
              <Button
                onClick={() => handleAdminCredentials()}
                color="primary"
                variant="outlined"
                sx={{ height: 50 }}
              >
                Admin Credentials
              </Button>
              {/* If no subdomain is present, render the tenant field */}
              {!commonStore.hasSubdomain && (
                <TextFieldWrapper>
                  <Paragraph fontWeight={600} mb={1} mt={3}>
                    Tenant
                  </Paragraph>
                  {loadingInitial &&

                    <Box display="flex" alignItems={"center"} width="100%" height={"50px"}>
                      <CircularProgress size={30} />
                    </Box>
                  }

                  {!loadingInitial &&
                    <Select
                      displayEmpty
                      name="tenant"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.tenant || ""}
                      error={Boolean(touched.tenant && errors.tenant)}
                      IconComponent={() => loadingInitial ? <Fragment /> : <KeyboardArrowDown />}
                      input={<StyledSelectInput />}
                    >

                      {tenantsSorted.map((item) => (
                        <MenuItem value={item.id} sx={{ fontSize: 12, fontWeight: 500, textTransform: "capitalize" }}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>

                  }

                </TextFieldWrapper>
              )}
            </Box>


          </form>


        </FlexBox>
      </Card>
      <Alert
        sx={{ marginTop: 2, padding: 2, width: "100%", maxWidth: 600, boxShadow: 1 }}
        severity="success"
        variant="outlined">
        Default credentials: admin@email.com / Password123!
      </Alert>
      <Alert
        sx={{ marginTop: 2, padding: 2, width: "100%", maxWidth: 600, boxShadow: 1 }}
        severity="info"
        variant="outlined">
        Sample data resets every 6 hours
      </Alert>
    </FlexBox>
  );
};

export default observer(Login);


//Input fields layout
const TextFieldWrapper = styled(Box)(({ theme }) => ({
  width: "48%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: "0.5rem",
  },
}));