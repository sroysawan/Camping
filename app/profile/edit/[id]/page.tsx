
import { editProfileAction, fetchProfile } from "@/actions/action"
import { SubmitButton } from "@/components/form/Buttons"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import ProfileImageInput from "@/components/form/ProfileImageInput"
import Bredcrumbs from "@/components/landmark/Bredcrumbs"
import { ProfileProps } from "@/utils/types"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const EditProfile = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser()
  const { id } = await params
  const profile: ProfileProps | null = await fetchProfile();

  // ตรวจสอบว่าข้อมูล profile มีหรือไม่ และ id ตรงกันหรือไม่
  if (!profile || profile.id !== id) {
    // Redirect ไปหน้าโปรไฟล์หรือตำแหน่งที่เหมาะสม
    redirect("/profile");
  }

  return (
    <section className="mt-4">
      <header>
        <h1 className="text-4xl font-bold text-center mb-8">Edit My Profile</h1>
      </header>
      <div className="border p-8 rounded-md">
        <FormContainer action={editProfileAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="relative group flex flex-col items-center justify-center">
            <ProfileImageInput
              name="profileImage"
              defaultImage={user?.imageUrl || ""}// Fallback to a default image
            />
            </div>

            <div className="flex flex-col space-y-3">

              <FormInput
                name="firstName"
                label="First Name"
                type="text"
                defaultValue={profile?.firstName}
                placeholder="First Name"
              />
              <FormInput
                name="lastName"
                label="Last Name"
                type="text"
                defaultValue={profile?.lastName}
                placeholder="Last Name"
              />
              <FormInput
                name="userName"
                label="Username"
                type="text"
                defaultValue={profile?.userName}
                placeholder="Username"
              />
            </div>

          </div>
          <div className="mt-4 text-right">

            <SubmitButton size="lg" text="Save Changes" />
          </div>
        </FormContainer>
      </div>
    </section>
  )
}

export default EditProfile
