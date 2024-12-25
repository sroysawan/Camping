import { z, ZodSchema } from "zod";

//New Profile
export const profileSchema = z.object({
  firstName: z.string().min(2, { message: "ชื่อ ต้องมากกว่า 2 ตัวอักษร" }),
  lastName: z.string().min(2, { message: "นามสกุล ต้องมากกว่า 2 ตัวอักษร" }),
  userName: z.string().min(2, { message: "Username ต้องมากกว่า 2 ตัวอักษร" }),
});

//create landmark
export const landMarkSchema = z.object({
  name: z
    .string()
    .min(2, { message: "ชื่อ ต้องมากกว่า 2 ตัวอักษร" })
    .max(30, { message: "ชื่อ ต้องน้อยกว่า 30 ตัวอักษร" }),
  category: z.string(),
  description: z
    .string()
    .min(2, { message: "รายละเอียด ต้องมากกว่า 2 ตัวอักษร" })
    .max(200, { message: "รายละเอียด ต้องน้อยกว่า 200 ตัวอักษร" }),
  price: z.coerce.number().int().min(0, { message: "ราคาต้องมากกว่า 0" }),
  province: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

//validate image - create landmark
const validateImage = () => {
  const maxFileSize = 1024 * 1024;
  return z.instanceof(File).refine((file) => {
    return file.size <= maxFileSize;
  }, "File size must be less than 1MB");
};
export const imageSchema = z.object({
  image: validateImage(),
});

//รวม error
export const validatedWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};
