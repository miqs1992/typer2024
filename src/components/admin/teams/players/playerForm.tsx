"use client";

import { IPlayer } from "@/lib/models/player";
import { createPlayer, editPlayer } from "@/lib/actions/players";
import { useFormState } from "react-dom";
import React, { useState } from "react";
import Form from "@/components/form/form";
import TextInput from "@/components/form/inputs/text-input";
import NumberInput from "@/components/form/inputs/number-input";
import BooleanInput from "@/components/form/inputs/boolean-input";

interface PlayerFormProps {
  teamId: string;
  player?: IPlayer;
}

const PlayerForm = ({ player, teamId }: PlayerFormProps) => {
  const action = player ? editPlayer : createPlayer;
  const [state, formAction] = useFormState(action, undefined);
  const [formPlayer, setFromPlayer] = useState(
    player || {
      name: "",
      goals: 0,
      assists: 0,
      king: false,
    },
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromPlayer((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleKingChange = () => {
    setFromPlayer((prevState) => {
      return {
        ...prevState,
        king: !prevState.king,
      };
    });
  };

  return (
    <Form
      state={state}
      formAction={formAction}
      update={Boolean(player)}
      successRoute={`/admin/teams/${teamId}`}
      fullWidthSubmitButton
    >
      {player && <input type="hidden" name="id" value={player.id} />}
      <input type="hidden" name="teamId" value={teamId} />
      <TextInput
        field="name"
        label="Name"
        value={formPlayer.name}
        handleChange={handleFormChange}
      />
      {player && (
        <>
          <NumberInput
            field="goals"
            label="Goals"
            value={formPlayer.goals}
            handleChange={handleFormChange}
          />
          <NumberInput
            field="assists"
            label="Assists"
            value={formPlayer.assists}
            handleChange={handleFormChange}
          />
          <BooleanInput
            field="king"
            label="King"
            value={formPlayer.king}
            handleChange={handleKingChange}
          />
        </>
      )}
    </Form>
  );
};

export default PlayerForm;
