import { RoleID } from "app/models/user";
import Icons from "../icons/sidebar";

const menuList = [
  {
    title: "Venues",
    Icon: Icons.UserManagementIcon,
    path: "/venues",
    roles: null
  },
  {
    title: "Users",
    Icon: Icons.UserProfileIcon,
    path: "/users",
    roles: [RoleID.root, RoleID.admin],
    divider: true
  },
  {
    title: "Tenants",
    Icon: Icons.AccountSettingsIcon,
    path: "/tenants",
    roles: [RoleID.root]
  }

];

export default menuList;
