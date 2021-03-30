import { option } from "fp-ts";
import { NonEmptyString } from "io-ts-types";
import { Item } from "../globalDomain";

export const fakeItems: Item[] = [
  {
    id: 5,
    title: "Natus sed sit nisi fugiat" as NonEmptyString,
    description: option.some(
      "Et impedit officiis quis nobis deleniti quo. Non et exercitationem aliquam et tenetur culpa. Qui fugiat aut sed quo vitae ea esse vel rerum. Corrupti est et nulla. Autem corporis nemo." as NonEmptyString
    ),
    dueDate: option.some(new Date("2021-11-25T17:13:42.789Z")),
    createdAt: new Date("2021-11-25T17:13:42.789Z"),
    updatedAt: new Date("2021-11-25T17:13:42.789Z"),
    isDone: true,
    priority: 1,
  },
  {
    id: 3,
    title: "Asperiores aut rerum sunt labore" as NonEmptyString,
    description: option.some(
      "Nesciunt quos reiciendis debitis quisquam nisi. Nemo sit rerum ea. Esse molestiae enim sit ipsam est neque assumenda maiores." as NonEmptyString
    ),
    dueDate: option.none,
    createdAt: new Date("2021-11-25T21:34:38.827Z"),
    updatedAt: new Date("2021-11-25T21:34:38.827Z"),
    isDone: false,
    priority: 3,
  },
  {
    id: 6,
    title: "Perspiciatis voluptatem est tempore eos" as NonEmptyString,
    description: option.some("Accusamus a voluptatem" as NonEmptyString),
    dueDate: option.some(new Date("2021-11-26T08:43:08.388Z")),
    createdAt: new Date("2021-11-26T08:43:08.388Z"),
    updatedAt: new Date("2021-11-26T08:43:08.388Z"),
    isDone: true,
    priority: 2,
  },
  {
    id: 9,
    title: "Quibusdam ab soluta expedita hic" as NonEmptyString,
    description: option.some("Excepturi autem maiores." as NonEmptyString),
    dueDate: option.none,
    createdAt: new Date("2021-11-27T03:54:54.040Z"),
    updatedAt: new Date("2021-11-27T03:54:54.040Z"),
    isDone: false,
    priority: 2,
  },
  {
    id: 8,
    title: "Neque quo voluptate ab maxime" as NonEmptyString,
    description: option.some("quod nisi voluptatem" as NonEmptyString),
    dueDate: option.some(new Date("2021-11-27T11:52:16.152Z")),
    createdAt: new Date("2021-11-27T11:52:16.152Z"),
    updatedAt: new Date("2021-11-27T11:52:16.152Z"),
    isDone: false,
    priority: 3,
  },
  {
    id: 2,
    title: "Nobis vero eum ex optio" as NonEmptyString,
    description: option.some(
      "Quis accusamus fugiat quo quasi id molestiae maxime. Aspernatur culpa eum. Non in voluptates et libero tenetur. Quisquam saepe laboriosam." as NonEmptyString
    ),
    dueDate: option.none,
    createdAt: new Date("2021-11-28T04:06:22.889Z"),
    updatedAt: new Date("2021-11-28T04:06:22.889Z"),
    isDone: true,
    priority: 1,
  },
  {
    id: 10,
    title: "Dolorum eum sed voluptas nulla" as NonEmptyString,
    description: option.some(
      "Laboriosam sit voluptates qui deserunt nihil. Eos aut amet sapiente officia alias ipsum aut. Repudiandae et modi saepe ullam qui aliquam magni laudantium." as NonEmptyString
    ),
    dueDate: option.some(new Date("2021-11-28T20:32:45.563Z")),
    createdAt: new Date("2021-11-28T20:32:45.563Z"),
    updatedAt: new Date("2021-11-28T20:32:45.563Z"),
    isDone: true,
    priority: 3,
  },
  {
    id: 7,
    title: "Exercitationem aperiam dolorum nam ducimus" as NonEmptyString,
    description: option.some("fuga" as NonEmptyString),
    dueDate: option.none,
    createdAt: new Date("2021-03-01T06:38:28.970Z"),
    updatedAt: new Date("2021-03-01T06:38:28.970Z"),
    isDone: false,
    priority: 2,
  },
  {
    id: 1,
    title: "Labore suscipit dolorum aut et" as NonEmptyString,
    description: option.some(
      "Accusamus nihil commodi laboriosam maiores iusto fugit quia deserunt recusandae. Et inventore qui delectus laudantium labore. Dolores enim et ex voluptatibus fugit qui aut." as NonEmptyString
    ),
    dueDate: option.some(new Date("2021-03-02T00:24:05.644Z")),
    createdAt: new Date("2021-03-02T00:24:05.644Z"),
    updatedAt: new Date("2021-03-02T00:24:05.644Z"),
    isDone: false,
    priority: 1,
  },
  {
    id: 4,
    title: "Unde nihil facilis et reprehenderit" as NonEmptyString,
    description: option.some(
      "Aperiam est nobis quidem saepe accusantium culpa et quia. Temporibus quod laborum accusantium alias." as NonEmptyString
    ),
    dueDate: option.none,
    createdAt: new Date("2021-02-05T09:12:29.283Z"),
    updatedAt: new Date("2021-02-05T09:12:29.283Z"),
    isDone: false,
    priority: 3,
  },
];
