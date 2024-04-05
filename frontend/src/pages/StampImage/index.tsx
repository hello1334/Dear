import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { instance } from '@/api/instance';

import * as S from '@/pages/StampImage/indexStyle';

import Loading from '@/components/Loading/Loading';

const StampImage = () => {
  interface Stamp {
    id: number;
    url: string;
  }
  const {
    data: dataStamp,
    isLoading: isLoading,
    error: error,
  } = useQuery<Stamp[]>({
    queryKey: ['stampImage'],
    queryFn: async () => {
      const response = await instance.get('/letter/sell-stamps/available-stamps');
      return response.data.data;
    },
  });

  useEffect(() => {
    if (error) {
      console.error('Error fetching stampImage:', error);
    }
  }, [error]);
  return isLoading ? (
    <Loading />
  ) : (
    <S.PageContainer>
      <S.ImageContainer>
        {dataStamp?.map((stamp: Stamp) => (
          <S.StampImgWrapper to={'/market/sale'} state={stamp}>
            <S.StampImg src={stamp.url} />
          </S.StampImgWrapper>
        ))}
      </S.ImageContainer>
    </S.PageContainer>
  );
};

export default StampImage;
