import { create } from 'zustand';

interface LetterUrlState {
  letterUrls: string;
  letterId?: number;
  setLetterUrls: (letterUrls: string, letterId?: number) => void;
}

export const useLetterUrlStore = create<LetterUrlState>((set) => ({
  letterUrls: '',
  letterId: undefined,
  setLetterUrls: (letterUrls, letterId) => {
    set({ letterUrls, letterId });
    // 상태 업데이트 시 로컬 스토리지에 저장
    localStorage.setItem('letterUrlState', JSON.stringify({ letterUrls, letterId }));
  },
}));
