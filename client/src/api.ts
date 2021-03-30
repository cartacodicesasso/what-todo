import { taskEither } from "fp-ts";
import { pipe } from "fp-ts/function";
import { ReaderTaskEither } from "fp-ts/ReaderTaskEither";
import { TaskEither } from "fp-ts/TaskEither";

interface MutationInput<I> {
  url: string;
  method: "POST" | "PATCH";
  data: I;
}

export interface APIError {
  error: string;
  message: string;
  statusCode: number;
}

function request<I, O>(input: MutationInput<I>): TaskEither<APIError, O> {
  return pipe(
    taskEither.tryCatch(
      () =>
        fetch(process.env.REACT_APP_API_URL + input.url, {
          method: input.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input.data),
        }),
      (error) => error as APIError
    ),
    taskEither.chain((response) =>
      taskEither.tryCatch(
        () => response.json(),
        (error) => error as APIError
      )
    ),
    taskEither.chain((data: O | APIError) => {
      if (isAPIError(data)) {
        return taskEither.left(data);
      } else {
        return taskEither.right(data);
      }
    })
  );
}

function isAPIError(response: any): response is APIError {
  return (
    typeof response.statusCode === "number" &&
    typeof response.error === "string" &&
    typeof response.message === "string"
  );
}

export function usePost<I, O>(url: string): ReaderTaskEither<I, APIError, O> {
  return (data: I) =>
    request({
      url,
      method: "POST",
      data,
    });
}
