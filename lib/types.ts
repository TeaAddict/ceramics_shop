import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const itemSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  price: z.coerce.number().min(1, "Price is required"),
  stock: z.coerce.number().min(0, "minimum 0 in stock"),
  category: z.string().min(1, "Category is required").max(255),
  description: z.string().optional(),
  thumbnailPicture: z.string().min(1, "Thumbnail is required, select image"),
  pictures: z
    .any()
    .refine((files) => {
      if (Array.isArray(files)) return true;
      if (Array.from(files).length > 0) return true;
    }, "Image is required.")
    .refine((files: FileList | string[]) => {
      if (Array.isArray(files)) return true;
      if (Array.from(files).some((file) => file.size <= MAX_FILE_SIZE))
        return true;
    }, `Max file size is 5MB.`)
    .refine((files: FileList | string[]) => {
      if (Array.isArray(files)) return true;
      const result = Array.from(files).some((file: File) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      );
      return result;
    }, ".jpg, .jpeg, .png and .webp files are accepted."),
});

export const pictureSchemaServer = z.object({
  dimensions: z.object({
    width: z.number().min(1),
    height: z.number().min(1),
  }),
  picture: z.custom<File>(),
});

export const productSchemaServer = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  price: z.number().min(1),
  stock: z.number().min(1),
  category: z.string().min(1),
  description: z.string(),
  thumbnailPicture: z.string().min(1),
  pictures: z.array(pictureSchemaServer).min(1),
});

export type pictureSchema = {
  id: string;
  itemId: string;
  name: string;
  key: string;
  url: string;
  width: number;
  height: number;
};

export type ProductSchema = {
  id: string;
  title: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  thumbnail: pictureSchema;
  pictures: pictureSchema[];
  createdAt: string;
};

type ParsedPicture = {
  dimensions: { width: number; height: number };
  picture: File;
};

export type PictureData = {
  name: string;
  width: number;
  height: number;
}[];

export type ParsedItem = {
  title: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  thumbnailPicture: string;
  pictures: ParsedPicture[];
};

export type Cart = {
  id: string;
  quantity: number;
  stock: number;
  title: string;
  picture: string;
  unitPrice: number;
  totalPrice: number;
}[];

export type TItemSchema = z.infer<typeof itemSchema>;
export type TProductSchemaServer = z.infer<typeof productSchemaServer>;
