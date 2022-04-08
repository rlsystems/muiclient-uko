import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, FormHelperText, LinearProgress } from "@mui/material";
import { useStore } from "app/stores/store";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H1, Small } from "components/Typography";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ResetPassword: FC = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { userStore } = useStore();
    const [strength, setStrength] = useState(10);



    const initialValues = {
        email: "demo@example.com",
        token: "",
        password: "",
        confirmPassword: "",
        tenant: "root"
    };
    // form field value validation schema
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        token: Yup.string()
            .required("Token is required!"),
        password: Yup.string()
            .required("New password is required!"),
        confirmPassword: Yup.string()
            .required("Confirm new password is required!"),
        tenant: Yup.string()
            .required("Tenant key is required"),
    });


    const { errors, values, touched, handleBlur, handleChange, handleSubmit, isSubmitting, isValid } =
        useFormik({
            initialValues,
            validationSchema,
            onSubmit: async (values) => {

                const result = await userStore.resetPassword(values);
                if (result?.succeeded === true) {
                    toast.success("Password reset successfully");
                } else {
                    toast.error("Problem resetting password");
                }

            },
        });


    //What type should 'e' be
    const checkStrength = (e: any) => {
        handleChange(e);

        let calculatedStrength = 10;
        let newPassword = e.target.value;

        const checkLength = new RegExp('(?=.{8,})');
        const checkLower = new RegExp('(?=.*[a-z])');
        const checkUpper = new RegExp('(?=.*[A-Z])');
        const checkNumber = new RegExp('(?=.*[0-9])');
        const checkSpecial = new RegExp('(?=.*[^A-Za-z0-9])');

        checkLower.test(newPassword) ? calculatedStrength += 15 : calculatedStrength;
        checkUpper.test(newPassword) ? calculatedStrength += 15 : calculatedStrength;
        checkLength.test(newPassword) ? calculatedStrength += 20 : calculatedStrength;
        checkNumber.test(newPassword) ? calculatedStrength += 20 : calculatedStrength;
        checkSpecial.test(newPassword) ? calculatedStrength += 20 : calculatedStrength;
        setStrength(calculatedStrength);

    }

    return (
        <FlexBox
            height="100vh"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
        >
            <Card sx={{ padding: 4, maxWidth: 600, marginTop: 4, boxShadow: 1 }}>
                <FlexBox
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                    mb={5}
                >
                    <Box width={38} mb={1}>
                        <img src="/logo/logo.svg" width="100%" alt="Uko Logo" />
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

                        <LightTextField
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={checkStrength}
                            helperText={touched.password && errors.password}
                            error={Boolean(touched.password && errors.password)}
                            sx={{ mt: 2, mb: 1 }}
                            placeholder="Enter new password"
                        />
                        <LinearProgress variant="determinate" value={strength} />
                        <LightTextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                            sx={{ mt: 2 }}
                            placeholder="Confirm new password"
                        />

                        <LightTextField
                            sx={{
                                mt: 2
                            }}
                            fullWidth
                            name="token"
                            label="Token"
                            type="text"
                            placeholder="Token"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.token || ""}
                            error={Boolean(touched.token && errors.token)}
                            helperText={touched.token && errors.token}
                        />

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
                        Tenant key required in testing {" "}
                        <Link to="/login">
                            <Small color="primary.main">Return to login</Small>
                        </Link>
                    </Small>
                </FlexBox>
            </Card>
        </FlexBox>
    );
};

export default ResetPassword;