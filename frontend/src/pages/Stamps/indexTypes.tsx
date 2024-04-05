export interface FakeStampsResponse {
  code: number;
  message: string;
  data: FakeStampsData;
}

export interface FakeStampsData {
  unReadLettersCnt: number;
  stamps: Stamp[];
}

export interface Stamp {
  stampId: number;
  image: string;
}
