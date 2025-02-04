export function getToken(): string | null {
  const token = localStorage.getItem("token");
  return token;
}

export function debounce(
  fn: (e: string) => void,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (e: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(e), delay);
  };
}