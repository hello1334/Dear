import FontList from '@/components/FontList/FontList';

import * as S from './indexStyle';

// #안읽은 메일
const Font = () => {
  return (
    <S.Container>
      <S.HeadText>폰트를 확인해 보세요!</S.HeadText>
      <S.FontContainer>
        <FontList />
      </S.FontContainer>
    </S.Container>
  );
};

export default Font;
