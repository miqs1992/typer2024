export interface PlayerParams {
  params: { teamId: string; playerId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
