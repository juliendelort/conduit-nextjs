// Error with a message that can safely be displayed to the user
export class SafeMessageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SafeMessageError";
  }
}
