import { z } from "zod";

export function validatedAction<Result, Schema extends z.ZodTypeAny>(
  schema: Schema,
  callback: (data: z.infer<Schema>) => Result,
) {
  return (_prevState: any, formData: FormData) => {
    if (!(schema instanceof z.ZodObject)) {
      throw new Error("Invalid zod schema. Must be an object");
    }

    const objToValidate = Object.keys(schema.shape).reduce((acc, key) => {
      acc[key] = formData.get(key) ?? undefined;
      return acc;
    }, {} as z.infer<Schema>);

    const validatedFields = schema.safeParse(objToValidate);

    if (!validatedFields.success) {
      return {
        error: {
          message: JSON.stringify(validatedFields.error.flatten().fieldErrors),
        },
      };
    }
    return callback(validatedFields.data);
  };
}
