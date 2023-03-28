declare namespace CommentData {
  interface Comment {
    id: number;
    uid: number;
    cid: string;
    startAt: number;
    description: string;
    score: number;
  }
}

declare namespace CommentParams {
  interface Add {
    uid: number;
    cid: string;
    userName: string;
    startAt: number;
    description: string;
    score: number;
  }

  interface Find {
    cid: string;
  }
}