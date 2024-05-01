import Link from "next/link";
import TeamForm from "@/components/admin/teams/teamForm";

const NewTeamPage: React.FC = () => {
  return (
    <div>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <Link
          href="/admin/teams"
          className="absolute left-0 top-[3px] m-0 inline-block text-lg text-white underline"
        >
          Back to teams
        </Link>
        <h1 className="inline-block">New Team</h1>
      </div>

      <TeamForm />
    </div>
  );
};

export default NewTeamPage;
