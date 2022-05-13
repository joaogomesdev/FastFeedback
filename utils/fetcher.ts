export const fetcher = async (apiURL: string) => {
  const res = await fetch(apiURL);
  return res.json();
};
