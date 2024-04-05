declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.mid' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  import React from 'react';
  const src: string;
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default src;
}
