import { useState } from 'react';

import styled from 'styled-components';

import * as S from '@/pages/Friend/indexStyle';

import List from '@/components/Friend/List';
import RequestList from '@/components/Friend/RequestList';
import TextFontBox from '@/components/TextFontBox/TextFontBox';

export const TextFontButton = styled(TextFontBox)`
  cursor: pointer;
  margin-right: 10px;
`;

const Friend = () => {
  const [activeTab, setActiceTab] = useState<boolean>(true);
  return (
    <S.PageContainer>
      <S.TabsContainer>
        <TextFontButton text="DEAR LIST" isFocus={activeTab} onClick={() => setActiceTab(!activeTab)} />
        <TextFontButton text="REQUEST LIST" isFocus={!activeTab} onClick={() => setActiceTab(!activeTab)} />
      </S.TabsContainer>
      {activeTab ? <List /> : <RequestList />}
    </S.PageContainer>
  );
};

export default Friend;
