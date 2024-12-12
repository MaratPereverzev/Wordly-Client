const addEventListener = <T>(
  eventName: string,
  callback: (params: T) => void,
  target: EventTarget = document
): (() => void) => {
  if (typeof eventName !== "string") {
    throw new Error("event props are inappropriate");
  }

  const eventCallback = (event: Event): void => {
    // Проверяем, является ли событие CustomEvent
    if (event instanceof CustomEvent) {
      callback(event.detail as T); // Передаём detail в callback
    }
  };

  target.addEventListener(eventName, eventCallback as EventListener);

  return () =>
    target.removeEventListener(eventName, eventCallback as EventListener);
};

const dispatchEvent = <T>(
  eventName: string,
  data?: T,
  target?: Document
): void => {
  if (target === undefined) target = document;
  if (typeof eventName !== "string")
    throw new Error("event props are inappropriate");

  const event = new CustomEvent<T>(eventName, { detail: data });
  target.dispatchEvent(event);
};

export { addEventListener, dispatchEvent };
