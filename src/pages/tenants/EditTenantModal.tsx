import {
    Button,
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    Modal,
    styled,
} from "@mui/material";
import {DarkTextField} from "../../components/formInput/InputsDark";
import FlexBox from "../../components/FlexBox";
import { H2, H6 } from "../../components/Typography";
import { useFormik } from "formik";
import { FC, useState } from "react";

import * as Yup from "yup";
import { observer } from "mobx-react-lite";

import { useStore } from "../../app/stores/store";
import { LoadingButton } from "@mui/lab";
import { Tenant } from "../../app/models/tenant";
import StyledModalCard from "components/StyledModalCard";


// component props interface
interface ModalProps {
    data?: any;
    open: boolean;
    onClose: () => void;
}


const EditTenantModal: FC<ModalProps> = ({ open, onClose, data }) => {
    const { tenantStore } = useStore();
    const { updateTenant } = tenantStore;

    const [tenantFormValues, setTenantFormValues] = useState<Tenant>({ //Local State
        id: data.id,
        name: data.name,
        isActive: data.isActive,
    });

    const handleClose = () => {
        resetForm(); //method from Formik
        onClose(); //method from Mui Modal
    }

    //gets passed to formik
    const validationSchema = Yup.object({
        name: Yup.string().required('Tenant name is required'),
       
    })

    const { values, errors, handleChange, handleSubmit, touched, handleBlur, dirty, isSubmitting, isValid, resetForm } = useFormik({
        initialValues: tenantFormValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (tenant: Tenant, { resetForm }) => {
            updateTenant(tenant).then(() => onClose())
                .then(() => resetForm())
        }
    });

    return (
        <Modal open={open} onClose={handleClose}>
            <StyledModalCard>
                <H2 mb={2}>Edit Tenant</H2>
                <Divider />
                <form onSubmit={handleSubmit}>
                    <Grid mt={1} container spacing={3} columnSpacing={5} className="main-form">

                        <Grid item xs={7}>
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

                        <Grid item xs={7}>
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

export default observer(EditTenantModal);
