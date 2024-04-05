import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Alert from '@/assets/mailalert/Alert.svg';
import NonAlert from '@/assets/mailalert/NonAlert.svg';
// import * as T from '@/test/TestApi';

import { instance } from '@/api/instance';

import { FakeUnReadStamp } from '@/components/MailArelt/MailAreltTypes';

import * as S from './MailAreltStyle';

const MailArelt = () => {
  const [mailData, setMailData] = useState<FakeUnReadStamp[] | undefined>(undefined);
  const fetchData = () => {
    instance
      .get('/letter/stamps/unRead')
      .then((res) => {
        console.log(res, '확인1');
        console.log(res.data, '확인2');
        console.log(res.data.data, '확인3');
        setMailData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // setMailData(T.FakeUnReadStamps.data.stamps);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <S.MailAreltBox>
      {mailData && mailData.length > 0 ? (
        <Link to="/stamps/unRead">
          <S.MailAlertImage src={Alert} />
        </Link>
      ) : (
        <S.MailAlertImage src={NonAlert} />
      )}
    </S.MailAreltBox>
  );
};

export default MailArelt;
