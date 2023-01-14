import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartTime,
  setEndTime,
  setStartDate,
  setEndDate,
} from "../redux/calendar";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

// income calendars

export const StartCalendarComponent = (props) => {
  const dispatch = useDispatch();

  const startTime = useSelector((state) => state.storeCalendar.startTime);

  return (
    <Container style={{ width: "15vw" }}>
      <DatePicker
        className="calendar"
        selected={Date.parse(startTime)}
        onChange={(date: Date) => dispatch(setStartTime(date.toDateString()))}
      />
    </Container>
  );
};
export const EndCalendarComponent = (props) => {
  const dispatch = useDispatch();

  const endTime = useSelector((state) => state.storeCalendar.endTime);

  return (
    <Container style={{ width: "15vw" }}>
      <DatePicker
        className="calendar"
        selected={Date.parse(endTime)}
        onChange={(date: Date) => dispatch(setEndTime(date.toDateString()))}
      />
    </Container>
  );
};

// outcome calendars

export const StartOutcomeCalendarComponent = (props) => {
  const dispatch = useDispatch();

  const startDate = useSelector((state) => state.storeCalendar.startDate);

  return (
    <Container style={{ width: "15vw" }}>
      <DatePicker
        className="calendar"
        selected={Date.parse(startDate)}
        onChange={(date: Date) => dispatch(setStartDate(date.toDateString()))}
      />
    </Container>
  );
};

export const EndOutcomeCalendarComponent = (props) => {
  const dispatch = useDispatch();

  const endDate = useSelector((state) => state.storeCalendar.endDate);

  return (
    <Container style={{ width: "15vw" }}>
      <DatePicker
        className="calendar"
        selected={Date.parse(endDate)}
        onChange={(date: Date) => dispatch(setEndDate(date.toDateString()))}
      />
    </Container>
  );
};

const Container = styled.div`
  .calendar {
    background: #fff;
    border: none;
    padding: 5px;
    text-align: center;
    border-radius: 20px;

    :focus {
      outline: none;
    }
  }
`;
