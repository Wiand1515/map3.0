import { useEffect, useRef } from "react";

export const useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};
