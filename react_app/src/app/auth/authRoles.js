/**
 * Authorization Roles
 */
const authRoles = {
  admin: ["admin"],
  staff: ["admin"],
  user: ["admin", "client", "vendor"],
  onlyGuest: [],
};

export default authRoles;
