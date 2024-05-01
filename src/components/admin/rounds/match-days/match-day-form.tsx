"use client";

import { useFormState } from "react-dom";
import { createMatchDay, editMatchDay } from "@/lib/actions/matchDays";
import Form from "@/components/form/form";
import { IMatchDay } from "@/lib/models/matchDay";
import React, { useState } from "react";
import NumberInput from "@/components/form/inputs/number-input";
import DateTimeInput from "@/components/form/inputs/date-time-input";

interface FormProps {
  roundId: string;
  matchDay?: IMatchDay;
}

const MatchDayForm = ({ roundId, matchDay }: FormProps) => {
  const action = matchDay ? editMatchDay : createMatchDay;
  const [state, formAction] = useFormState(action, undefined);
  const [formMatchDay, setFormMatchDay] = useState(
    matchDay
      ? {
          dayNumber: matchDay.dayNumber,
          stopBetTime: matchDay.stopBetTime.toISOString().slice(0, 16),
        }
      : {
          dayNumber: 0,
          stopBetTime: new Date().toISOString().slice(0, 16),
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
