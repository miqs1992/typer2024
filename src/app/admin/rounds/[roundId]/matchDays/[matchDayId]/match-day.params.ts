export interface MatchDayParams {
  params: { roundId: string; matchDayId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
