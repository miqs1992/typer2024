"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Form from "@/components/form/form";
import {
  createMatch,
  updateMatchDetails,
} from "@/modules/admin/round-match-management/match.actions";
import { PersistedMatch } from "@/modules/admin/round-match-management/match-management.service";
import AsyncSelectInput, {
  SelectOption,
} from "@/components/form/inputs/async-select-input";
import { searchTeams } from "@/lib/actions/teams";
import FlagIcon from "@/components/flagIcon/flag-icon";
import DateTimeInput from "@/components/form/inputs/date-time-input";

interface FormProps {
  match?: PersistedMatch;
  matchDayId: string;
  roundId: string;
}

export const MatchForm = ({ match, matchDayId, roundId }: FormProps) => {
  const router = useRouter();
  const action = match ? updateMatchDetails : createMatch;
  const [state, formAction] = useFormState(action, undefined);
  const [formMatch, setFormMatch] = useState(
    match
      ? {
          firstTeamId: match.firstTeam.id,
          secondTeamId: match.secondTeam.id,
          start: match.start.toISOString().slice(0, 16),
        }
      : {
          firstTeamId: null,
          secondTeamId: null,
          start: new Date().toISOString().slice(0, 16),
        },
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormMatch((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    state?.success &&
      router.push(`/admin/rounds/${roundId}/matchDays/${matchDayId}`);
  }, [state?.success, router, matchDayId, roundId]);

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

  return (
    <Form
      formAction={formAction}
      fullWidthSubmitButton
      state={state}
      update={Boolean(match)}
      successRoute={`/admin/rounds/${roundId}/matchDays/${matchDayId}`}
    >
      {match && <input type="hidden" name="id" value={match.id} />}
      <input type="hidden" name="matchDayId" value={matchDayId} />
      <input type="hidden" name="roundId" value={roundId} />

      <AsyncSelectInput
        field="firstTeamId"
        label="First Team"
        defaultValue={
          match?.firstTeam
            ? {
                value: match.firstTeam.id,
                label: (
                  <div className="flex gap-2">
                    <FlagIcon country={match.firstTeam.flag} />
                    {match.firstTeam.name}
                  </div>
                ),
              }
            : undefined
        }
        loadFunction={loadTeams}
      />

      <AsyncSelectInput
        field="secondTeamId"
        label="Second Team"
        defaultValue={
          match?.secondTeam
            ? {
                value: match.secondTeam.id,
                label: (
                  <div className="flex gap-2">
                    <FlagIcon country={match.secondTeam.flag} />
                    {match.secondTeam.name}
                  </div>
                ),
              }
            : undefined
        }
        loadFunction={loadTeams}
      />
      <DateTimeInput
        field="start"
        label="Start Time"
        value={formMatch.start}
        handleChange={handleFormChange}
      />
    </Form>
  );
};
