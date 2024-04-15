import RoundForm from "@/components/rounds/roundForm";
import Link from "next/link";

const NewRoundPage = async () => {
  return (
    <div>
      <div className="relative my-4 mb-8 text-center text-3xl text-white">
        <Link
          href="/admin/rounds"
          className="absolute left-0 top-[3px] m-0 inline-block text-lg text-white underline"
        >
          Back to Rounds
        </Link>
        <h1 className="inline-block">New Round</h1>
      </div>

      <RoundForm />
    </div>
  );
};

export default NewRoundPage;
