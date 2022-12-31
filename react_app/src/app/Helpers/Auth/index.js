class AuthHelper {
  isAuthenticated() {
    if (localStorage.getItem("token")) return true;
    return false;
  }
}

export default AuthHelper;
