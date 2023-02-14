interface Course {
  id: string;
  name: string;
  orgName: string;
  createAt: string;
  updateAt: string;
  description: string;
  cover: string;
  chapters: Chapter[];
}

interface Chapter {
  name: string;
  description: string;
  sort: number;
}