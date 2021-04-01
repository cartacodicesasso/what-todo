import { FC, FormEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { constNull, flow, pipe } from "fp-ts/function";
import { option, taskEither } from "fp-ts";
import Alert from "react-bootstrap/Alert";
import { ReaderTaskEither } from "fp-ts/ReaderTaskEither";
import { Option } from "fp-ts/Option";
import Jumbotron from "react-bootstrap/Jumbotron";

export interface FormData {
  username: string;
  password: string;
}

interface Props {
  onSubmit: ReaderTaskEither<FormData, string, unknown>;
}

export const LoginForm: FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Option<string>>(option.none);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(false);
    setError(option.none);

    pipe(
      props.onSubmit({
        username,
        password,
      }),
      taskEither.bimap(
        (error) => {
          setError(option.some(error));
          setIsSubmitting(false);
        },
        () => {
          setIsSubmitting(false);
        }
      )
    )();
  };

  return (
    <Jumbotron className="FormPanel">
      <h2>Login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
        </Form.Group>

        {pipe(
          error,
          option.fold(constNull, (error) => (
            <Alert variant="danger">{error}</Alert>
          ))
        )}

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Form>
    </Jumbotron>
  );
};
