"use client";

import { useFormState } from "react-dom";
import React, { useState } from "react";
import { IRound } from "@/lib/models/round";
import Form from "@/components/form/form";
import TextInput from "@/components/form/inputs/text-input";
import NumberInput from "@/components/form/inputs/number-input";
import {
  createRound,
  editRound,
} from "@/modules/admin/round-match-management/round.actions";

interface FormProps {
  round?: IRound;
}

const RoundForm = ({ round }: FormProps) => {
  const action = round ? editRound : createRound;
  const [state, formAction] = useFormState(action, undefined);
  const [formRound, setFromRound] = useState(
    round || {
      name: "",
      order: "",
      stage: "",
      scoreFactor: "",
    },
  );
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromRound((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Form
      state={state}
      formAction={formAction}
      update={Boolean(round)}
      successRoute="/admin/rounds"
      fullWidthSubmitButton
    >
      {round && <input type="hidden" name="id" value={round.id} />}
      <TextInput
        field="name"
        label="Name"
        value={formRound.name}
        handleChange={handleFormChange}
      />
      <NumberInput
        field="order"
        label="Order"
        value={Number(formRound.order)}
        handleChange={handleFormChange}
      />
      <NumberInput
        field="stage"
        label="Stage"
        value={Number(formRound.stage)}
        handleChange={handleFormChange}
      />
      <NumberInput
        field="scoreFactor"
        label="Factor"
        value={Number(formRound.scoreFactor)}
        handleChange={handleFormChange}
        max={3}
        step={0.1}
      />
    </Form>
  );
};

export default RoundForm;
