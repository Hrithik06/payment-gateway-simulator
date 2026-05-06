export const loadHistory = () => {
  try {
    const serializedHistory = localStorage.getItem("transactions");

    if (serializedHistory === null) {
      // localStorage.setItem("transactions", "");
      return undefined;
    }
    return JSON.parse(serializedHistory);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return undefined;
  }
};
