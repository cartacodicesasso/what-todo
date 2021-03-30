import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
  ToggleField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { Task } from "../api/task/Task";
import { TaskCreateInput } from "../api/task/TaskCreateInput";

const INITIAL_VALUES = {} as TaskCreateInput;

export const CreateTask = (): React.ReactElement => {
  useBreadcrumbs("/tasks/new", "Create Task");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Task,
    AxiosError,
    TaskCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/tasks", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/tasks"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TaskCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Task"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Description" name="description" textarea />
          </div>
          <div>
            <ToggleField label="Done" name="isDone" />
          </div>
          <div>
            <TextField type="datetime-local" label="Due date" name="dueDate" />
          </div>
          <div>
            <TextField
              type="number"
              step={1}
              label="Priority"
              name="priority"
            />
          </div>
          <div>
            <TextField label="Title" name="title" />
          </div>
          <div>
            <UserSelect label="User" name="user.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
