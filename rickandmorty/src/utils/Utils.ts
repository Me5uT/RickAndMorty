/* eslint-disable @typescript-eslint/no-explicit-any */
export const API_URL = "https://rickandmortyapi.com/api";

export const getPageOnUrl = (url: string): number => {
  // URL'den parametreleri al
  const urlParams = new URLSearchParams(new URL(url).search);

  // "page" parametresini al
  return Number(urlParams.get("page"));
};
