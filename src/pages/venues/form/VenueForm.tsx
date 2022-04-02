import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStore } from 'app/stores/store';
import { useFormik } from 'formik';
import * as Yup from 'yup';


import { Venue } from 'app/models/venue';
import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import LoadingScreen from 'components/LoadingScreen';

export default observer(function VenueForm() {
  const history = useHistory();
  const { venueStore } = useStore();
  const { createVenue, updateVenue, loadVenue, loadingInitial } = venueStore;
  const { id } = useParams<{ id: string }>();

  const [venue, setVenue] = useState<Venue>({
      id: '',
      name: '',
      description: '',
      type: 0
  });

  //gets passed to formik
  const validationSchema = Yup.object({
      name: Yup.string().required('The Venue name is required'),
      description: Yup.string().required('The Venue description is required'),
  })

  useEffect(() => {
      if (id) loadVenue(id).then(venue => setVenue(venue!))
  }, [id, loadVenue])

  const formik = useFormik({
    initialValues: venue,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (venue: Venue) => {
      if (venue.id.length === 0) {
        createVenue(venue).then(() => history.push(`/venues/`))
      } else {
        updateVenue(venue).then(() => history.push(`/editVenue/${venue.id}`))
      }
    }
  });

  if (loadingInitial) return <LoadingScreen content='Loading venue...' />

  return (
      <Box
          component="main"
          sx={{
              backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
          }}
      >
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>

              <Typography variant="h4" gutterBottom>
                  Venue Form
              </Typography>

              <Divider />

              <form onSubmit={formik.handleSubmit}>
              <TextField
                  fullWidth
                  margin="normal"
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                  fullWidth
                  margin="normal"
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
              />
              <TextField
                  fullWidth
                  margin="normal"
                  id="type"
                  name="type"
                  label="Type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 3, mb: 2 }}>
                  <Button component={Link} to='/venues' variant="text">Cancel</Button>
                  <LoadingButton
                      sx={{ ml: 1 }}
                      disabled={!formik.dirty || !formik.isValid}
                      color="primary" variant="contained"

                      type="submit"
                      loading={formik.isSubmitting}

                  >
                      Submit
                  </LoadingButton>

              </Box>

          </form>


          </Container>
      </Box>
  )
})

