import { create } from 'zustand';

const useThemeStore = create((set) => ({

  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setTheme: (theme) => set({ theme }),
  
 
}));

export default useThemeStore;
