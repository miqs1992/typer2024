const firstMatchStart = new Date(
  process.env.FIRST_MATCH_START ?? "2024-06-14T19:00:00.000Z",
);

export const isBeforeFirstMatch = () => {
  return new Date() < firstMatchStart;
};
