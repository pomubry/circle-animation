const isAuthenticated = async (): Promise<{ isAuthenticated: boolean }> => {
  const runtimeConfig = useRuntimeConfig();
  try {
    const res = await fetch(
      `${runtimeConfig.public.CANI_BE_URL}/api/isAuthenticated`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return { isAuthenticated: false };
  }
};

export default isAuthenticated;
