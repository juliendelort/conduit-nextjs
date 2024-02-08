import { readFlashMessage } from "@/server/utils/flash";
import { ToastOnMount } from "./ToastOnMount";

export async function FlashMessage() {
  const flashMessage = await readFlashMessage();

  if (flashMessage) {
    return (
      <ToastOnMount text={flashMessage.message} type={flashMessage.type} />
    );
  }

  return null;
}
