interface Course {
  id: string;
  name: string;
  org: string;
  type: string;
  teacher_list: string;
  status_info: string;
  begins_times: string;
  start_at: string;
  end_at: string;
  period_schedule: string;
  students: number;
  course_description: string;
  course_overview: string;
  course_objective: string;
  course_catalogue: string;
  propaedeutics: string;
  certificate_requirement: string;
  reference_data: string;
  faq: string;
  comments_number: number;
  score: number;
  comments_list: string;
  comments_time: string;
  comments_score: string;
}

declare namespace CourseParams {
  interface Find {
    name: string;
    type: string;
  }
}

interface CourseDetail {
  id: string;
  name: string;
  org: string;
  type: string;
  teacherList: string;
  status_info: string;
  begins_times: string;
  startAt: Date;
  endAt: Date;
  period_schedule: string;
  students: number;
  course_description: string;
  course_overview: string;
  course_objective: string;
  course_catalogue: string;
  propaedeutics: string;
  certificate_requirement: string;
  reference_data: string;
  faq: string;
  comments_number: number;
  score: number;
  comments_list: string;
  comments_time: string;
  comments_score: string;
  // description: string;
  // coverUrl: string;
  // status: string;
  // orgId: string;
  // orgName: string;
  // catalogs?: Catlog[];
  // createBy: string;
  // createAt: string | null;
  // type: 'UNDONE' | 'COMPLETED' | null;
  // courseProgress?: number;
  // startTime?: string;
  // endTime?: string;
}

interface Catlog {
  id: string;
  parentId: string;
  name: string;
  type: string;
  description?: any;
  sort: number;
  resourceUrl?: string;
  children?: Catlog[];
  progress: number;
  completeType?: 'UNDONE' | 'COMPLETED' | null;
  createAt?: string;
  updateAt?: string;
}

interface MyCourses {
  courseId: string;
  courseName: string;
  type: string;
  courseProgress?: number;
  createAt: string;
}

interface VideoRepoter {
  courseId: string;
  catalogId: string;
  progress: number;
  reportTime: string;
}

interface VideoRepoterWhenPlay {
  getcourseId: string;
  catalogId: string;
}
