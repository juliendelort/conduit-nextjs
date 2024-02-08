"use client";
import Error from "./error";

export default function GlobalError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <Error {...props} />
      </body>
    </html>
  );
}
