import React from "react";
import { useRouter } from "next/router";

const AdditionalContext = React.createContext();
const { Provider } = AdditionalContext;

const AdditionalProvider = ({ children }) => {
  const [additionalAnnouncementState, setAdditionalAnnouncementState] =
    React.useState({});

  return (
    <Provider
      value={{
        additionalAnnouncementState: additionalAnnouncementState,
        setAdditionalAnnouncementState: (newValues) => {
          setAdditionalAnnouncementState((prevAdditionalInfo) => ({
            ...prevAdditionalInfo,
            ...newValues,
          }));
        },
      }}
    >
      {children}
    </Provider>
  );
};

export { AdditionalContext, AdditionalProvider };
