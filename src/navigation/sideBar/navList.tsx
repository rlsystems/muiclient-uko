import { Roles } from "app/models/roles";
import Icons from "../../icons/sidebar";

// list of navigation items that appear in sidebar
const navList = [
  {
    title: "UI Component Samples",
    Icon: Icons.PagesIcon,
    path: "/samples",
    roles: null, 
    topDivider: false // for visually seperating sections
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
    roles: [Roles.root, Roles.admin], // for restricting to certian roles
    topDivider: true
  },
  {
    title: "Tenants",
    Icon: Icons.AccountSettingsIcon,
    path: "/tenants",
    roles: [Roles.root],
    topDivider: false
  }
];

export default navList;
