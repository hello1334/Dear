import { create } from 'zustand';

interface LetterData {
  dear: string;
  dearNickname: string;
  from: string;
  background: string;
  emotion: string;
  characteristics: string[];
  memories: string[];
  options: string[];
  [key: string]: string | string[] | undefined;
}
interface LetterDecoData {
  image: number;
  stamp: number;
  font: number;
  fontName: string;
  stampImage: File | null;
}

interface LetterDataInfo {
  letter: LetterData;
  letterText: string;
  letterDeco: LetterDecoData;
  setLetter: (update: Partial<LetterData>) => void;
  setLetterText: (text: string) => void;
  setLetterDeco: (update: Partial<LetterDecoData>) => void;
  resetLetter: () => void;
}
const useLetterStore = create<LetterDataInfo>((set) => ({
  letter: {
    dear: '',
    dearNickname: '',
    from: '',
    background: '',
    emotion: '',
    characteristics: [''],
    memories: [''],
    options: [''],
  },
  letterText: '',
  letterDeco: {
    image: 0,
    stamp: -1,
    font: 0,
    fontName: 'Noto Sans KR',
    stampImage: null,
  },
  setLetter: (update) => set((state) => ({ letter: { ...state.letter, ...update } })),
  setLetterText: (text: string) => set({ letterText: text }),
  setLetterDeco: (update) => set((state) => ({ letterDeco: { ...state.letterDeco, ...update } })),
  resetLetter: () =>
    set({
      letter: {
        dear: '',
        dearNickname: '',
        from: '',
        background: '',
        emotion: '',
        characteristics: [''],
        memories: [''],
        options: [''],
      },
      letterText: '',
      letterDeco: {
        image: 0,
        stamp: -1,
        font: 0,
        fontName: 'Noto Sans KR',
        stampImage: null,
      },
    }),
}));

export default useLetterStore;
