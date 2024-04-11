import Link from "next/link";
import RoundForm from "@/components/rounds/roundForm";
import { getRound } from "@/lib/actions/rounds";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const EditRoundPage = async ({ params }: Params) => {
  const round = await getRound(params.id);

  return (
    <div>
      <h1>edit Round</h1>
      <Link href="/admin/rounds">Back to rounds</Link>

      <RoundForm round={round} />
    </div>
  );
};

export default EditRoundPage;
