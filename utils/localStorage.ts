export const loadHistory = () => {
  try {
    const serializedHistory = localStorage.getItem("transactions");
    if (serializedHistory === null) return undefined;
    return JSON.parse(serializedHistory);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return undefined;
  }
};
