import { create } from "zustand";

interface AdminNavStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAdminNav = create<AdminNavStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAdminNav;
