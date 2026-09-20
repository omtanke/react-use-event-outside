import type { RefObject } from "react";
import useEventListener from "./hooks/useEventListener.js";

export default function useEventOutside<K extends keyof WindowEventMap>(
    ref: RefObject<HTMLElement | null>,
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
): void;
export default function useEventOutside(
    ref: RefObject<HTMLElement | null>,
    eventName: string,
    handler: (event: Event) => void,
): void;
export default function useEventOutside(
    ref: RefObject<HTMLElement | null>,
    eventName: string,
    handler: (event: any) => void,
): void {
    const checkIt = (event: Event) => {
        const element = ref.current;
        if (!element) return;
        // composedPath() sees through shadow DOM boundaries, where event.target is retargeted
        const path = event.composedPath();
        const isInside = path.length > 0
            ? path.includes(element)
            : element.contains(event.target as Node | null);
        if (!isInside) {
            handler(event);
        }
    };
    useEventListener(eventName, checkIt);
}
