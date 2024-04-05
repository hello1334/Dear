import styled from 'styled-components';

import useLetterStore from '@/store/letterStore';

const LetterTextWrapper = styled.div<{ $fontName: string }>`
  font-family: ${(props) => `"${props.$fontName}", sans-serif`};
  font-size: 12px;
  position: absolute;
  top: 70px;
  width: 100%;
  padding: 0 4rem;
  line-height: 1.6;
  color: #121212;
  white-space: pre-wrap;
`;
const LetterDearWrapper = styled.div`
  font-size: 2rem;
  position: absolute;
  /* text-shadow: 2px 2px 2px gray; */
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #121212;
  top: 40px;
  width: 100%;
  padding: 0 4rem;
  font-family: 'Julius Sans One', sans-serif;
`;

const LetterFromWrapper = styled.div`
  position: absolute;
  font-weight: bold;
  display: flex;
  align-items: center;
  bottom: 20px;
  right: 0px;
  color: #121212;
  padding: 0 4rem;
  font-size: 2rem;
  font-family: 'Julius Sans One', sans-serif;
`;
const LetterNameWrapper = styled.div<{ $fontName: string }>`
  font-family: ${(props) => `"${props.$fontName}", sans-serif`};
  font-size: 1.4rem;
  margin-left: 1rem;
  padding-top: 2px;
  text-shadow: none;
  color: #121212;
`;
type LetterTextProps = {
  dear: string;
  from: string;
  text: string;
};
const LetterText = ({ dear, from, text }: LetterTextProps) => {
  const [letterDeco] = useLetterStore((state) => [state.letterDeco]);
  return (
    <>
      <LetterDearWrapper>
        Dear<LetterNameWrapper $fontName={letterDeco.fontName}>{dear}</LetterNameWrapper>
      </LetterDearWrapper>
      <LetterTextWrapper $fontName={letterDeco.fontName}>{text}</LetterTextWrapper>
      <LetterFromWrapper>
        From
        <LetterNameWrapper $fontName={letterDeco.fontName}>{from}</LetterNameWrapper>
      </LetterFromWrapper>
    </>
  );
};

export default LetterText;
