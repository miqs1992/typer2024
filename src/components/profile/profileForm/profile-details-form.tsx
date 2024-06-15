"use client";

import { useFormState } from "react-dom";
import { Profile } from "@/lib/actions/profile";
import React, { useState } from "react";
import Form from "@/components/form/form";
import { updateProfile } from "@/modules/profile/profile.actions";
import TextInput from "@/components/form/inputs/text-input";

interface FormProps {
  profile: Profile;
}

export const ProfileDetailsForm = ({ profile }: FormProps) => {
  const [formState, formAction] = useFormState(updateProfile, undefined);
  const [formUser, setFormUser] = useState({
    username: profile.username,
    password: "",
    passwordConfirmation: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Form
      state={formState}
      formAction={formAction}
      update
      successRoute="/"
      fullWidthSubmitButton
    >
      <TextInput
        field="username"
        label="User Name"
        value={formUser.username}
        handleChange={handleFormChange}
      />
      <TextInput
        field="password"
        label="Password"
        value={formUser.password}
        handleChange={handleFormChange}
        required={false}
        type="password"
        hint="Leave empty if you don't want to change the password"
      />
      <TextInput
        field="passwordConfirmation"
        label="Password Confirmation"
        value={formUser.passwordConfirmation}
        handleChange={handleFormChange}
        required={false}
        type="password"
        hint="Leave empty if you don't want to change the password"
      />
    </Form>
  );
};
