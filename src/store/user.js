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
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
const useStoreUser = create(
  persist(
    (set) => ({
      user: {},
      theme: null,
      setUser: (user) => set((state) => ({ user })),
      toggleTheme: (e) => {
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" }));
        if (e.target.checked) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }),
    {
      name: "user-storage", // unique name
      storage: createJSONStorage(() => localStorage),
    }
  )
);
const useStoreTheme = create((set) => ({
  theme: null,
  toggleTheme: (e) => {
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" }));
    if (e.target.checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
}));

export { useStoreDocs, useStoreUser, useStoreTheme };
