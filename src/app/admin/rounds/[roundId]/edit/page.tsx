import Link from "next/link";
import RoundForm from "@/components/admin/rounds/round-form";
import { getRound } from "@/lib/actions/rounds";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const EditRoundPage = async ({ params }: Params) => {
  const round = await getRound(params.roundId);

  return (
    <div>
      <div className="relative my-4 mb-8 text-center text-3xl text-white">
        <Link
          href="/admin/rounds"
          className="absolute left-0 top-[3px] m-0 inline-block text-lg text-white underline"
        >
          Back to Rounds
        </Link>
        <h1 className="inline-block">Edit round</h1>
      </div>
      <RoundForm round={round} />
    </div>
  );
};

export default EditRoundPage;
