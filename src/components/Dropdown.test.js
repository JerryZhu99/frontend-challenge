import { render, screen, waitFor } from "@testing-library/react";
import Dropdown from "./Dropdown";

test("it should open the dropdown on click", async () => {
  const mock = jest.fn();
  render(
    <Dropdown
      placeholder={"placeholder"}
      options={["apple", "banana", "cherry"]}
      onChange={mock}
      value={undefined}
    />
  );
  await waitFor(() => screen.getByText(/placeholder/i).click());
  expect(screen.getByText(/apple/i)).toBeInTheDocument();
  expect(screen.getByText(/banana/i)).toBeInTheDocument();
  expect(screen.getByText(/cherry/i)).toBeInTheDocument();
});

test("it should trigger the onChange event on option click", async () => {
  const mock = jest.fn();
  render(
    <Dropdown
      placeholder={"placeholder"}
      options={["apple", "banana", "cherry"]}
      onChange={mock}
      value={undefined}
    />
  );
  await waitFor(() => screen.getByText(/placeholder/i).click());
  await waitFor(() => screen.getByText(/apple/i).click());
  expect(mock).toBeCalledTimes(1);
  expect(mock).toBeCalledWith("apple");
});

test("it should accept objects for options", async () => {
  const mock = jest.fn();
  render(
    <Dropdown
      placeholder={"placeholder"}
      options={[{value: 1, label: "apple"}, {value: 2, label: "banana"},{value: 3, label: "cherry"}]}
      onChange={mock}
      value={undefined}
    />
  );
  await waitFor(() => screen.getByText(/placeholder/i).click());
  expect(screen.getByText(/apple/i)).toBeInTheDocument();
  expect(screen.getByText(/banana/i)).toBeInTheDocument();
  expect(screen.getByText(/cherry/i)).toBeInTheDocument();

  await waitFor(() => screen.getByText(/apple/i).click());
  expect(mock).toBeCalledTimes(1);
  expect(mock).toBeCalledWith(1);
});

test("it should clear the selection if None is pressed", async () => {
  const mock = jest.fn();
  render(
    <Dropdown
      placeholder={"placeholder"}
      options={["apple", "banana", "cherry"]}
      onChange={mock}
      value={"apple"}
    />
  );
  await waitFor(() => screen.getByText(/apple/i).click());
  await waitFor(() => screen.getByText(/none/i).click());
  expect(mock).toBeCalledTimes(1);
  expect(mock).toBeCalledWith(undefined);
});

test("it should show the current selection", async () => {
  const mock = jest.fn();
  render(
    <Dropdown
      placeholder={"placeholder"}
      options={["apple", "banana", "cherry"]}
      onChange={mock}
      value={"apple"}
    />
  );
  expect(screen.getByText(/apple/i)).toBeInTheDocument();
});

test("it should call onChange with an array for multiple options", async () => {
  const mock = jest.fn();
  render(
    <Dropdown
      placeholder={"placeholder"}
      options={["apple", "banana", "cherry"]}
      onChange={mock}
      value={[]}
      multiple
    />
  );
  await waitFor(() => screen.getByText(/placeholder/i).click());
  await waitFor(() => screen.getByText(/apple/i).click());
  expect(mock).toBeCalledTimes(1);
  expect(mock).toBeCalledWith(["apple"]);
});

test("it should show the current selection for multiple options", async () => {
  const mock = jest.fn();
  render(
    <Dropdown
      placeholder={"placeholder"}
      options={["apple", "banana", "cherry"]}
      onChange={mock}
      value={["apple", "banana"]}
      multiple
    />
  );
  expect(screen.getByText(/apple, banana/i)).toBeInTheDocument();
});

test("it should add to the existing selection for multiple options", async () => {
  const mock = jest.fn();
  render(
    <Dropdown
      placeholder={"placeholder"}
      options={["apple", "banana", "cherry"]}
      onChange={mock}
      value={["apple"]}
      multiple
    />
  );
  await waitFor(() => screen.getByText(/apple/i).click());
  await waitFor(() => screen.getByText(/banana/i).click());
  expect(mock).toBeCalledTimes(1);
  expect(mock).toBeCalledWith(["apple", "banana"]);
});

test("it should remove from the existing selection for multiple options", async () => {
  const mock = jest.fn();
  render(
    <Dropdown
      placeholder={"placeholder"}
      options={["apple", "banana", "cherry"]}
      onChange={mock}
      value={["apple"]}
      multiple
    />
  );
  await waitFor(() => screen.getByText(/apple/i).click());
  await waitFor(() => screen.getAllByText(/apple/i)[1].click());
  expect(mock).toBeCalledTimes(1);
  expect(mock).toBeCalledWith([]);
});

test("it should select all for multiple options when select all is pressed", async () => {
  const mock = jest.fn();
  render(
    <Dropdown
      placeholder={"placeholder"}
      options={["apple", "banana", "cherry"]}
      onChange={mock}
      value={["apple"]}
      multiple
    />
  );
  await waitFor(() => screen.getByText(/apple/i).click());
  await waitFor(() => screen.getByText(/select all/i).click());
  expect(mock).toBeCalledTimes(1);
  expect(mock).toBeCalledWith(["apple", "banana", "cherry"]);
});

test("it should clear all for multiple options when select all is pressed again", async () => {
  const mock = jest.fn();
  render(
    <Dropdown
      placeholder={"placeholder"}
      options={["apple", "banana", "cherry"]}
      onChange={mock}
      value={["apple", "banana", "cherry"]}
      multiple
    />
  );
  await waitFor(() => screen.getByText(/apple/i).click());
  await waitFor(() => screen.getByText(/select all/i).click());
  expect(mock).toBeCalledTimes(1);
  expect(mock).toBeCalledWith([]);
});
