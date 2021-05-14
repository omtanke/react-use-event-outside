import useEventListener from "./hooks/useEventListener";

export default function useEventOutside(ref, eventName, handler) {
    const checkIt = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            handler();
        }
    };
    useEventListener(eventName, checkIt);
}
