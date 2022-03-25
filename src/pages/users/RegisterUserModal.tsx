import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
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
import { FC, useState } from "react";


import * as Yup from "yup";
import { observer } from "mobx-react-lite";

import { useStore } from "../../app/stores/store";
import { RegisterUserFormValues } from "../../app/models/user";
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

const RegisterUserModal: FC<ModalProps> = ({ open, onClose, data }) => {
  const { appUserStore } = useStore();
  const { createAppUser } = appUserStore;

  const [newUserFormValues, setNewUserFormValues] = useState<RegisterUserFormValues>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    roleId: 'basic'
  });

  //gets passed to formik
  const validationSchema = Yup.object({
    firstName: Yup.string().required('The first name is required'),
    lastName: Yup.string().required('The last name is required'),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().required()
  });




  const { values, errors, handleChange, handleSubmit, touched, handleBlur, dirty, isSubmitting, isValid } = useFormik({
    initialValues: newUserFormValues,
    validationSchema: validationSchema,
    onSubmit: (appUser: RegisterUserFormValues, {resetForm}) => {    
      createAppUser(appUser)
      .then(() => onClose())
      .then(() => resetForm())
    }

    
  });


  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalCard>
        <H2 mb={2}>Add New User</H2>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Grid mt={1} container spacing={3} columnSpacing={5} className="main-form">
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
            
            <Grid item xs={6}>
              <H6 mb={1}>Password</H6>
              <DarkTextField
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                autoComplete="new-password"
              />
            </Grid>
            
            <Grid item xs={6}>
              <H6 mb={1}>Confirm Password</H6>
              <DarkTextField
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
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

          <FlexBox justifyContent="flex-end" marginTop={4}>
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
        </form>
      </StyledModalCard>
    </Modal>
  );
};

export default observer(RegisterUserModal);