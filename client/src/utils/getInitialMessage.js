import Fuse from "fuse.js";

export const getInitialMessage = (userName) => {
  if (!userName) return "Hi";

  const messages = [
    {
      names: [
        "Baby",
        "Baby Singh",
        "Chandrima",
        "Deepankar",
        "Jammu",
        "Mukesh",
        "Nisha",
        "Nisha Bharadwaj",
        "Saurabh",
        "Rushali",
        "Deepika",
        "Simi",
        "Rusali",
        "Rushali Raina",
        "Silar",
        "Tara",
        "Tara Prasad",
        "Shilpi",
      ],
      message: `Hi ${userName}, aap kaise hain ?`,
    },
    {
      names: ["Manju", "Manjunadha"],
      message: `Hi ${userName}, Nivu hegiddari ?`,
    },
    {
      names: ["Gowri", "Gowrishankar", "Madhan", "Vaira", "Vaira Murthi"],
      message: `Hi ${userName}, Eppati irukkirirkal ?`,
    },
    {
      names: ["Greg", "Gergary Meehan"],
      message: `Hi ${userName}, how are you ?`,
    },
    {
      names: ["Kshripa", "Kshipra"],
      message: `Hi ${userName}, Tu kasa ahesa?`,
    },
  ];

  const fuseOptions = {
    includeScore: true,
    threshold: 0.3, // Adjust the threshold as needed
    keys: ["names"],
  };

  const fuse = new Fuse(messages, fuseOptions);
  const result = fuse.search(userName);

  if (result.length > 0) {
    return result[0].item.message;
  }

  return `Hi ${userName}, ala vunnav ?`;
};
