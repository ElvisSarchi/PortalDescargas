import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStoreDocs = create(
  persist(
    (set) => ({
      docs: [],
      setDocs: (docs) => set((state) => ({ docs })),
    }),
    {
      name: "docs-storage", // unique name
      storage: createJSONStorage(()=> sessionStorage),
    }
  )
);

export default useStoreDocs;
