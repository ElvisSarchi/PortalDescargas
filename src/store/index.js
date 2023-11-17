import { create } from "zustand";

export const useStoreDocuments = create( (set) => ({
  theme: localStorage.getItem("theme") || "light",
  user: JSON.parse(localStorage.getItem("user")) || {},
  toggleTheme: (e) => {
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" }));
    localStorage.setItem("theme", e.target.checked ? "dark" : "light");
    if (e.target.checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
  setUser: (user) => {
    set(() => ({ user: user }));
    localStorage.setItem("user", JSON.stringify(user));
  },
  documents: [],
  setDocuments: (documents) => set(() => ({ documents: documents })),
}));


