import type { RefObject } from "react";
import useEventListener from "./hooks/useEventListener.js";

export default function useEventOutside(
    ref: RefObject<HTMLElement | null>,
    eventName: string,
    handler: () => void,
): void {
    const checkIt = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target as Node | null)) {
            handler();
        }
    };
    useEventListener(eventName, checkIt);
}
