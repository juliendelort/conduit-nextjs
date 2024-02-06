import { z } from "zod";

export function validatedAction<T extends z.ZodTypeAny>(
  schema: T,
  callback: (data: z.infer<T>) => Promise<{ error: string }>,
) {
  return (_prevState: any, formData: FormData) => {
    if (!(schema instanceof z.ZodObject)) {
      throw new Error("Invalid zod schema. Must be an object");
    }

    const objToValidate = Object.keys(schema.shape).reduce((acc, key) => {
      acc[key] = formData.get(key);
      return acc;
    }, {} as z.infer<T>);

    const validatedFields = schema.safeParse(objToValidate);

    if (!validatedFields.success) {
      return {
        error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
      };
    }
    return callback(validatedFields.data);
  };
}
