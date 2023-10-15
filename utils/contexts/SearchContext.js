import React from "react";
import { useRouter } from "next/router";

const SearchContext = React.createContext();
const { Provider } = SearchContext;

const SearchProvider = ({ children }) => {
  const [searchAnnouncementState, setSearchAnnouncementState] = React.useState({
    nazwa: "",
    kategoria: 0,
    umowa: [],
    min_wynagrodzenie: null,
    max_wynagrodzenie: null,
    typ_wynagrodzenia: 0,
    czas_pracy: [],
    typ_pracy: [],
  });

  const [searchCompaniesState, setSearchCompaniesState] = React.useState({
    nazwa: "",
    województwo: 0,
    krs: "",
    nip: "",
  });

  return (
    <Provider
      value={{
        searchAnnouncementState: searchAnnouncementState,
        setSearchAnnouncementState: (newValues) => {
          setSearchAnnouncementState((prevSearchInfo) => ({
            ...prevSearchInfo,
            ...newValues,
          }));
        },
        searchCompaniesState: searchCompaniesState,
        setSearchCompaniesState: (newValues) => {
          setSearchCompaniesState((prevSearchInfo) => ({
            ...prevSearchInfo,
            ...newValues,
          }));
        },
      }}
    >
      {children}
    </Provider>
  );
};

export { SearchContext, SearchProvider };
