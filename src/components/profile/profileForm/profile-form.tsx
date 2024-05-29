"use client";

import { useFormState } from "react-dom";
import { Profile, setWinnerAndTopScorer } from "@/lib/actions/profile";
import React from "react";
import Form from "@/components/form/form";
import { searchTeams } from "@/lib/actions/teams";
import AsyncSelectInput, {
  SelectOption,
} from "@/components/form/inputs/async-select-input";
import { searchPlayers } from "@/lib/actions/players";
import FlagIcon from "@/components/flagIcon/flag-icon";
import { getIsoFromCountryName } from "@/constants/countries-mapper";

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
          label: (
            <div className="flex gap-2">
              <FlagIcon country={player.team.flag} /> {player.name}
            </div>
          ),
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
        loadFunction={loadPlayers}
        defaultValue={
          profile.topScorer
            ? {
                value: profile.topScorer.id,
                label: (
                  <div className="flex gap-2">
                    <FlagIcon
                      country={getIsoFromCountryName(
                        profile.topScorer.team.name,
                      )}
                    />
                    {profile.topScorer.name}
                  </div>
                ),
              }
            : undefined
        }
      />
    </Form>
  );
};

export default ProfileForm;
