import { create } from "zustand";

interface ApMode {
  url: string;
  setUrl: (value: string) => void;
}

const useApString = create<ApMode>((set) => ({
  url: "",
  setUrl: (newvalue) => set({ url: newvalue }),
}));

export default useApString;
