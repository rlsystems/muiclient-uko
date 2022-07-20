import {
  Button,
  Divider,
  Grid,
  Modal,
} from "@mui/material";
import {DarkTextField} from "../../components/formInput/InputsDark";
import FlexBox from "../../components/FlexBox";
import { H2, H6 } from "../../components/Typography";
import { useFormik } from "formik";
import { FC, useState } from "react";

import * as Yup from "yup";
import { observer } from "mobx-react-lite";

import { useStore } from "../../app/stores/store";
import { Venue } from "../../app/models/venue";
import { LoadingButton } from "@mui/lab";
import { toast } from "material-react-toastify";
import StyledModalCard from "components/StyledModalCard";

interface Props {
  data?: any;
  open: boolean;
  isEdit: boolean;
  onClose: () => void;
}


const VenueModal: FC<Props> = ({ open, onClose, isEdit, data }) => {
  const { venueStore } = useStore();
  const { createVenue, createUpdateLoading, updateVenue } = venueStore;

  const [newVenueFormValues] = useState<Venue>({
    id: isEdit ? data.id : '',
    name: isEdit ? data.name : '',
    description: isEdit ? data.description : '',
  });



  const validationSchema = Yup.object({
    name: Yup.string().required('Venue name is required'),
    description: Yup.string().required('Venue description is required'),
  });


  const { values, errors, handleChange, handleSubmit, touched, handleBlur, dirty, isSubmitting, isValid, resetForm } = useFormik({
    initialValues: newVenueFormValues,
    validationSchema: validationSchema,
    onSubmit: async (addVenue: Venue) => {
      if (!isEdit) {
        await createVenue(addVenue)
        toast.dark("Venue Added!")
      } else {
        await updateVenue(addVenue)
        toast.dark("Venue Updated!")
      }
      handleClose()
    }
  });

  const handleClose = () => {
    resetForm();
    onClose();
  }


  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalCard>
        <H2 mb={2}> {!isEdit ? 'Add Venue' : 'Edit Venue'}</H2>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Grid mt={1} container spacing={3} columnSpacing={5} className="main-form">
            <Grid item xs={12} sm={8}>
              <H6 mb={1}>Name</H6>
              <DarkTextField
                id="name"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={Boolean(errors.name && touched.name)}
                helperText={touched.name && errors.name}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <H6 mb={1}>Description</H6>
              <DarkTextField
                multiline
                minRows={2}
                id="description"
                name="description"
                placeholder="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={Boolean(errors.description && touched.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
          </Grid>

          <FlexBox justifyContent="flex-end" marginTop={4}>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              onClick={() => handleClose()}
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
              loading={createUpdateLoading}
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

export default observer(VenueModal);
