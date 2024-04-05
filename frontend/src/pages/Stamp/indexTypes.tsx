export interface FakeStampResponse {
  code: number;
  message: string;
  data: FakeStampData;
}
export interface FakeStampData {
  dear: string;
  from: string;
  musicUrl: string;
  musicTitle: string;
  letterUrl: string;
  createAt: string;
}
