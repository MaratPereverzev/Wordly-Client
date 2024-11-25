const addEventListener = (
  eventName: string,
  callback: (params: any) => void,
  target = document
): (() => void) => {
  if (typeof eventName !== "string")
    throw new Error("event props are inappropriate");

  target.addEventListener(eventName, callback);

  return () => target.removeEventListener(eventName, callback);
};

const dispatchEvent = (
  eventName: string,
  data: { [index: string]: any },
  target = document
): void => {
  if (typeof eventName !== "string")
    throw new Error("event props are inappropriate");

  const event = new CustomEvent(eventName, { detail: data });
  target.dispatchEvent(event);
};

export { addEventListener, dispatchEvent };
