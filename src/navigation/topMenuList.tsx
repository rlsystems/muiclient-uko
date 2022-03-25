import Icons from "../icons/sidebar";



const index = [
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
    roles: 'admin'
  },
  {
    title: "Tenants",
    Icon: Icons.AccountSettingsIcon,
    path: "/tenants",
    roles: 'root'
  }

];

export default index;
