import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TaskWhereInput = {
  createdAt?: Date;
  description?: string | null;
  isDone?: boolean;
  dueDate?: Date | null;
  id?: string;
  priority?: number;
  title?: string;
  updatedAt?: Date;
  user?: UserWhereUniqueInput;
};
