export type Todo = {
  id: string;
  remark: string;
  isDone: boolean;
  createdAt: object;
  userId: string;
}

export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
};