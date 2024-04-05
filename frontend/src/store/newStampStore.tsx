import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Stamp = {
  stamp: string;
  dear: string;
  from: string;
  letterId: number;
  letter: string;
  music: string;
  musicTitle: string;
  createAt: string;
};

interface Store {
  stamps: Stamp[];
  setStamp: (stamp: Stamp) => void;
}

const useStore = create(
  persist<Store>(
    (set) => ({
      stamps: [],
      setStamp: (stamp) => {
        set((state) => {
          return {
            ...state,
            stamps: [...state.stamps, stamp],
          };
        });
      },
    }),
    {
      name: 'newStamp-state',
    },
  ),
);

export default useStore;
