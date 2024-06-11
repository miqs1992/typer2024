"use client";

import { ExtendedPersistedUser } from "@/modules/admin/users-management/users.management.service";
import { editUser } from "@/modules/admin/users-management/users.actions";
import { useFormState } from "react-dom";
import React, { useState } from "react";
import Form from "@/components/form/form";
import TextInput from "@/components/form/inputs/text-input";
import BooleanInput from "@/components/form/inputs/boolean-input";

interface FormProps {
  user: ExtendedPersistedUser;
}

export const UserForm = ({ user }: FormProps) => {
  const [formState, formAction] = useFormState(editUser, undefined);
  const [formUser, setFormUser] = useState({
    username: user.username,
    email: user.email,
    password: "",
    passwordConfirmation: "",
    hasPaid: user.hasPaid,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlePaidChange = () => {
    setFormUser((prevState) => {
      return {
        ...prevState,
        hasPaid: !prevState.hasPaid,
      };
    });
  };

  return (
    <Form
      state={formState}
      formAction={formAction}
      update
      successRoute="/admin/users"
      fullWidthSubmitButton
    >
      <input type="hidden" name="id" value={user.id} />
      <TextInput
        field="username"
        label="User Name"
        value={formUser.username}
        handleChange={handleFormChange}
      />
      <TextInput
        field="email"
        label="Email"
        value={formUser.email}
        handleChange={handleFormChange}
        type="email"
      />
      <BooleanInput
        field="hasPaid"
        label="Has Paid?"
        value={formUser.hasPaid}
        handleChange={handlePaidChange}
      />
      <TextInput
        field="password"
        label="Password"
        value={formUser.password}
        handleChange={handleFormChange}
        required={false}
        type="password"
      />
      <TextInput
        field="passwordConfirmation"
        label="Password Confirmation"
        value={formUser.passwordConfirmation}
        handleChange={handleFormChange}
        required={false}
        type="password"
      />
    </Form>
  );
};
