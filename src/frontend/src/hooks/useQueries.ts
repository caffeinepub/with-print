import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ExternalBlob } from '@/backend';

interface SubmitPaymentParams {
  name: string;
  email: string;
  phone: string;
  utr: string;
  screenshot: ExternalBlob;
}

export function useSubmitPayment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SubmitPaymentParams) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }

      return actor.submitPayment(
        params.name,
        params.email,
        params.phone,
        params.utr,
        params.screenshot
      );
    },
    onSuccess: () => {
      // Invalidate any relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
}

