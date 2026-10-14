import { useMe } from './useMe';
import { useLogout } from './useLogout';
import { useLogin } from './useLogin';
import { useRegister } from './useRegister';

export function useAuth() {
  const me = useMe();
  const logout = useLogout();
  const login = useLogin();
  const register = useRegister();
  return {
    user: me.data,
    isLoading: me.isPending,
    isAuthenticated: !!me.data,

    logout: logout.mutate,
    isLoggingOut: logout.isPending,

    login: login.mutate,
    isLoggingIn: login.isPending,
    isLoginError: login.isError,

    register: register.mutate,
    isRegistering: register.isPending,
    isRegisterError: register.isError,
  };
}
