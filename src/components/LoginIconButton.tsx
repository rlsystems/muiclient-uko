import { IconButton, IconButtonProps, Tooltip, useTheme } from "@mui/material";
import ShareIcon from "../icons/ShareIcon";

const LoginIconButton = (props: IconButtonProps) => {
    const theme = useTheme();

    return (
        <Tooltip title="Login as account owner">
            <IconButton
                {...props}
                sx={{
                    border: "1px solid",
                    borderRadius: "10px",
                    marginRight: "10px",
                    borderColor:
                        theme.palette.mode === "light" ? "secondary.300" : "divider",
                }}
            >
                <ShareIcon
                    sx={{
                        fontSize: 16,
                        color: "text.disabled",
                    }}
                />
            </IconButton>
        </Tooltip>

    );
};

export default LoginIconButton;
