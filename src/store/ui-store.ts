import { create } from 'zustand';

interface UIState {
  showSnackbar: boolean;
  description: string | null;
  icon: React.ReactNode | null;
  action: string;
  showAction: boolean;
  onClickAction: (() => void) | null;
  closeButton: boolean;
  fullWidth: boolean;
  mode: 'light' | 'dark';
  location: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  timer: number;
  openSnackbar: (config: Partial<Omit<UIState, 'showSnackbar'>>) => void;
  closeSnackbar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  showSnackbar: false,
  description: null,
  icon: null,
  action: 'Action',
  showAction: false,
  onClickAction: null,
  closeButton: true,
  fullWidth: false,
  mode: 'light',
  location: 'bottom-left',
  timer: 5,

  openSnackbar: (config) =>
    set((state) => ({
      ...state,
      showSnackbar: true,
      ...config,
    })),
  closeSnackbar: () => set({ showSnackbar: false }),
}));
