interface LetterData {
  dear: string;
  from: string;
  background: string;
  emotion: string;
  characteristics: string[];
  memories: string[];
  options: string[];
  [key: string]: string | string[] | undefined;
}
