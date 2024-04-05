// MainMenu.tsx

import CartIcon from '@/assets/icons/cart.svg';
import EmoIcon from '@/assets/icons/emo.svg';
import LetterIcon from '@/assets/icons/letter.svg';
import PenIcon from '@/assets/icons/pen.svg';
import SettingIcon from '@/assets/icons/setting.svg';
import LoadingStore from '@/store/loadingStore';

import * as S from '@/pages/MainMenu/indexStyle';

const MainMenu = () => {
  const setModelLoaded = LoadingStore((state) => state.setModelLoaded);
  setModelLoaded(false);
  return (
    <S.MenuWrapper>
      <S.TopMenuItem to={`/letter`}>
        <S.Label>WRITE LETTER</S.Label>
        <S.SmallLabel>소중한 사람에게 추억이 담긴 나만의 편지를 만들어 볼까요?</S.SmallLabel>
        <S.TopIcon src={LetterIcon}></S.TopIcon>
      </S.TopMenuItem>
      <S.MenuItem to={`/fonts`}>
        <S.Label>FONTS</S.Label>
        <S.SmallLabel>폰트를 확인해 보세요!</S.SmallLabel>
        <S.Icon src={PenIcon}></S.Icon>
      </S.MenuItem>
      <S.MenuItem to={`/market`}>
        <S.Label>STAMPS</S.Label>
        <S.SmallLabel>우표들을 마켓에 판매해 보세요!</S.SmallLabel>
        <S.Icon src={CartIcon}></S.Icon>
      </S.MenuItem>
      <S.MenuItem to={`/friend`}>
        {/* <S.NewTag>NEW</S.NewTag> */}
        <S.Label>FRIENDS</S.Label>
        <S.SmallLabel>DEAR에서 친구를 찾아 보세요!</S.SmallLabel>
        <S.Icon src={EmoIcon}></S.Icon>
      </S.MenuItem>
      <S.MenuItem to={`/mypage`}>
        <S.Label>MY PAGE</S.Label>
        <S.SmallLabel>나의 정보를 확인할 수 있어요!</S.SmallLabel>
        <S.Icon src={SettingIcon}></S.Icon>
      </S.MenuItem>
    </S.MenuWrapper>
  );
};

export default MainMenu;
