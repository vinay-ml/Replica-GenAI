const gptPrompt = (context, query) => {
  return `
    Context: ${context}

    User: ${query}

    Vinay:
  `;
};

export default gptPrompt;
