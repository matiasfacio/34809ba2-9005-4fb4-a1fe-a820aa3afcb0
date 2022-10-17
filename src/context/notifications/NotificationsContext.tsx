import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import "./notifications.css";
import uuid from "react-uuid";

interface Notifications {
  notify: (arg: string) => void;
}
const NotificationContext = createContext({} as Notifications);

interface NotificationProps {
  text: string;
  id: string;
}

export const NotificationsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const notify = (text: string) => {
    setNotifications((prev) => [...prev, { text: text, id: uuid() }]);
  };

  const destroy = (id: string) => {
    setNotifications((prev) => {
      const filteredNotifications = prev.filter((n) => n.id !== id);
      return filteredNotifications;
    });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      <div className="notifications">
        {notifications.map((notification) => (
          <Notification
            notification={notification}
            key={notification.id}
            close={() => destroy(notification.id)}
          />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

const Notification = ({
  notification,
  close,
}: {
  notification: NotificationProps;
  close: () => void;
}) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      close();
    }, 3000);

    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bgColorCollection = [
    "rgb(162, 90, 59)",
    "rgb(212, 142, 112)",
    "rgb(104, 70, 56)",
    "rgb(156, 57, 14)",
  ];
  const getRandom =
    bgColorCollection[Math.floor(Math.random() * bgColorCollection.length)];

  return (
    <div className="notification" style={{ backgroundColor: getRandom }}>
      {notification.text}
    </div>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "use this hook within the scope of the Notification Context Provider"
    );
  }
  return context;
};
