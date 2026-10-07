import { z } from "zod";

export const addProductSchema = z.object({
    name:z.string().min(4),
    sku:z.string().min(5),
    category:z.enum(["ELECTRONICS","CLOTHING","ACCESORIES","HOME_AND_GARDEN","SPORTS"]),
    description:z.string().min(15),
    price:z.coerce.number().min(1).max(10000),
    quantity:z.coerce.number().min(0).max(20000),
    status: z.enum(["IN_STOCK","OUT_OF_STOCK","LOW_STOCK"]),
    supplier: z.string().min(3),
    image:z.custom<FileList|File>((val)=> val instanceof FileList || val instanceof File)
         .refine((val)=>(val instanceof FileList? val.length===1 :true),{
            message:"please select only one image"
         })
         .transform((val)=>val instanceof FileList? val.item(0):val)
         .refine((file):file is File=> file instanceof File)
         .refine((file)=>file.size<=5*1024*1024)
         .refine((file)=>["image/jpeg","image/png"].includes(file?.type??""))
     
});

export type AddProductInput = z.input<typeof addProductSchema>;

export type AddProductOutput = z.output<typeof addProductSchema>;