import { acceptHMRUpdate, defineStore } from "pinia";
import { authErrorSchema, toastSchema, userSchema } from "~/utils/validation";
import type { AuthError, Toast, User, UserCredentials } from "~/utils/types";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const runtimeConfig = useRuntimeConfig();
    const router = useRouter();
    const user = ref<User | null>(null);

    const signup = async (
      body: UserCredentials
    ): Promise<AuthError | Toast | undefined> => {
      user.value = null;

      try {
        const res = await fetch(
          `${runtimeConfig.public.CANI_BE_URL}/api/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include",
          }
        );
        const data = await res.json();

        // Validate correct user data
        const userData = userSchema.safeParse(data);
        if (userData.success) {
          user.value = userData.data;
          await router.push("/");
          return;
        }

        // Validate correct form errors
        const authError = authErrorSchema.safeParse(data);
        if (authError.success) {
          return authError.data;
        }

        console.error("Response Data:", data);
        throw {
          title: "Invalid Data",
          description: "The response data is invalid.",
          type: "ERROR",
        };
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          return {
            title: error.name,
            description: error.message,
            type: "ERROR",
          };
        } else {
          const toast = toastSchema.safeParse(error);
          if (toast.success) {
            return toast.data;
          } else {
            return {
              title: "Ooops!",
              description: "Something went wrong.",
              type: "ERROR",
            };
          }
        }
      }
    };

    const login = async (
      body: UserCredentials
    ): Promise<AuthError | Toast | undefined> => {
      user.value = null;

      try {
        const res = await fetch(
          `${runtimeConfig.public.CANI_BE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include",
          }
        );
        const data = await res.json();

        // Validate correct user data
        const userData = userSchema.safeParse(data);
        if (userData.success) {
          user.value = userData.data;
          await router.push("/");
          return;
        }

        // Validate correct form errors
        const authError = authErrorSchema.safeParse(data);
        if (authError.success) {
          return authError.data;
        }

        console.error("Response Data:", data);
        throw {
          title: "Invalid Data",
          description: "The response data is invalid.",
          type: "ERROR",
        };
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          return {
            title: error.name,
            description: error.message,
            type: "ERROR",
          };
        } else {
          const toast = toastSchema.safeParse(error);
          if (toast.success) {
            return toast.data;
          } else {
            return {
              title: "Ooops!",
              description: "Something went wrong.",
              type: "ERROR",
            };
          }
        }
      }
    };

    const logout = async (): Promise<Toast | undefined> => {
      try {
        await fetch(`${runtimeConfig.public.CANI_BE_URL}/api/logout`, {
          method: "GET",
          credentials: "include",
        });

        user.value = null;
        router.push("/");
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          return {
            title: error.name,
            description: error.message,
            type: "ERROR",
          };
        } else {
          return {
            title: "Failed to logout",
            description: "Something went wrong.",
            type: "ERROR",
          };
        }
      }
    };

    return {
      user,
      signup,
      login,
      logout,
    };
  },
  {
    persist: {
      debug: true,
      storage: persistedState.localStorage,
    },
  }
);

// Hot Module Replacement
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
