import {auth} from "@/lib/auth";
import FlagIcon from "@/components/flagIcon/flagIcon";

const Home = async () => {
  const session = await auth();

  return (
    <div>
      <p>main page</p>
      <p>Hello {session?.user?.email}</p>
      <FlagIcon country={"de"} />
    </div>
  );
}
export default Home;
