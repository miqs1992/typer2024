import RoundForm from "@/components/rounds/roundForm";
import Link from "next/link";

const NewRoundPage = async () => {
  return (
    <div>
      <h1>New Round</h1>
      <Link href="/admin/rounds">Back to rounds</Link>

      <RoundForm />
    </div>
  );
};

export default NewRoundPage;
