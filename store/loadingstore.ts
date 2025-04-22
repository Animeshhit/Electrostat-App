import { create } from "zustand";

interface LoadingType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const useLoading = create<LoadingType>((set) => ({
  loading: true,
  setLoading: (value) =>
    set((state) => ({
      loading: value,
    })),
}));

export default useLoading;
