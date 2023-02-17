interface UserInfo {
  uid: string;
  username: string;
  status: string;
  orgName: string;
  accountCourses: AccountCourse[];
  expireAt: string;
  realName: string;
  photo: string;
}

interface AccountCourse {
  courseId: string;
  courseName: string;
  type: string;
  courseProgress: number;
  createAt: string;
}