"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import UserIcon from "../navbar/UserIcon";



const ProfileImageInput = ({
  name,
  defaultImage,
}: {
  name: string;
  defaultImage: string;
}) => {
  const [previewImage, setPreviewImage] = useState(defaultImage);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string); // Update the preview image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* <img
        src={previewImage}
        alt="Profile Preview"
        className="w-40 h-40 rounded-full object-cover border border-gray-300"
      /> */}
       <UserIcon userImg={previewImage} size="size-40" />
      <Input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleImageChange} // Handle file change for preview     
      />
    </div>
  );
};

export default ProfileImageInput;

