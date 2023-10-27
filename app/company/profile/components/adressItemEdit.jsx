export const adressItemEdit = (value, place) => {
  if (place === "street")
    return {
      header: "Edytuj nazwę ulicy",
      placeholder: "Wpisz nazwę ulicy",
      defaultValue: value,
      validaitionRules: {
        required: "Ulica jest wymagana.",
        maxLength: {
          value: 30,
          message: "Podana ulica jest zbyt długia.",
        },
        pattern: {
          value: /^[a-zA-Z0-9Ą-ŻĄąĆćĘęŁłŃńÓóŚśŹźŻż. _-]{1,}$/,
          message: "Nieprawidłowa nazwa.",
        },
      },
      place: "street",
    };
  else if (place === "post_code")
    return {
      header: "Edytuj kod pocztowy",
      placeholder: "Wpisz kod pocztowy",
      defaultValue: value,
      validaitionRules: {
        required: "Kod pocztowy jest wymagany.",
        maxLength: {
          value: 6,
          message: "Podany kod pocztowy jest zbyt długi.",
        },
        pattern: {
          value: /\d{2}-\d{3}/,
          message: "Proszę podać kod pocztowy w formacie XX-XXX.",
        },
      },
      place: "post_code",
    };
  else if (place === "city")
    return {
      header: "Edytuj miasto",
      placeholder: "Wpisz miasto",
      defaultValue: value === null ? "" : value,
      validaitionRules: {
        required: "Miasto jest wymagane.",
        maxLength: {
          value: 30,
          message: "Podana miasto jest zbyt długie.",
        },
        pattern: {
          value: /^[a-zA-ZĄ-ŻĄąĆćĘęŁłŃńÓóŚśŹźŻż _-]{1,}$/,
          message: "Niepoprawne miasto.",
        },
      },
      place: "city",
    };
  else if (place === "phone_number")
    return {
      header: "Edytuj numer telefonu",
      placeholder: "Wpisz numer telefonu",
      defaultValue: value,
      validaitionRules: {
        required: "Numer telefony jest wymagany.",
        maxLength: {
          value: 9,
          message: "Podany numer telefonu jest zbyt długi.",
        },
        pattern: {
          value: /^[0-9]{9,9}$/,
          message: "Niepoprawny numer telefonu.",
        },
      },
      place: "phone_number",
    };
  else if (place === "contact_email")
    return {
      header: "Edytuj e-mail kontaktowy",
      placeholder: "Wpisz e-mail kontaktowy",
      defaultValue: value,
      validaitionRules: {
        required: "Adres jest wymagany.",
        maxLength: {
          value: 30,
          message: "Adres email jest zbyt długi.",
        },
        pattern: {
          value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
          message: "Nieprawidłowy adres email.",
        },
      },
      place: "contact_email",
    };
  else if (place === "krs")
    return {
      header: "Edytuj numer KRS",
      placeholder: "Wpisz numer KRS",
      defaultValue: value,
      validaitionRules: {
        maxLength: {
          value: 10,
          message: "Podany KRS jest zbyt długi.",
        },
        pattern: {
          value: /^$|^[0-9]{10}$/,
          message: "Niepoprawny numer KRS.",
        },
      },
      place: "krs",
    };
  else if (place === "nip")
    return {
      header: "Edytuj numer NIP",
      placeholder: "Wpisz numer NIP",
      defaultValue: value,
      validaitionRules: {
        required: "Adres jest wymagany.",
        maxLength: {
          value: 10,
          message: "Podany numer NIP jest zbyt długi.",
        },
        pattern: {
          value: /^[0-9]{10,11}$/,
          message: "Niepoprawny numer NIP.",
        },
      },
      place: "nip",
    };
  else if (place === "localization") return value;
};
