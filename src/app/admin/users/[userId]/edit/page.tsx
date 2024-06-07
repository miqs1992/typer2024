import { UserParams } from "@/app/admin/users/[userId]/user.params";
import { getUserById } from "@/modules/admin/users-management/users.actions";
import UserPage from "@/app/admin/users/[userId]/page";
import Link from "next/link";
import { UserForm } from "@/components/admin/users/userForm";

const EditUserPage = async ({ params: { userId } }: UserParams) => {
  const user = await getUserById(userId);

  return (
    <div>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <Link
          href="/admin/users"
          className="absolute left-0 top-[7px] m-0 inline-block text-lg text-white underline"
        >
          Back to Users
        </Link>
        <h1 className="inline-block">Edit User</h1>
      </div>

      <UserForm user={user} />
    </div>
  );
};

export default EditUserPage;
