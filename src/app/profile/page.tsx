import ProfileForm from "@/components/profile/profileForm/profileForm";
import { getCurrentProfile } from "@/lib/actions/profile";
import { isBeforeFirstMatch } from "../../../config/firstMatchStart";

const ProfilePage = async () => {
  const profile = await getCurrentProfile();

  return (
    <>
      <h1 className="mb-3 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Edit Profile
      </h1>
      {isBeforeFirstMatch() && <ProfileForm profile={profile} />}
    </>
  );
};

export default ProfilePage;
