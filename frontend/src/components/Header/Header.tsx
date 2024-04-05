import { useNavigate } from 'react-router-dom';

import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';

import * as S from './HeaderStyle';

const Header = () => {
  const navigate = useNavigate();
  return (
    <S.HeaderContainer>
      <S.BackButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoIosArrowRoundBack color="white" size={40} />
      </S.BackButton>
      <S.LogoBox>Dear</S.LogoBox>
      <S.HomeButton to={`/`}>
        <IoHomeOutline color="white" size={25} />
      </S.HomeButton>
    </S.HeaderContainer>
  );
};
export default Header;
