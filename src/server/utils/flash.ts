import { cookies } from "next/headers";

const FLASH_COOKIE_NAME = "flash";

export interface FlashMessage {
  message: string;
  type: "success" | "error" | "info";
}

export async function setFlashMessage(message: FlashMessage) {
  cookies().set(FLASH_COOKIE_NAME, JSON.stringify(message), { maxAge: -1 });
}

export async function readFlashMessage() {
  const data = cookies().get(FLASH_COOKIE_NAME)?.value;
  try {
    if (data) {
      return JSON.parse(data) as FlashMessage;
    }
  } catch (e) {}
  return undefined;
}
