export const getInitialMessage = (userName) => {
  const defaultMessage = `Hi ${
    userName ? userName : ""
  }, This is Vinay.. you can ask anything about me.`;

  return defaultMessage;
};
