import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from '../api/client/auth';
import { useNotifications } from './useNotifications';

export function useRegister() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        message: error.message,
      });
    }
  });
}
