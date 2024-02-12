import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

export interface ComparePasswordParams {
  password: string;
  hash: string;
}

export async function comparePassword({
  password,
  hash,
}: ComparePasswordParams) {
  return await bcrypt.compare(password, hash);
}
