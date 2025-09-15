import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// extends Vitest's expect with Jest DOM matchers
expect.extend(matchers);

// cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup();
});
