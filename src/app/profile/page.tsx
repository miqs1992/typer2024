import ProfileForm from "@/components/profile/profileForm/profile-form";
import { getCurrentProfile } from "@/lib/actions/profile";
import { isBeforeFirstMatch } from "../../../config/firstMatchStart";

const ProfilePage = async () => {
  const profile = await getCurrentProfile();

  return (
    <>
      <h1 className="my-4 mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Edit Profile
      </h1>
      {isBeforeFirstMatch() && <ProfileForm profile={profile} />}
    </>
  );
};

export default ProfilePage;
