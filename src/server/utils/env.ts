export interface ENV {
  SESSION_PWD: string;
}

export function getEnv(name: keyof ENV) {
  if (!process.env[name]) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return process.env[name] as string;
}
