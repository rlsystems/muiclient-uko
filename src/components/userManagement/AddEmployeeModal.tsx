import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  styled,
} from "@mui/material";
import DarkTextField from "../DarkTextField";
import FlexBox from "../FlexBox";
import { H2, H6, Small } from "../Typography";
import { useFormik } from "formik";
import ImageUploadIcon from "../../icons/ImageUploadIcon";
import { FC } from "react";
//import toast from "react-hot-toast";
//import axiosInstance from "utils/axios";
import * as Yup from "yup";

// component props interface
interface ModalProps {
  data?: any;
  open: boolean;
  edit?: boolean;
  onClose: () => void;
}

// styled components
const StyledModalCard = styled(Card)(({ theme }) => ({
  top: "50%",
  left: "50%",
  maxWidth: 400,
  minWidth: 200,
  position: "absolute",
  padding: "1.5rem",
  boxShadow: theme.shadows[2],
  transform: "translate(-50%, -50%)",
  width: "100%",
  [theme.breakpoints.down(325)]: {
    maxWidth: "100%",
  },
}));

const AddEmployeeModal: FC<ModalProps> = ({ open, onClose, edit, data }) => {
  const initialValues = {
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    avatar: data?.avatar || "",
    roleId: data?.roleId || "",
  };

  const fieldValidationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short").required("Name is Required!"),
    username: Yup.string()
      .min(3, "Too Short")
      .required("Username is Required!"),
    email: Yup.string().required("Email is Required!"),
    // avatar: Yup.string().required("Avatar is Required!"),
    role: Yup.string().required("Role is Required!"),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema: fieldValidationSchema,
    onSubmit: (values) => {
      // axiosInstance
      //   .post("/api/tableData1/new", {
      //     name: values.name,
      //     username: values.username,
      //     email: values.email,
      //     role: values.role,
      //   })
      //   .then(() => {
      //     onClose();
      //     //toast.success("New Data Added Successfully");
      //   })
      //   .catch((error) => console.log(error));
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalCard>
        <H2 mb={2}>{edit ? "Edit Employee" : "Add new Employee"}</H2>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} className="main-form">
            <Grid item xs={12}>
              <H6 mb={1}>Name</H6>
              <DarkTextField
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={values.firstName}
                error={Boolean(errors.firstName && touched.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>

            <Grid item xs={12}>
              <H6 mb={1}>Last Name</H6>
              <DarkTextField
                name="lastName"
                placeholder="lastName"
                onChange={handleChange}
                value={values.lastName}
                error={Boolean(errors.lastName && touched.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>

            <Grid item xs={12}>
              <H6 mb={1}>Email</H6>
              <DarkTextField
                name="email"
                placeholder="uilib@gmail.com"
                onChange={handleChange}
                value={values.email}
                error={Boolean(errors.email && touched.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <H6 mb={1}>Role</H6>
              <DarkTextField
                name="roleId"
                placeholder="admin"
                onChange={handleChange}
                value={values.roleId}
                error={Boolean(errors.roleId && touched.roleId)}
                helperText={touched.roleId && errors.roleId}
              />
            </Grid>

            <Grid item xs={12}>
              <H6 mb={1}>Add Picture</H6>

              <label htmlFor="icon-button-file">
                <input
                  type="file"
                  accept="image/*"
                  id="icon-button-file"
                  style={{ display: "none" }}
                />
                <IconButton
                  disableRipple
                  component="span"
                  sx={{ padding: 0, display: "block" }}
                >
                  <Box
                    sx={{
                      minHeight: 40,
                      display: "flex",
                      borderRadius: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "divider",
                    }}
                  >
                    <ImageUploadIcon
                      sx={{
                        fontSize: 18,
                        marginRight: 0.5,
                        color: "text.disabled",
                      }}
                    />
                    <Small color="text.disabled">Choose a file</Small>
                  </Box>
                </IconButton>
              </label>
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
            <Button
              fullWidth
              size="small"
              type="submit"
              variant="contained"
              sx={{ width: 124, fontSize: 12 }}
            >
              Save
            </Button>
          </FlexBox>
        </form>
      </StyledModalCard>
    </Modal>
  );
};

export default AddEmployeeModal;
