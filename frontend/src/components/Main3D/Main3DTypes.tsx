export type ModelProps = {
  type: string;
  mtlPath: string;
  objPath: string;
  position: [number, number, number];
  rotationY: number;
  onClick: () => void;
};

export type StampProps = {
  stamp: string;
  dear: string;
  from: string;
  letterId: number;
  letter: string;
  createAt: string;
};
