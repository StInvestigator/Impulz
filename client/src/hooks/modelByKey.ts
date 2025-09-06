import type { AuthorKeys } from "../models/type/ModelKeys";
import { useAppSelector } from "./redux";

export const useAuthorsByKey = (key: AuthorKeys) => {
  return useAppSelector((state) => ({
    authors: state.author.authorsByKey[key],
    isLoading: state.author.isLoading[key],
    error: state.author.error[key],
  }));
};