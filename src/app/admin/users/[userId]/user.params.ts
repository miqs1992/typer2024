export interface UserParams {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
