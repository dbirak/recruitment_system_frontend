export const setColorBackground = (columnName) => {
  if (columnName === "Brak odpowiedzi") return "primary";
  else if (columnName === "Nowe aplikacje") return "primary";
  else if (columnName === "Zaakceptowani") return "green-600";
  else if (columnName === "Odrzuceni") return "[#dc2626]";
};

export const setColorText = (columnName) => {
  if (columnName === "Brak odpowiedzi") return "primary";
  else if (columnName === "Nowe aplikacje") return "neutral";
  else if (columnName === "Zaakceptowani") return "green-900";
  else if (columnName === "Odrzuceni") return "red-900";
};

export const setColorBackroundItem = (columnName) => {
  if (columnName === "Brak odpowiedzi") return "primary";
  else if (columnName === "Nowe aplikacje") return "base-200";
  else if (columnName === "Zaakceptowani") return "primary";
  else if (columnName === "Odrzuceni") return "red-400";
};
