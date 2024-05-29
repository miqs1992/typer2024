import { IMatch } from "@/lib/models/match";
import { PastMatch } from "./parts/past-match/past-match";

export const PastMatchDay = ({ matches }: { matches: IMatch[] }) => {
  return matches.map((match) => <PastMatch match={match} key={match.id} />);
};
