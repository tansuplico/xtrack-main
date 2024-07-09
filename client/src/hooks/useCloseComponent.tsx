import { useEffect, useRef, MutableRefObject } from "react";

const useCloseComponent = (
  callback: () => void,
  toggleRef?: MutableRefObject<HTMLDivElement | null>
): MutableRefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        toggleRef?.current &&
        !toggleRef?.current.contains(event.target as Node)
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, toggleRef]);

  return ref;
};

export default useCloseComponent;
