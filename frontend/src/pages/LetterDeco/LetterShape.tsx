import styled from 'styled-components';

const LetterShapeSizeContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
`;
const LetterShapeImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
`;
type LetterShapeProps = {
  children: React.ReactNode;
  shapes: string[];
  type: number;
};

const LetterShape = ({ children, shapes, type }: LetterShapeProps) => {
  return (
    <>
      <LetterShapeSizeContainer>
        <LetterShapeImg src={shapes[type]}></LetterShapeImg>
        {children}
      </LetterShapeSizeContainer>
    </>
  );
};

export default LetterShape;
