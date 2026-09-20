// Type-level checks, verified by `npm run typecheck` (never executed).
import { useRef } from "react";
import useEventOutside from "../src/index";

export function Component() {
    const ref = useRef<HTMLDivElement>(null);

    // handler without parameters is still fine
    useEventOutside(ref, "mousedown", () => {});

    // known event names give a typed event
    useEventOutside(ref, "mousedown", (event) => {
        const x: number = event.clientX;
        return x;
    });
    useEventOutside(ref, "keydown", (event) => {
        const key: string = event.key;
        return key;
    });

    // unknown event names fall back to Event
    useEventOutside(ref, "my-custom-event", (event: Event) => event.type);

    // @ts-expect-error handler must be a function
    useEventOutside(ref, "mousedown", 123);

    // @ts-expect-error a known event name cannot get a handler for another event type
    useEventOutside(ref, "mousedown", (event: KeyboardEvent) => event.key);
}
