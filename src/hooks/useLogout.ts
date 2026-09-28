import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../api/client/auth';
import { useNotifications } from './useNotifications';

export function useLogout() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['me'] });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        message: error.message,
      });
    }
  });
}