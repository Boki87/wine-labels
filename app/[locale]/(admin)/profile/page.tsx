import { getProfile } from "@/actions/profile";
import ProfileForm from "@/components/ProfileForm";
import ClientOnly from "@/components/ClientOnly";

export const dynamic = "force-dynamic";

async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div>
      <ClientOnly>
        <ProfileForm profile={profile} />
      </ClientOnly>
    </div>
  );
}

export default ProfilePage;
