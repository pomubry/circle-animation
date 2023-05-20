import { acceptHMRUpdate, defineStore } from "pinia";
import {
  AuthError,
  Toast,
  User,
  UserCredentials,
  authErrorSchema,
  toastSchema,
  userSchema,
} from "~/utils/validation";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const user = ref<User | null>(null);
    const router = useRouter();

    async function register(
      body: UserCredentials
    ): Promise<AuthError | Toast | undefined> {
      user.value = null;

      try {
        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include",
        });
        const data = await res.json();

        const userData = userSchema.safeParse(data);
        if (userData.success) {
          user.value = userData.data;
          router.push("/");
          return;
        }

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
    }

    async function login(
      body: UserCredentials
    ): Promise<AuthError | Toast | undefined> {
      user.value = null;

      try {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include",
        });
        const data = await res.json();

        const userData = userSchema.safeParse(data);
        if (userData.success) {
          user.value = userData.data;
          router.push("/");
          return;
        }

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
    }

    async function logout(): Promise<Toast | undefined> {
      try {
        await fetch("http://localhost:5000/api/logout", {
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
    }

    return {
      user,
      register,
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
