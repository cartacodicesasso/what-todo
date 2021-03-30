import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
  CircleIcon,
  EnumCircleIconStyle,
} from "@amplication/design-system";

import { UserTitle } from "../user/UserTitle";
import { Task } from "../api/task/Task";

type Data = Task[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "description",
    title: "Description",
    sortable: false,
  },
  {
    name: "isDone",
    title: "Done",
    sortable: false,
  },
  {
    name: "dueDate",
    title: "Due date",
    sortable: false,
  },
  {
    name: "priority",
    title: "Priority",
    sortable: false,
  },
  {
    name: "title",
    title: "Title",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
  {
    name: "user",
    title: "User",
    sortable: false,
  },
];

export const TaskList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/tasks",
    async () => {
      const response = await api.get("/api/tasks");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Tasks"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/tasks/new"}>
            <Button>Create Task </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Task) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/tasks"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.description}</>
                </DataGridCell>
                <DataGridCell>
                  <>
                    {item.isDone && (
                      <CircleIcon
                        icon="check"
                        style={EnumCircleIconStyle.positive}
                      />
                    )}
                  </>
                </DataGridCell>
                <DataGridCell>
                  <>{item.dueDate}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.priority}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.title}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.user?.id} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
