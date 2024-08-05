export const getInitialMessage = (userName) => {
  const defaultMessage = `Hi ${
    userName ? userName : ""
  }, how are you? you can ask anything about Vinay.`;

  return defaultMessage;
};
