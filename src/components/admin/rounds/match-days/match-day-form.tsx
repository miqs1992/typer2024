"use client";

import { useFormState } from "react-dom";

import Form from "@/components/form/form";
import React, { useState } from "react";
import NumberInput from "@/components/form/inputs/number-input";
import DateTimeInput from "@/components/form/inputs/date-time-input";
import {
  createMatchDay,
  editMatchDay,
} from "@/modules/admin/round-match-management/match-day.actions";
import { PersistedMatchDay } from "@/modules/admin/round-match-management/match-day-management.service";
import { convertToDateTimeLocalString } from "@/tools/time-helpers";

interface FormProps {
  roundId: string;
  matchDay?: PersistedMatchDay;
}

const MatchDayForm = ({ roundId, matchDay }: FormProps) => {
  const action = matchDay ? editMatchDay : createMatchDay;
  const [state, formAction] = useFormState(action, undefined);
  const [formMatchDay, setFormMatchDay] = useState(
    matchDay
      ? {
          dayNumber: matchDay.dayNumber,
          stopBetTime: convertToDateTimeLocalString(matchDay.stopBetTime),
        }
      : {
          dayNumber: 0,
          stopBetTime: convertToDateTimeLocalString(new Date()),
        },
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormMatchDay((prevState) => {
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
      update={Boolean(matchDay)}
      successRoute={`/admin/rounds/${roundId}`}
      fullWidthSubmitButton
    >
      {matchDay && <input type="hidden" name="id" value={matchDay.id} />}
      <input type="hidden" name="roundId" value={roundId} />
      <NumberInput
        field="dayNumber"
        label="Day Number"
        max={50}
        value={formMatchDay.dayNumber}
        handleChange={handleFormChange}
      />
      <DateTimeInput
        field="stopBetTime"
        label="Stop Bet Time"
        value={formMatchDay.stopBetTime}
        handleChange={handleFormChange}
      />
    </Form>
  );
};

export default MatchDayForm;
