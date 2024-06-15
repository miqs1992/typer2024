import ProfileWinnerAndKingForm from "@/components/profile/profileForm/profile-winner-and-king-form";
import { getCurrentProfile } from "@/lib/actions/profile";
import { isBeforeFirstMatch } from "../../../config/firstMatchStart";
import { ProfileDetailsForm } from "@/components/profile/profileForm/profile-details-form";

const ProfilePage = async () => {
  const profile = await getCurrentProfile();

  return (
    <>
      <h1 className="my-4 mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Edit Profile
      </h1>
      {profile && <ProfileDetailsForm profile={profile} />}
      {isBeforeFirstMatch() && profile && (
        <ProfileWinnerAndKingForm profile={profile} />
      )}
    </>
  );
};

export default ProfilePage;
