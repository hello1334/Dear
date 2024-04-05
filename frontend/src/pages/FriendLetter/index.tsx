import * as S from '@/pages/FriendLetter/indexStyle';

import DearComponent from '@/components/Friend/DearComponent';
import TextFontBox from '@/components/TextFontBox/TextFontBox';
const Friend = () => {
  return (
    <S.Container>
      <S.TabsContainer>
        <TextFontBox text="DEAR LIST" />
      </S.TabsContainer>
      <DearComponent />
    </S.Container>
  );
};

export default Friend;
