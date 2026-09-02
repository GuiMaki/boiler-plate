import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { zipCodeService } from '@/services/api/cep';

export const useZipCode = (zipCode: string) => {
  const normalizedZipCode = zipCode.replace(/\D/g, '');

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [...queryKeys.zipCode.all],
    queryFn: () => zipCodeService.getAddress(normalizedZipCode),
  });
};
