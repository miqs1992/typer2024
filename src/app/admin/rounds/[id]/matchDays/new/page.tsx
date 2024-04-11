import Link from "next/link";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import MatchDayForm from "@/components/matchDays/matchDayForm";

const NewMatchDayPage = async ({ params }: Params) => {
  return (
    <div>
      <h1>New Match Day</h1>
      <Link href={`/admin/rounds/${params.id}`}>Back to round</Link>

      <MatchDayForm roundId={params.id} />
    </div>
  );
};

export default NewMatchDayPage;
