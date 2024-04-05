import { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { HiOutlinePlusSm } from 'react-icons/hi';

import PointImg from '@/assets/images/point.png';

import { instance } from '@/api/instance';

import * as S from '@/pages/StampMarket/indexStyle';

import Loading from '@/components/Loading/Loading';
import SearchInput from '@/components/SearchInput/SearchInput';
import TextFontBox from '@/components/TextFontBox/TextFontBox';

const StampMarket = () => {
  const navigate = useNavigate();
  interface Stamp {
    id: number;
    content: string;
    price: number;
    title: string;
    url: string;
  }
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [inputValue, setInputValue] = useState('');
  const TabData = [
    { id: 1, button: '인기순', query: 'purchaseAmount' },
    { id: 2, button: '최신순', query: 'registerAt' },
    { id: 3, button: '가격순', query: 'price' },
  ];
  const [activeTab, setActiveTab] = useState(TabData[0].query);
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleKeywordChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOnClickSearch();
    }
  };
  const handleOnClickSearch = () => {
    setKeyword(inputValue);
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleonClickStamp = (stamp: Stamp) => {
    navigate('/market/detail', { state: stamp });
  };
  const handleonClickSale = () => {
    navigate('/market/sale');
  };
  const {
    data: dataStamp,
    isLoading: isLoading1,
    error: error1,
  } = useQuery<{ totalPage: number; totalSize: number; stamps: Stamp[] }>({
    queryKey: ['stampMarket', { page, activeTab, keyword }],
    queryFn: async () => {
      const response = await instance.post('/letter/sell-stamps/search', {
        page: page,
        size: 4,
        sort: activeTab,
        keyword: keyword,
      });
      return response.data.data;
    },
  });

  const {
    data: dataPoint,
    isLoading: isLoading2,
    error: error2,
  } = useQuery({
    queryKey: ['point'],
    queryFn: async () => {
      const response = await instance.get('/user/users/point');
      return response.data.data;
    },
  });

  useEffect(() => {
    if (error1) {
      console.error('Error fetching stamps:', error1);
    } else if (error2) {
      console.error('Error fetching point:', error2);
    }
  }, [error1, error2]);
  return isLoading1 || isLoading2 ? (
    <Loading />
  ) : (
    <S.PageContainer>
      <S.BoxContainer>
        <S.Blank></S.Blank>
        <TextFontBox text={'STAMP MARKET'} />
        <S.PointContainer>
          <S.PointImg src={PointImg} alt="PointImg" />
          <S.PointText $textcolor="#fff">{dataPoint.point}P</S.PointText>
        </S.PointContainer>
      </S.BoxContainer>
      <SearchInput
        value={inputValue}
        placeholder={'검색어를 입력해주세요'}
        handleInput={handleInput}
        handleOnKeyPress={handleKeywordChange}
        handleOnClick={handleOnClickSearch}
      />
      <S.TabsContainer>
        {TabData.map((tab) => (
          <S.Tab
            key={tab.id}
            color={activeTab === tab.query ? '#FDF3E7' : 'transparent'}
            $textcolor={activeTab === tab.query ? '#121212' : '#FDF3E7'}
            onClick={() => setActiveTab(tab.query)}
          >
            {tab.button}
          </S.Tab>
        ))}
      </S.TabsContainer>
      <S.StampContainer>
        {dataStamp?.stamps.map((stamp: Stamp) => (
          <S.StampWrapper key={stamp.id} onClick={() => handleonClickStamp(stamp)}>
            <S.StampImgWrapper>
              <S.StampImg src={stamp.url} alt={stamp.title} />
            </S.StampImgWrapper>
            <S.StampTitleWrapper>
              <S.StampTitleText>{stamp.title}</S.StampTitleText>
            </S.StampTitleWrapper>
            <S.PointContainer>
              <S.PointImg src={PointImg} alt="PointImg" />
              <S.PointText $textcolor="#ffc066">{stamp.price}P</S.PointText>
            </S.PointContainer>
          </S.StampWrapper>
        ))}
      </S.StampContainer>
      <S.BoxContainer>
        <S.Blank></S.Blank>
        <S.PaginationBox>
          <Pagination
            activePage={page} // 현재 페이지
            itemsCountPerPage={4} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={dataStamp?.totalSize || 0} // 총 아이템 갯수
            pageRangeDisplayed={dataStamp?.totalPage || 0} // paginator의 페이지 범위
            prevPageText={'‹'} // "이전"을 나타낼 텍스트
            nextPageText={'›'} // "다음"을 나타낼 텍스트
            onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
          />
        </S.PaginationBox>
        <S.FloatingBtn onClick={handleonClickSale}>
          <HiOutlinePlusSm color="#121212" size={32} />
        </S.FloatingBtn>
      </S.BoxContainer>
    </S.PageContainer>
  );
};

export default StampMarket;
