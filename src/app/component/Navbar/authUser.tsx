import React, { Fragment } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { verifiedMemberdata } from "../../apiServices/verify";
import { sweetFailureProvider } from "../../lib/sweetAlert";

export function AuthUser(props: any) {
  /** Initialization */
  const navigate = useNavigate();
  const { handleLogoutRequest } = props;

  /** Handlers */

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <Fragment>
          <FaUser
            {...bindTrigger(popupState)}
            className="nav-icon"
            style={{
              width: "25px",
              height: "25px",
              cursor: "pointer",
              color: "#000",
            }}
          />
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() => {
                !verifiedMemberdata
                  ? sweetFailureProvider("Please login first, kindly!")
                  : navigate("/member-page");
              }}
            >
              My account
            </MenuItem>
            <MenuItem onClick={handleLogoutRequest}>Logout</MenuItem>
          </Menu>
        </Fragment>
      )}
    </PopupState>
  );
}
