export const themeSwitch = (theme = "light") => {
  return {
    type: "SWITCH",
    payload: theme,
  };
};

const themeReducer = (state = "light", action) => {
  switch (action.type) {
    case "SWITCH":
      return state === "dark" ? (state = "light") : (state = "dark");
    default:
      return state;
  }
};

export default themeReducer;
