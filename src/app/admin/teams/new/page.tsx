import Link from "next/link";
import TeamForm from "@/components/teams/teamForm";

const NewTeamPage: React.FC = () => {
  return (
    <div>
      <h1>New Team</h1>
      <Link href="/admin/teams">Back to teams</Link>
      <TeamForm />
    </div>
  );
}

export default NewTeamPage;
