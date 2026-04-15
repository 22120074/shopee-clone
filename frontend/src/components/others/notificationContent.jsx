import clsx from "clsx";
import { useMemo } from "react";
import {
  getHeaderNotification,
  getContentNotification,
} from "../../utils/notification";

export default function NotificationContent({ notification }) {
  const parsedContent = useMemo(() => {
    return JSON.parse(notification.content);
  }, [notification.content]);

  return (
    <div className={clsx("flex flex-col gap-1")}>
      <h3 className={clsx("font-normal text-black text-base leading-tight")}>
        {getHeaderNotification(notification.type)}
      </h3>
      <p>{getContentNotification(notification.type, parsedContent)}</p>
    </div>
  );
}
