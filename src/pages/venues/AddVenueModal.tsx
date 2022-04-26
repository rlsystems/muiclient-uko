import {
  Button,
  Card,
  Divider,
  FormControlLabel,
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
import { Venue } from "../../app/models/venue";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

interface Props {
  data?: any;
  open: boolean;
  onClose: () => void;
}

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


const AddVenueModal: FC<Props> = ({ open, onClose, data }) => {
  const { venueStore } = useStore();
  const { createVenue, createVenueLoading } = venueStore;

  const [newVenueFormValues] = useState<Venue>({
    id: '',
    name: '',
    description: '',
    type: 1
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Venue name is required'),
    description: Yup.string().required('Venue description is required'),
    type: Yup.number().required().min(0).max(1),
  });


  const { values, errors, handleChange, handleSubmit, touched, handleBlur, dirty, isSubmitting, isValid, resetForm } = useFormik({
    initialValues: newVenueFormValues,
    validationSchema: validationSchema,
    onSubmit: async (addVenue: Venue) => {
      await createVenue(addVenue)
      toast.success("Venue Added Successfully!")
      handleClose()
    }
  });

  const handleClose = () => {
    resetForm();
    onClose();
  }

  // TODO: keep in production
  // const handleBackdropClose = (_: any, reason: any) => {
  //   if (reason && reason == "backdropClick")
  //   return;
  //   handleClose();
  // }


  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalCard>
        <H2 mb={2}>Add Venue</H2>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Grid mt={1} container spacing={3} columnSpacing={5} className="main-form">
            <Grid item xs={6}>
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

            <Grid item xs={6}>
              <H6 mb={1}>Type</H6>
              <RadioGroup
                row
                name="type"
                value={values.type}
                onChange={handleChange}
              >
                {[0, 1].map((item) => (
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

            <Grid item xs>
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
              loading={createVenueLoading}
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

export default observer(AddVenueModal);
