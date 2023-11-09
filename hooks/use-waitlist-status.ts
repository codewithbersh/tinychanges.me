import { create } from "zustand";

interface UseWaitlistStatusState {
  isSuccess: boolean;
  onSuccess: () => void;
}

export const useWaitlistStatus = create<UseWaitlistStatusState>((set) => ({
  isSuccess: false,
  onSuccess: () => set({ isSuccess: true }),
}));
