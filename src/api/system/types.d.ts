declare namespace UserData {

  interface User {
    id: number;
    userName: string;
    password: string;
    name: string;
    gender: string;
    label: string[];
    major: string;
  }
}

declare namespace UserParams {
  type Update = Omit<UserData.User, 'label'> & { label: string }
  type SignIn = Omit<UserData.User, 'id' | 'label'> & { label: string }
}