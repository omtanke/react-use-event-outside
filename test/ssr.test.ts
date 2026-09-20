// @vitest-environment node
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import useEventOutside from "../src/index";

describe("server-side rendering", () => {
    it("renders without window being defined", () => {
        expect(typeof window).toBe("undefined");

        const Component = () => {
            useEventOutside({ current: null }, "mousedown", () => {});
            return createElement("div", null, "ok");
        };

        expect(renderToString(createElement(Component))).toContain("ok");
    });
});
