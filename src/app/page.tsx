import {auth} from "@/lib/auth";

const Home = async () => {
  const session = await auth();

  return (
    <div>
      <p>main page</p>
      <p>Hello {session?.user?.email}</p>
    </div>
  );
}
export default Home;
