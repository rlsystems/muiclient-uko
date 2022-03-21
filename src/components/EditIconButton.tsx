import { IconButton, IconButtonProps, useTheme } from "@mui/material";
import PencilIcon from "../icons/PencilIcon";

const EditIconButton = (props: IconButtonProps) => {
  const theme = useTheme();

  return (
    <IconButton
      {...props}
      sx={{
        border: "1px solid",
        borderRadius: "10px",
        borderColor:
          theme.palette.mode === "light" ? "secondary.300" : "divider",
      }}
    >
      <PencilIcon
        sx={{
          fontSize: 16,
          color: "text.disabled",
        }}
      />
    </IconButton>
  );
};

export default EditIconButton;
