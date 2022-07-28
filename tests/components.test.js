import { render, cleanup } from "@testing-library/react";

function snapshotTest(component) {
  return expect(render(component).container.firstChild).toMatchSnapshot();
}

afterEach(cleanup);

it("tests", () => {
  expect(true).toBeTruthy();
});
