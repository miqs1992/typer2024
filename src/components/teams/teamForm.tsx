"use client";

import { useFormState } from "react-dom";
import React, { useState } from "react";
import { ITeam } from "@/lib/models/team";
import { createTeam, editTeam } from "@/lib/actions/teams";
import Form from "@/components/form/form";
import TextInput from "@/components/form/inputs/textInput";
import BooleanInput from "@/components/form/inputs/booleanInput";

interface FormProps {
  team?: ITeam;
}

const TeamForm = ({ team }: FormProps) => {
  const action = team ? editTeam : createTeam;
  const [formState, formAction] = useFormState(action, undefined);
  const [formTeam, setFormTeam] = useState(
    team || {
      name: "",
      flag: "",
      winner: false,
    },
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTeam((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleWinnerChange = () => {
    setFormTeam((prevState) => {
      return {
        ...prevState,
        winner: !prevState.winner,
      };
    });
  };

  return (
    <Form
      state={formState}
      formAction={formAction}
      update={Boolean(team)}
      successRoute="/admin/teams"
      fullWidthSubmitButton
    >
      {team && <input type="hidden" name="id" value={team.id} />}
      <TextInput
        field="name"
        label="Name"
        value={formTeam.name}
        handleChange={handleFormChange}
      />
      <TextInput
        field="flag"
        label="Flag"
        value={formTeam.flag}
        handleChange={handleFormChange}
      />
      {team && (
        <BooleanInput
          field="winner"
          label="Winner"
          value={formTeam.winner}
          handleChange={handleWinnerChange}
        />
      )}
    </Form>
  );
};

export default TeamForm;
