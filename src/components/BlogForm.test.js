import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event/";
import BlogForm from "./BlogForm";

test("the form calls the event handler with the right details when a new blog is created", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Michael Chan",
    url: "http://www.u.arizona.edu/",
  };
  const createBlog = jest.fn();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const titleInput = container.querySelector("#title");
  await userEvent.type(titleInput, newBlog.title);

  const authorInput = container.querySelector("#author");
  await userEvent.type(authorInput, newBlog.author);

  const urlInput = container.querySelector("#url");
  await userEvent.type(urlInput, newBlog.url);

  const createButton = screen.getByText("create");
  await userEvent.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual(newBlog);
});
