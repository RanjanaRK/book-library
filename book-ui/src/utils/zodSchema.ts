import { z } from "zod";

export const addAuthorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name Must be 3 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
});

export type AddAuthorType = z.infer<typeof addAuthorSchema>;

export const addBookSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name Must be 3 or more characters long" }),

  price: z.string().min(1, { message: "Price is Required" }),

  bookAuther: z.string().min(3, { message: "Auther Name is Required" }),
});

export type AddBookType = z.infer<typeof addBookSchema>;

export const editBookSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name Must be 3 or more characters long" }),

  price: z.string().min(1, { message: "Price is Required" }),
});

export type EditBookType = z.infer<typeof editBookSchema>;
