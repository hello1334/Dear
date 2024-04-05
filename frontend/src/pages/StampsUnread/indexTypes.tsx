export interface FakeUnReadStampsResponse {
  code: number;
  message: string;
  data: {
    stamps: FakeUnReadStamp[];
  };
}

export interface FakeUnReadStamp {
  stamp: string;
  dear: string;
  from: string;
  music: string;
  musicTitle: string;
  letterId: number;
  letter: string;
  createAt: string;
}
