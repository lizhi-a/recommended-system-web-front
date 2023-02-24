interface Course {
  id: string;
  name: string;
  orgName: string;
  createAt: string;
  updateAt: string;
  description: string;
  cover: string;
}

interface CourseDetail {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  status: string;
  orgId: string;
  orgName: string;
  catalogs?: Catlog[];
  createBy: string;
  createAt: string | null;
  type: 'UNDONE' | 'COMPLETED' | null;
  courseProgress?: number;
  startTime?: string;
  endTime?: string;
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
