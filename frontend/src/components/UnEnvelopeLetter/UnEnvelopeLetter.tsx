// EnvelopeLetter.tsx

import { useEffect, useState } from 'react';

import envelopeback from '@/assets/envelopeimages/envelopeback.svg';
import envelopefront from '@/assets/envelopeimages/envelopefront.svg';
import paper from '@/assets/envelopeimages/paper.svg';
import { useLetterUrlStore } from '@/store/letterUrlStore';

import { FakeUnReadStamp } from '@/components/UnEnvelopeLetter/UnEnvelopeLetterTypes';

import * as S from './UnEnvelopeLetterStyle';

const EnvelopeLetter = ({ stamplist }: { stamplist: FakeUnReadStamp }) => {
  const [StampInfo, setStampInfo] = useState<FakeUnReadStamp>();
  const setLetterUrls = useLetterUrlStore((state) => state.setLetterUrls);
  useEffect(() => {
    setStampInfo(stamplist);
  }, [stamplist]);

  const handleLetterClick = () => {
    if (StampInfo && StampInfo.letterId && StampInfo.letter) {
      setLetterUrls(StampInfo.letter, StampInfo.letterId); // zustand 스토어의 set 함수를 호출하여 id와 letter 값 저장
    }
  };
  return (
    <S.Mail>
      <S.Envelopefront src={envelopefront} />
      <S.Envelopeback src={envelopeback} />
      <S.Paper $src={paper}>
        <S.Linkletter to={`/stamps/read`} onClick={handleLetterClick} />
        <S.TextDear>{StampInfo?.dear}</S.TextDear>
        <S.InnerImage src={StampInfo?.stamp} />
        <S.TextFrom>{StampInfo?.from}</S.TextFrom>
        <S.Time>{StampInfo?.createAt}</S.Time>
      </S.Paper>
    </S.Mail>
  );
};

export default EnvelopeLetter;

// to={`/stamps/${stamplist.letterId}/read`}
