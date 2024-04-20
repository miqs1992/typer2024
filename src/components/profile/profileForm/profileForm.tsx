"use client";

import { useFormState } from "react-dom";
import { Profile, setWinnerAndTopScorer } from "@/lib/actions/profile";
import React from "react";
import Form from "@/components/form/form";
import { searchTeams } from "@/lib/actions/teams";
import AsyncSelectInput, {
  SelectOption,
} from "@/components/form/inputs/asyncSelectInput";
import { searchPlayers } from "@/lib/actions/players";

interface FormProps {
  profile: Profile;
}

const ProfileForm = ({ profile }: FormProps) => {
  const [formState, formAction] = useFormState(
    setWinnerAndTopScorer,
    undefined,
  );

  const loadTeams = (inputValue: string): Promise<SelectOption[]> =>
    searchTeams(inputValue).then((teams) => {
      return teams.map((team) => {
        return {
          value: team.id,
          label: team.name,
        };
      });
    });

  const loadPlayers = (inputValue: string): Promise<SelectOption[]> =>
    searchPlayers(inputValue).then((players) => {
      return players.map((player) => {
        return {
          value: player.id,
          label: player.name,
        };
      });
    });

  return (
    <Form state={formState} formAction={formAction} update successRoute="/">
      <AsyncSelectInput
        field="winnerId"
        label="Winner"
        defaultValue={
          profile.winner
            ? { value: profile.winner.id, label: profile.winner.name }
            : undefined
        }
        loadFunction={loadTeams}
      />
      <AsyncSelectInput
        field="topScorerId"
        label="Top Scorer"
        defaultValue={
          profile.topScorer
            ? { value: profile.topScorer.id, label: profile.topScorer.name }
            : undefined
        }
        loadFunction={loadPlayers}
      />
    </Form>
  );
};

export default ProfileForm;
