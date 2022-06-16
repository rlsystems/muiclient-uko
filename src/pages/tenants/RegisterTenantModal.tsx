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
import { LoadingButton } from "@mui/lab";
import { CreateTenantRequest } from "../../app/models/tenant";
import StyledModalCard from "components/StyledModalCard";

// component props interface
interface ModalProps {
  data?: any;
  open: boolean;
  onClose: () => void;
}


const RegisterTenantModal: FC<ModalProps> = ({ open, onClose, data }) => {
  const { tenantStore } = useStore();
  const { createTenant } = tenantStore;

  const [tenantFormValues, setTenantFormValues] = useState<CreateTenantRequest>({ //Local State
    id: '',
    name: '',
    adminEmail: '',
    password: ''
  });

  const handleClose = () => {
    resetForm(); //method from Formik
    onClose(); //method from Mui Modal
  }

  //gets passed to formik
  const validationSchema = Yup.object({
    id: Yup.string().required('The key is required'),
    name: Yup.string().required('Tenant name is required'),
    adminEmail: Yup.string().required('The admin email is required').email(),
    password: Yup.string().required('The password is required'),
  })




  const { values, errors, handleChange, handleSubmit, touched, handleBlur, dirty, isSubmitting, isValid, resetForm } = useFormik({
    initialValues: tenantFormValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (createTenantRequest: CreateTenantRequest, { resetForm }) => {
      createTenant(createTenantRequest).then(() => onClose())
        .then(() => resetForm())
    }
  });


  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalCard>
        <H2 mb={2}>Add Tenant</H2>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Grid mt={1} container spacing={3} columnSpacing={5} className="main-form">
            <Grid item xs={6}>
              <H6 mb={1}>Tenant Key</H6>
              <DarkTextField
                id="id"
                name="id"
                placeholder="Key"
                value={values.id}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.id && Boolean(errors.id)}
                helperText={touched.id && errors.id}
              />
            </Grid>
            <Grid item xs={6}>
              <H6 mb={1}>Name</H6>
              <DarkTextField
                id="name"
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            

            <Grid item xs={6}>
              <H6 mb={1}>Admin Email</H6>
              <DarkTextField
                id="adminEmail"
                name="adminEmail"
                placeholder="admin@email.com"
                value={values.adminEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.adminEmail && Boolean(errors.adminEmail)}
                helperText={touched.adminEmail && errors.adminEmail}
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
              />
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

export default observer(RegisterTenantModal);
