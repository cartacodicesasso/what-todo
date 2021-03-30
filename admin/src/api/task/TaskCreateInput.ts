import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TaskCreateInput = {
  description?: string | null;
  isDone: boolean;
  dueDate?: Date | null;
  priority: number;
  title: string;
  user: UserWhereUniqueInput;
};
