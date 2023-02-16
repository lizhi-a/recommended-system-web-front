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
