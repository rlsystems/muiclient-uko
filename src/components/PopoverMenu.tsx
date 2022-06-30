import { Box, ButtonBase, Divider, Popover } from "@mui/material";
import { H4 } from "./Typography";
import React, { FC } from "react";

// component props interface
interface PopoverMenuProps {
  title?: string | JSX.Element;
  popoverOpen: boolean;
  popoverClose: () => void;
  children: React.ReactNode;
  handleButton?: () => void;
  anchorRef: React.MutableRefObject<null>;
  minWidth?: number | string;
  maxWidth?: number | string;
  noHeader?: boolean
}

const PopoverMenu: FC<PopoverMenuProps> = (props) => {
  const {
    children,
    popoverClose,
    popoverOpen,
    anchorRef,
    title,
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
      
      </React.Fragment>
    </Popover>
  );
};

export default PopoverMenu;
