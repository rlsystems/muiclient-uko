import {
    Box,
    Button,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Modal,
    Radio,
    RadioGroup,
    styled,
} from "@mui/material";
import DarkTextField from "../../components/DarkTextField";
import FlexBox from "../../components/FlexBox";
import { H2, H6 } from "../../components/Typography";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";


import * as Yup from "yup";
import { observer } from "mobx-react-lite";

import { useStore } from "../../app/stores/store";
import { RegisterUserFormValues, User } from "../../app/models/user";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";

// component props interface
interface ModalProps {
    data?: any;
    open: boolean;
    onClose: () => void;
}

// styled components
const StyledModalCard = styled(Card)(({ theme }) => ({
    top: "50%",
    left: "50%",
    maxWidth: 700,
    minWidth: 300,
    position: "absolute",
    padding: "1.5rem",
    boxShadow: theme.shadows[2],
    transform: "translate(-50%, -50%)",
    width: "100%",
    outline: "none",
}));

const EditUserModal: FC<ModalProps> = ({ open, onClose, data }) => {
    const { appUserStore, userStore } = useStore();
    const { loadAppUser, updateAppUser, loading, loadingInitial } = appUserStore;
    const { currentUser, getCurrentUser, updateCurrentUser } = userStore; //check loading

    const { id } = useParams<{ id: string }>(); //in case this is admin edit

    const [userFormValues, setUserFormValues] = useState<User>({ //Local State
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        isActive: data.isActive,
        roleId: data.roleId
    });

    //gets passed to formik
    //gets passed to formik
    const validationSchema = Yup.object({
        firstName: Yup.string().required('The first name is required'),
        lastName: Yup.string().required('The last name is required'),
        email: Yup.string().required().email(),
        phoneNumber: Yup.string().notRequired()
    })


    useEffect(() => {
        if (id) {
            loadAppUser(id).then(appUser => setUserFormValues(appUser!))
        } else {

            if (!currentUser) {
                getCurrentUser().then(userFormValues => setUserFormValues(userFormValues!))
            } else {
                setUserFormValues(currentUser)
            }

        }
    }, [id, getCurrentUser])




    const { values, errors, handleChange, handleSubmit, touched, handleBlur, dirty, isSubmitting, isValid } = useFormik({
        initialValues: userFormValues,
        validationSchema: validationSchema,

        onSubmit: (user: User, { resetForm }) => {
            updateAppUser(user)
                .then(() => onClose())
                .then(() => resetForm())
        }

      

    });


    return (
        <Modal open={open} onClose={onClose}>
            <StyledModalCard>
                <H2 mb={2}>Edit User | {data.firstName} {data.lastName}</H2>
                <Divider />
                <form onSubmit={handleSubmit}>

                    <Grid container spacing={3} columnSpacing={5} className="main-form">
                        <Grid item xs={12}>
                            <FormGroup
                                sx={{ marginTop: 3 }}
                            >
                                <FormControlLabel control={
                                    <Checkbox

                                        id="isActive"
                                        name="isActive"
                                        checked={values.isActive}
                                        value={values.isActive}
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                    />
                                } label="Is Active" />
                            </FormGroup>

                        </Grid>
                        <Grid item xs={6}>
                            <H6 mb={1}>First Name</H6>
                            <DarkTextField
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                error={Boolean(errors.firstName && touched.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                autoComplete="new-password"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <H6 mb={1}>Last Name</H6>
                            <DarkTextField
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                error={Boolean(errors.lastName && touched.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                autoComplete="new-password"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <H6 mb={1}>Email</H6>
                            <DarkTextField
                                id="email"
                                name="email"
                                placeholder="newuser@gmail.com"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                error={Boolean(errors.email && touched.email)}
                                helperText={touched.email && errors.email}
                                autoComplete="new-password"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <H6 mb={1}>Phone Number</H6>
                            <DarkTextField
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                helperText={touched.phoneNumber && errors.phoneNumber}
                                autoComplete="new-password"
                            />
                        </Grid>



                        <Grid item xs={12}>
                            <H6 mb={1}>Role</H6>
                            <RadioGroup
                                row
                                name="roleId"
                                defaultValue={values.roleId}
                                onChange={handleChange}
                            >
                                {["admin", "editor", "basic"].map((item) => (
                                    <FormControlLabel
                                        sx={{
                                            textTransform: 'capitalize',
                                            marginRight: '40px'
                                        }}
                                        key={item}
                                        value={item}
                                        label={(item)}
                                        control={<Radio />}
                                    />
                                ))}
                            </RadioGroup>
                        </Grid>


                    </Grid>

                    <FlexBox justifyContent="space-between" marginTop={4}>
                        <Button
                            size="small"
                            variant="outlined"
                            //onClick={handleDelete}
                            sx={{
                                width: 124,
                                fontSize: 12,
                                marginRight: 2,
                                color: (theme) =>
                                    theme.palette.primary.red,
                                borderColor: (theme) =>
                                    theme.palette.primary.red,
                                "&:hover": {
                                    color: (theme) =>
                                    theme.palette.primary.red,
                                borderColor: (theme) =>
                                    theme.palette.primary.red,
                                      },
                            }}
                        >
                            Delete
                        </Button>
                        <FlexBox>
                            <Button
                                fullWidth
                                size="small"
                                variant="outlined"
                                onClick={onClose}
                                sx={{
                                    width: 124,
                                    fontSize: 12,
                                    marginRight: 2,
                                    color: "text.disabled",
                                    borderColor: "text.disabled",
                                }}
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
                </form>
            </StyledModalCard>
        </Modal>
    );
};

export default observer(EditUserModal);