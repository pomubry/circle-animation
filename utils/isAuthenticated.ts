const isAuthenticated = async (): Promise<{ isAuthenticated: boolean }> => {
  try {
    const res = await fetch("http://localhost:5000/api/isAuthenticated", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { isAuthenticated: false };
  }
};

export default isAuthenticated;
