
interface AccountCourse {
  courseId: string;
  courseName: string;
  type: string;
  courseProgress: number;
  createAt: string;
}

interface loginType {
  content: UserInfo & { token: string };
}