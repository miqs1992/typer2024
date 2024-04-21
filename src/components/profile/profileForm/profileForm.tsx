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
import FlagIcon from "@/components/flagIcon/flagIcon";
import {
  COUNTRIES_MAPPER,
  getIsoFromCountryName,
} from "@/constants/countries-mapper";

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
          label: (
            <div className="flex gap-2">
              <FlagIcon country={team.flag} /> {team.name}
            </div>
          ),
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
    <Form
      state={formState}
      formAction={formAction}
      update
      successRoute="/"
      fullWidthSubmitButton
    >
      <AsyncSelectInput
        field="winnerId"
        label="Winner"
        defaultValue={
          profile.winner
            ? {
                value: profile.winner.id,
                label: (
                  <div className="flex gap-2">
                    <FlagIcon
                      country={getIsoFromCountryName(profile.winner.name)}
                    />
                    {profile.winner.name}
                  </div>
                ),
              }
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