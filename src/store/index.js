import { create } from "zustand";

export const useStoreDocuments = create((set) => ({
  //theme: localStorage.getItem("theme") || "light",
  theme: "light",
  user: {},
  toggleTheme: (e) => {
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" }));
    if (e.target.checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
  setTheme: (theme) => {
    set(() => ({ theme: theme }));
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
  setUser: (user) => {
    set(() => ({ user: user }));
  },
  documents: [],
  setDocuments: (documents) => set(() => ({ documents: documents })),
}));
