import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, renderHook } from "@testing-library/react";
import useEventOutside from "../src/index";

afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
});

function setup() {
    const inside = document.createElement("div");
    const child = document.createElement("span");
    const outside = document.createElement("div");
    inside.appendChild(child);
    document.body.append(inside, outside);
    return { inside, child, outside, ref: { current: inside } };
}

const mouseDown = (target: EventTarget) =>
    target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, composed: true }));

describe("useEventOutside", () => {
    it("calls the handler with the event when the event happens outside", () => {
        const { ref, outside } = setup();
        const handler = vi.fn();
        renderHook(() => useEventOutside(ref, "mousedown", handler));

        mouseDown(outside);

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    });

    it("does not call the handler for events on the element or its children", () => {
        const { ref, inside, child } = setup();
        const handler = vi.fn();
        renderHook(() => useEventOutside(ref, "mousedown", handler));

        mouseDown(inside);
        mouseDown(child);

        expect(handler).not.toHaveBeenCalled();
    });

    it("does not call the handler when the ref is empty", () => {
        const { outside } = setup();
        const handler = vi.fn();
        renderHook(() => useEventOutside({ current: null }, "mousedown", handler));

        mouseDown(outside);

        expect(handler).not.toHaveBeenCalled();
    });

    it("always calls the latest handler without re-subscribing", () => {
        const { ref, outside } = setup();
        const first = vi.fn();
        const second = vi.fn();
        const { rerender } = renderHook(
            ({ handler }) => useEventOutside(ref, "mousedown", handler),
            { initialProps: { handler: first } },
        );

        rerender({ handler: second });
        mouseDown(outside);

        expect(first).not.toHaveBeenCalled();
        expect(second).toHaveBeenCalledTimes(1);
    });

    it("removes the listener on unmount", () => {
        const { ref, outside } = setup();
        const handler = vi.fn();
        const { unmount } = renderHook(() => useEventOutside(ref, "mousedown", handler));

        unmount();
        mouseDown(outside);

        expect(handler).not.toHaveBeenCalled();
    });

    it("supports custom event names", () => {
        const { ref, outside } = setup();
        const handler = vi.fn();
        renderHook(() => useEventOutside(ref, "my-custom-event", handler));

        outside.dispatchEvent(new CustomEvent("my-custom-event", { bubbles: true }));

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("treats events inside a shadow root as inside the element", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const shadow = host.attachShadow({ mode: "open" });
        const innerEl = document.createElement("button");
        shadow.appendChild(innerEl);
        const handler = vi.fn();
        renderHook(() => useEventOutside({ current: innerEl }, "mousedown", handler));

        // event.target is retargeted to `host` at window level, so contains() alone would fail
        mouseDown(innerEl);

        expect(handler).not.toHaveBeenCalled();
    });
});
