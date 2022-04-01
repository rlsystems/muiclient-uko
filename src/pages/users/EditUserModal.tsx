import {
    Button,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    Modal,
    Radio,
    RadioGroup,
    styled,
} from "@mui/material";
import DarkTextField from "../../components/DarkTextField";
import FlexBox from "../../components/FlexBox";
import { H2, H6 } from "../../components/Typography";
import { useFormik } from "formik";
import { FC, useState } from "react";


import * as Yup from "yup";
import { observer } from "mobx-react-lite";

import { useStore } from "../../app/stores/store";
import { User } from "../../app/models/user";
import { LoadingButton } from "@mui/lab";


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
    const { updateAppUser, deleteAppUserLoading, updateAppUserLoading, loadingInitial, deleteAppUser } = appUserStore;
    const { currentUser } = userStore;


    const [userFormValues, setUserFormValues] = useState<User>({ //Local State
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        isActive: data.isActive,
        roleId: data.roleId
    });

    const validationSchema = Yup.object({
        firstName: Yup.string().required('The first name is required'),
        lastName: Yup.string().required('The last name is required'),
        email: Yup.string().required().email(),
        phoneNumber: Yup.string().notRequired()
    })



    const { values, errors, handleChange, handleSubmit, touched, handleBlur, dirty, isSubmitting, isValid } = useFormik({
        initialValues: userFormValues,
        validationSchema: validationSchema,
        onSubmit: (user: User, { resetForm }) => {

            isRootUser ? user.roleId = "root" : "";

            updateAppUser(user)
                .then(() => onClose())
                .then(() => resetForm())
        }
    });


    const handleDelete = (id: string) => {
        deleteAppUser(id).then(() => onClose());
    }

    ////--Alternative syntax
    // const handleDelete = async (id: string) => {
    //     await deleteAppUser(id);
    //     onClose();
    // }

    //to conditionally render form
    const isRootUser: boolean = values.roleId === 'root';
    const isCurrentUser: boolean = values.id === currentUser?.id; //Hide role / Is active

    return (
        <Modal open={open} onClose={onClose}>
            <StyledModalCard>
                <H2 mb={2}>Edit User | {data.firstName} {data.lastName}</H2>
                <Divider sx={{ marginBottom: 3 }} />
                <form onSubmit={handleSubmit}>

                    <Grid
                        container
                        spacing={3}
                        columnSpacing={5}
                        className="main-form"
                    >

                        {(!isRootUser && !isCurrentUser) &&
                            <Grid item xs={12}>
                                <FormGroup>
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
                        }

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


                        {(!isRootUser && !isCurrentUser) &&
                            <Grid item xs={12}>
                                <H6 mb={1}>Role</H6>
                                <RadioGroup
                                    row
                                    name="roleId"
                                    value={values.roleId}
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
                        }



                    </Grid>

                    <FlexBox justifyContent={!isRootUser ? "space-between" : "flex-end"} marginTop={4}>

                        {!isRootUser &&
                            <LoadingButton
                                size="small"
                                variant="outlined"
                                loading={deleteAppUserLoading}
                                onClick={() => handleDelete(values.id)}
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
                            </LoadingButton>
                        }

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
                                loading={updateAppUserLoading}
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
