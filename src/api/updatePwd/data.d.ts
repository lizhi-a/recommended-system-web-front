declare namespace UpdatePasswordParams {
  interface Update {
    oldPwd: string;
    newPwd: string;
    confirmPassword: string;
  }
}