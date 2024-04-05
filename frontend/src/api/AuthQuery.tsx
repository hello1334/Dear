import { useQuery } from '@tanstack/react-query';

import { client } from './client';

type Response = {
  id: number;
  email: string;
  name: string;
};

export const useMe = () =>
  useQuery<Response>({
    queryKey: ['me'],
    queryFn: () => client.get(`/user/me`).then((res) => res.data),
  });
