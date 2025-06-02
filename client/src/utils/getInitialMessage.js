export const getInitialMessage = (userName) => {
  const defaultMessage = `Hi ${
    userName ? userName : ""
  }, This is Vinay... do you want to know about my job, company, or what I do? Feel free to ask!`;

  return defaultMessage;
};
