// Stamp의 메타 데이터를 다루는 타입
export type Stamp = {
  code: number;
  message: string;
  data: StampData;
};

// 실제 Stamp 데이터를 다루는 타입
export type StampData = {
  dear: string;
  from: string;
  musicUrl: string;
  musicTitle: string;
  letterUrl: string;
  createAt: string;
};

export type MusicData = Pick<StampData, 'musicUrl'>;
