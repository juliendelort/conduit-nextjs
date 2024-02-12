"use client";

import { ErrorMessage } from "@/app/_components/ErrorMessage";
import { inputClasses } from "@/app/_components/Input";
import { SubmitButton } from "@/app/_components/SubmitButton";
import { updateProfileAction } from "@/server/actions/profiles";
import { User } from "@/types/auth";
import { useState, useTransition } from "react";

export interface EditProfileFormProps {
  profile: User;
}

export function EditProfileForm({ profile }: EditProfileFormProps) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const formAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await updateProfileAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };
  return (
    <>
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <form action={formAction} className="grid gap-4">
        <input
          className={inputClasses}
          type="url"
          required
          name="image"
          placeholder="URL of profile picture"
          defaultValue={profile.image}
          aria-label="URL of profile picture"
        />
        <input
          className={inputClasses}
          type="text"
          required
          name="username"
          placeholder="Your Name"
          aria-label="Name"
          defaultValue={profile.username}
          minLength={3}
        />
        <textarea
          className={inputClasses}
          name="bio"
          placeholder="Short bio about you"
          aria-label="Bio"
          defaultValue={profile.bio}
        />
        <input
          className={inputClasses}
          type="email"
          required
          name="email"
          placeholder="Your Email"
          aria-label="Email"
          defaultValue={profile.email}
        />
        <input
          className={inputClasses}
          type="password"
          name="password"
          aria-label="Password"
          placeholder="New Password"
        />
        <SubmitButton text="Update Settings" isPending={pending} />
      </form>
    </>
  );
}
