import { SafeMessageError } from "@/types.ts/errors";
import { ZodError, z } from "zod";

export function validateFormData<Schema extends z.ZodTypeAny>(
  formData: FormData,
  schema: Schema,
) {
  try {
    if (!(schema instanceof z.ZodObject)) {
      throw new Error("Invalid zod schema. Must be an object");
    }

    const objToValidate = Object.keys(schema.shape).reduce((acc, key) => {
      acc[key] = formData.get(key) ?? undefined;
      return acc;
    }, {} as z.infer<Schema>);

    return schema.parse(objToValidate) as z.infer<Schema>;
  } catch (e) {
    if (e instanceof ZodError) {
      throw new SafeMessageError(
        e.errors.map((e) => `[${e.path}]: ${e.message}`).join(", "),
      );
    }
    throw e;
  }
}

export function handleActionError(error: unknown) {
  console.log("****Error", error);
  return {
    error:
      error instanceof SafeMessageError ? error.message : "An error occurred",
  };
}
