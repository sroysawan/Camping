"use server";

import {
  imageSchema,
  landMarkSchema,
  profileSchema,
  validatedWithZod,
} from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

//check user profile by clerk
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must login first");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "An Error!",
  };
};

//create profile insert to db
export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login");

    const rawData = Object.fromEntries(formData);
    const validateField = validatedWithZod(profileSchema, rawData);
    // console.log("validated ", validateField);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validateField,
      },
    });

    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
    //Validate
    //Insert to db
    //return
    // return { message: "Create Profile Success" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      userName: true,
      profileImage: true,
    },
  });
  return profile;
};

export const editProfileAction = async (prevState: any, formData: FormData) => {
  console.log('prevState:', prevState.profileImage); 
  console.log('formData:', formData); 
  try {
    // 1. ตรวจสอบว่า User กำลังล็อกอิน
    const user = await currentUser();
    if (!user) throw new Error("Please login");

    // 2. ดึงไฟล์รูปภาพจาก FormData
    const file = formData.get("profileImage") as File;

    // 3. แปลงข้อมูลจาก FormData ให้เป็น Object และตรวจสอบความถูกต้องตาม Zod schema
    const rawData = Object.fromEntries(formData);
    const validateField = validatedWithZod(profileSchema, rawData);

    // 4. อัปโหลดรูปภาพใหม่ไปยัง Clerk (ถ้ามีการเลือกไฟล์ใหม่)
    let newProfileImageUrl = prevState.profileImage;
    if (file && file.size > 0) {
      const client = await clerkClient();
      const response = await client.users.updateUserProfileImage(user.id, {
        file,
      });
      // console.log('response', response);
      newProfileImageUrl = response.imageUrl; // ได้ URL รูปใหม่จาก Clerk
    }

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: newProfileImageUrl, // อัปเดต URL รูปภาพใหม่
        ...validateField, // อัปเดตฟิลด์ที่ผ่านการตรวจสอบแล้ว เช่น ชื่อ นามสกุล
      },
    });

    // return { message: "Profile updated successfully" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/profile");
};



//create landmark insert to db
export const createLandmarkAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  // console.log('prevState:', prevState); 
  // console.log('formData:', formData); 
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    // console.log("validated landmark", rawData);

    const file = formData.get("image") as File;

    //step 1: validate data
    const validatedFile = validatedWithZod(imageSchema, { image: file });
    const validateField = validatedWithZod(landMarkSchema, rawData);

    //step 2: upload img to supabase
    const fullPath = await uploadFile(validatedFile.image);
    // console.log(fullPath);

    //step 3: insert to db
    await db.landmark.create({
      data: {
        ...validateField,
        image: fullPath,
        profileId: user.id,
      },
    });
    return { message: "Create Landmark Success" };
  } catch (error) {
    console.log(error);
    return renderError(error);
  }
  // redirect("/");
};

export const editLandmarkAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  // console.log('prevState:', prevState.image); 
  // console.log('formData:', formData); 
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const landmarkId = formData.get("id") as string;
    // console.log("validated landmark", formData.get("id"));

    const file = formData.get("image") as File;

    //step 1: validate data
    const validatedFile = validatedWithZod(imageSchema, { image: file });
    const validateField = validatedWithZod(landMarkSchema, rawData);
    
    //step 2: upload img to supabase
    let fullPath = prevState.image;
    if (file && file.size > 0) {
      fullPath = await uploadFile(validatedFile.image); // Upload new image
    }else if (!file && !prevState.image) {
      // กรณีไม่มีการส่งไฟล์ใหม่และไม่พบค่าใน prevState.image
      fullPath = ''; // หรือ URL เดิมจากฐานข้อมูลหากต้องการ
    }
    // console.log('fullPath', fullPath);

    //step 3: insert to db
    await db.landmark.update({
      where:{
        id: landmarkId
      },
      data: {
        ...validateField,
        image: fullPath,
        profileId: user.id,
      },
    });
    // return { message: "Updated Landmark Success" };
  } catch (error) {
    console.log(error);
    return renderError(error);
  }
   redirect("/camp");
};

export const removeLandmarkAction = async({landmarkId,pathName}: {
  landmarkId: string;
  pathName: string;
})=>{
  try {
    await db.landmark.delete({
      where: {
        id: landmarkId,
      },
    })
    revalidatePath(pathName);
    // return { message: "Remove Landmark Success!"  };
  } catch (error) {
    console.log(error)
    return renderError(error);
  }
}

//all
export const featchLandmarks = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const landmarks = await db.landmark.findMany({
    where: {
      category,

      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { province: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return landmarks;
};

//ทุกอันที่เราเป็นคนสร้าง
export const featchLandmarksByCurrentUser = async () => {
  const user = await getAuthUser();
  const landmarks = await db.landmark.findMany({
    where: {
      profileId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return landmarks;
};

//for edit
export const fetchLandmarkById = async ({ id }: { id: string }) => {
  const user = await getAuthUser();
  return db.landmark.findUnique({
    where: {
      id: id,
      profileId: user.id,
    },
  });
};

export const featchLandmarksHero = async () => {
  const landmarks = await db.landmark.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return landmarks;
};

export const fetchFavoriteId = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      landmarkId: landmarkId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  landmarkId: string;
  pathName: string;
}) => {
  const { favoriteId, landmarkId, pathName } = prevState;
  const user = await getAuthUser();
  try {
    //ถ้ามี favorite อยู่แล้ว = delete
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      //ถ้าไม่มี favorite = create
      await db.favorite.create({
        data: {
          landmarkId: landmarkId,
          profileId: user.id,
        },
      });
    }
    //refresh ข้อมูลให้ใหม่เสมอ
    //re validate เสมอ
    revalidatePath(pathName);

    return { message: favoriteId ? "Remove Favorite" : "Add Favorite" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      landmark: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          province: true,
          lat: true,
          lng: true,
          category: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.landmark);
};

export const fetchLandmarkDetail = async ({ id }: { id: string }) => {
  return db.landmark.findUnique({
    where: {
      id: id,
    },
    include: {
      profile: true,
    },
  });
};
