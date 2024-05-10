import Link from "next/link";
import MatchDayForm from "@/components/admin/rounds/match-days/match-day-form";
import { RoundParams } from "@/app/admin/rounds/[roundId]/round.params";

const NewMatchDayPage = async ({ params }: RoundParams) => {
  return (
    <div>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <Link
          href="/admin/rounds"
          className="absolute left-0 top-[7px] m-0 inline-block text-lg text-white underline"
        >
          Back to Rounds
        </Link>
        <h1 className="inline-block">New Match Day</h1>
      </div>
      <MatchDayForm roundId={params.roundId} />
    </div>
  );
};

export default NewMatchDayPage;
