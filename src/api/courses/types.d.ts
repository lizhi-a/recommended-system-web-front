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

interface MyCourses {
  id: number;
  cid_id: string;
  courseInfo: Course;
  process: number;
  score?: number;
}

declare namespace CourseParams {
  interface Find {
    name: string;
    type: string;
  }

  interface SubmitTest {
    uid: number;
    cid: string;
    questions: Record<number, string>;
  }

  interface myCourseRecord {
    id: number;
    cid_id: string;
    uid_id: string;
    process: number;
    last_score: number;
    score: number;
    last_answer: string;
  }

  interface VideoRepoter {
    cid: string;
    uid: number;
    progress: number;
    reportTime: string;
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
  video: string;
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



interface VideoRepoterWhenPlay {
  getcourseId: string;
  catalogId: string;
}

interface Question {
  question_id: number;
  question_info: string;
  question_options: string[];
  question_answer: string;
}