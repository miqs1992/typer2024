import { PastMatch } from "./parts/past-match/past-match";
import { PersistedMatch } from "@/modules/admin/round-match-management/match-management.service";

export const MatchDayHistory = ({ matches }: { matches: PersistedMatch[] }) => {
  return matches
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .map((match) => <PastMatch match={match} key={match.id} />);
};
