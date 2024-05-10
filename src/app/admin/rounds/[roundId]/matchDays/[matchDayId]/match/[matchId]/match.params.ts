export interface MatchParams {
  params: { roundId: string; matchDayId: string; matchId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
