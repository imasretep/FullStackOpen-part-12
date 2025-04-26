/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("Content rendered", () => {
  const todo = {
    text: "I should really do more testing.",
    done: false,
  };

  render(<Todo todo={todo} />);

  const element = screen.getByText("I should really do more testing.", {
    selector: "span",
  });
  expect(element).toBeDefined();
});
