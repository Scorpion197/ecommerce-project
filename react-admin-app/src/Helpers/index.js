class AuthHelper {
  isAuthenticated() {
    if (localStorage.getItem("token") != null) return true;
    return false;
  }
}

export default AuthHelper;
