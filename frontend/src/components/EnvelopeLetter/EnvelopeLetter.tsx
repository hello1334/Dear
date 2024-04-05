// EnvelopeLetter.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { format, parseISO } from 'date-fns';

import envelopeback from '@/assets/envelopeimages/envelopeback.svg';
import envelopefront from '@/assets/envelopeimages/envelopefront.svg';
import paper from '@/assets/envelopeimages/paper.svg';
import { useLetterUrlStore } from '@/store/letterUrlStore';

import { FakeStampData } from '@/components/EnvelopeLetter/EnvelopeLetterTypes';

import * as S from './EnvelopeLetterStyle';

const EnvelopeLetter = ({ stamplist, imageUrl }: { stamplist: FakeStampData; imageUrl: string | undefined }) => {
  // const setLetterUrl = useLetterUrlStore((state) => state.setLetterUrls);
  const [StampInfo, setStampInfo] = useState<FakeStampData>();
  const setLetterUrls = useLetterUrlStore((state) => state.setLetterUrls);

  useEffect(() => {
    const updatedStamplist = {
      ...stamplist,
      createAt: format(parseISO(stamplist.createAt), 'h:mm, EEE dd MMM'),
    };
    setStampInfo(updatedStamplist);
  }, [stamplist]);

  const handleLetterClick = () => {
    if (StampInfo && StampInfo.letterUrl) {
      setLetterUrls(StampInfo.letterUrl, undefined); // zustand 스토어의 set 함수를 호출하여 id와 letter 값 저장
    }
  };

  const navigate = useNavigate();

  return (
    <S.Mail
      onClick={() => {
        handleLetterClick();
        navigate('/stamps/read');
      }}
    >
      <S.Envelopefront src={envelopefront} />
      <S.Envelopeback src={envelopeback} />
      <S.Paper $src={paper}>
        <S.Linkletter to={`/stamps/read`} onClick={handleLetterClick} />
        <S.TextDear>{StampInfo?.dear}</S.TextDear>
        <S.InnerImage src={imageUrl} />
        <S.TextFrom>{StampInfo?.from}</S.TextFrom>
        <S.Time>{StampInfo?.createAt}</S.Time>
      </S.Paper>
    </S.Mail>
  );
};

export default EnvelopeLetter;

// to={`/stamps/${stamplist.letterId}/read`}
