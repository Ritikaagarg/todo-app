export type User = {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean | null;
  photoURL: string | null;
  uid: string | null;
}

export type Todo = {
  id: string;
  remark: string;
  isDone: boolean;
  createdAt: object;
  userId: string;
}