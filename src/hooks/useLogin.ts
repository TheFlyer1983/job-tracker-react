import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../api/client/auth';
import { useNotifications } from './useNotifications';

export function useLogin() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  return useMutation({
    mutationFn: login,
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
