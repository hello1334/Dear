// stampStore.ts
import { create } from 'zustand';

interface Stamp {
  stampId: number;
  image: string;
}

interface StampsState {
  images1: Stamp[];
  images2: Stamp[];
  setImages1: (images: Stamp[]) => void;
  setImages2: (images: Stamp[]) => void;
}

export const useImageStore = create<StampsState>((set) => ({
  images1: [],
  images2: [],
  setImages1: (images) => set({ images1: images }),
  setImages2: (images) => set({ images2: images }),
}));
