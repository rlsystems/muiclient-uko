import { Box, ButtonBase, Divider, Popover } from "@mui/material";
import { H4 } from "../components/Typography";
import React, { FC } from "react";

// component props interface
interface PopoverLayoutProps {
  title?: string | JSX.Element;
  hiddenViewButton?: boolean;
  popoverOpen: boolean;
  popoverClose: () => void;
  children: React.ReactNode;
  handleButton?: () => void;
  anchorRef: React.MutableRefObject<null>;
  minWidth?: number | string;
  maxWidth?: number | string;
  noHeader?: boolean
}

const PopoverLayout: FC<PopoverLayoutProps> = (props) => {
  const {
    children,
    popoverClose,
    popoverOpen,
    anchorRef,
    title,
    hiddenViewButton,
    minWidth,
    maxWidth,
    noHeader
  } = props;
  return (
    <Popover
      open={popoverOpen}
      onClose={popoverClose}
      anchorEl={anchorRef.current}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      PaperProps={{
        sx: {
          minWidth: minWidth || 250,
          maxWidth: maxWidth || 375,
          width: "100%",
          padding: "0.5rem 0",
        },
      }}
    >
      {/*
        Fragment added to avoid warning
        Reference: https://medium.com/@david.zhao.blog/warning-failed-prop-type-invalid-prop-children-supplied-to-forwardref-expected-a-d73d6fda47f1
      */}
      <React.Fragment>
        {noHeader ||
          <React.Fragment>
            <H4 fontWeight="700" p={2}>
              {title || "Notifications"}
            </H4>
            <Divider />
          </React.Fragment>
        }
        {children}
        {!hiddenViewButton && (
          <Box p={2}>
            <ButtonBase
              disableRipple
              sx={{
                margin: "auto",
                display: "block",
                color: "primary.main",
              }}
              >
              View all Notifications
            </ButtonBase>
          </Box>
        )}
      </React.Fragment>
    </Popover>
  );
};

export default PopoverLayout;
