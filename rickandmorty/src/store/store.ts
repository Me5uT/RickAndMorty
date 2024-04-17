/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { API_URL, getPageOnUrl } from "../utils/Utils";
export const useStore = create((set, get: any) => ({
  loading: false,

  errorMessage: "",

  query: "",

  totalCount: 0,

  currentPage: 1,

  characters: [],

  setLoading: (isLoading: boolean) =>
    set((state: any) => ({ ...state, loading: isLoading })),

  searchCharacter: (name: string) => {
    fetch(`${API_URL}/character/?name=${name}&page=${1}`)
      .then((response) => response.json())
      .then((v) => {
        if (v.error) {
          return set((state: any) => ({
            ...state,
            errorMessage: v.error,
            characters: [],
            totalCount: 0,
            currentPage: 1,
          }));
        } else {
          return set((state: any) => ({
            ...state,
            errorMessage: "",
            query: name,
            characters: v.results,
            totalCount: v.info?.count,
          }));
        }
      });
  },

  loadMore: (page: number) => {
    fetch(`${API_URL}/character/?name=${get().query}&page=${page}`)
      .then((response) => response.json())
      .then((v) => {
        if (v.error) {
          return set((state: any) => ({
            ...state,
            errorMessage: v.error,
            characters: [],
            totalCount: 0,
            currentPage: 1,
          }));
        } else {
          return set((state: any) => ({
            ...state,
            characters: [...state.characters, ...v.results],
            currentPage:
              v.info?.prev === null ? 1 : getPageOnUrl(v.info.prev) + 1,
          }));
        }
      });
  },
}));
