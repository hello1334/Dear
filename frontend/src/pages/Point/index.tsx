import { Key, useEffect, useState } from 'react';

import PointsImg from '@/assets/images/points.png';

import { instance } from '@/api/instance';

import * as S from '@/pages/Point/indexStyle';

type PointHistory = {
  id: Key;
  content: string;
  point: number;
  createdAt: string;
  totalPoint: number;
};

const Point = () => {
  useEffect(() => {
    instance
      .get('/user/users/point')
      .then((res) => {
        if (res.data && res.data.data) {
          setPoint(res.data.data.point);
        }
      })
      .catch(() => {});

    instance
      .get('/user/points')
      .then((res) => {
        if (res.data && res.data.data) {
          setPointHistories(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const [point, setPoint] = useState(0);
  const [pointHistories, setPointHistories] = useState([] as PointHistory[]);

  function formatLocalDateTime(localDateTimeString: string) {
    const date = new Date(localDateTimeString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <S.PageContainer>
      <S.PointHeaderContainer>
        <S.PointText>보유 포인트 : {point}P</S.PointText>
        <S.PointExplainText>포인트는 우표 판매, 구매 시 사용할 수 있습니다.</S.PointExplainText>
        <S.PointsImg src={PointsImg} alt={PointsImg} />
      </S.PointHeaderContainer>
      <S.PointBodyContainer>
        <S.PointText>포인트 내역</S.PointText>
        <S.HistoryContainer>
          {pointHistories.map((point) => (
            <S.DetailContainer key={point.id}>
              <S.PointContainer>
                <S.HeaderText $textcolor="#fff">{point.content}</S.HeaderText>
                <S.HeaderText $textcolor={point.point > 0 ? '#C1E3E1' : '#fff'}>
                  {point.point > 0 ? '+' : ''}
                  {point.point}p
                </S.HeaderText>
              </S.PointContainer>
              <S.PointContainer>
                <S.FooterText>{formatLocalDateTime(point.createdAt)}</S.FooterText>
                <S.FooterText>{point.totalPoint}p</S.FooterText>
              </S.PointContainer>
            </S.DetailContainer>
          ))}
        </S.HistoryContainer>
      </S.PointBodyContainer>
    </S.PageContainer>
  );
};

export default Point;
