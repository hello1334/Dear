import { useEffect, useState } from 'react';

import MusicLight from '@/assets/musicimages/Music_light.svg';

import * as S from './MusicStyle';

interface OwnProps {
  music?: string;
  isPlaying?: boolean;
}

const Music: React.FC<OwnProps> = ({ music, isPlaying }) => {
  const [musicUrl, setmusicUrl] = useState<string | undefined>(music);
  useEffect(() => {
    setmusicUrl(music);
  }, [music]);

  return (
    <S.AudioBox>
      <S.AudioImage src={MusicLight} />
      {isPlaying && <audio autoPlay loop src={musicUrl} controls />}
    </S.AudioBox>
  );
};

export default Music;
