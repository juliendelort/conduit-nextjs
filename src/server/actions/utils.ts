import { z } from "zod";

export function validateFormData<Schema extends z.ZodTypeAny>(
  formData: FormData,
  schema: Schema,
) {
  if (!(schema instanceof z.ZodObject)) {
    throw new Error("Invalid zod schema. Must be an object");
  }

  const objToValidate = Object.keys(schema.shape).reduce((acc, key) => {
    acc[key] = formData.get(key) ?? undefined;
    return acc;
  }, {} as z.infer<Schema>);

  return schema.parse(objToValidate);
}

export function handleActionError(error: unknown) {
  return {
    error: error instanceof Error ? error.message : "An error occurred",
  };
}
