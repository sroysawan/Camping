
import { fetchProfile } from "@/actions/action";
import UserIcon from "@/components/navbar/UserIcon";
import { Button } from "@/components/ui/button";
import { ProfileProps } from "@/utils/types";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const ProfilePage = async () => {
  const user = await currentUser()
  // console.log(user)
  const profile: ProfileProps | null = await fetchProfile();

  if (!profile) {
    return <div className="text-center text-gray-500">No profile found</div>;
  }

  return (
    <section className="mt-4">
      <header>
        <h1 className="text-4xl font-bold text-center mb-8">My Profile</h1>
      </header>
      <section className="container mx-auto p-6 max-w-3xl ">
        <div className="grid sm:grid-cols-3 w-full mt-4">
          <div className="flex justify-center items-center mb-8">
            <div className="relative group">
              <UserIcon userImg={user?.imageUrl || ""} size="size-40" />
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col justify-center gap-4">
            <p className="text-lg">
              <span className="font-semibold">First Name:</span> {profile.firstName}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Last Name:</span> {profile.lastName}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Username:</span> {profile.userName}
            </p>
            <div>
              <Link href={`profile/edit/${profile.id}`}>
                <Button type="button">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
