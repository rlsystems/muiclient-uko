import { RoleID } from "app/models/user";
import Icons from "../icons/sidebar";

const sideBarNavList = [

  {
    title: "UI Component Samples",
    Icon: Icons.PagesIcon,
    path: "/samples",
    roles: null,
    topDivider: false
  },
  {
    title: "Venues",
    Icon: Icons.UserManagementIcon,
    path: "/venues",
    roles: null,
    topDivider: true
  },
  {
    title: "Users",
    Icon: Icons.UserProfileIcon,
    path: "/users",
    roles: [RoleID.root, RoleID.admin],
    topDivider: true
  },
  {
    title: "Tenants",
    Icon: Icons.AccountSettingsIcon,
    path: "/tenants",
    roles: [RoleID.root],
    topDivider: false
  }

];

export default sideBarNavList;
