import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Year2021,
  Year2022,
  Year2023,
  Year2024,
  Year2025,
} from "../calendar/monthsInSeconds";
import { MonthsSales } from "../statistics/monthSales";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import Loader from "react-js-loader";

export const Statistics = () => {
  const o = useSelector((state) => state.storeDashboard.orderItems);
  const orders = JSON?.parse(o);

  const [loading, setLoading] = useState(true);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const Months = () => {
    let year;
    if (currentYear == 2021) {
      year = Year2021;
    } else if (currentYear == 2022) {
      year = Year2022;
    } else if (currentYear == 2023) {
      year = Year2023;
    } else if (currentYear == 2024) {
      year = Year2024;
    } else if (currentYear == 2025) {
      year = Year2025;
    }

    const ordersInYear = orders?.filter((item) => {
      return (
        item.orderTime.seconds > year[0]?.start &&
        item.orderTime.seconds < year[11]?.start + 2678400
      );
    });

    const month = [];
    for (var i = 0; i < year?.length; i++) {
      ordersInYear?.map((item) => {
        if (
          item.orderTime.seconds > year[i]?.start &&
          item.orderTime.seconds < year[i]?.start + 2678400
        ) {
          month.push({
            month: "month" + (i + 1),
            item: item,
          });
        }
      });
    }
    return month;
  };

  const definedMonth = Months();

  setTimeout(() => {
    setLoading(false);
  }, 500);

  return (
    <>
      {loading ? (
        <div
          style={{
            width: "88vw",
            height: "calc(100vh-4vw)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#cce9ff",
            marginTop: "4vw",
          }}
        >
          <Loader
            type="spinner-circle"
            bgColor={"#FFADDF"}
            color={"#FFFFFF"}
            size={100}
          />
        </div>
      ) : (
        <div style={{ marginTop: "4vw", background: "#CCE9FF" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "strt",
              paddingTop: "1vw",
            }}
          >
            Year:
            <div
              style={{
                marginTop: "1vw",
                display: "flex",
                gap: "1vw",
                alignItems: "center",
              }}
            >
              <IncrDecr
                onClick={
                  currentYear > 2021
                    ? () => setCurrentYear((prev) => prev - 1)
                    : undefined
                }
              >
                <IoMdArrowDropleftCircle
                  style={{ fontSize: "1.1vw", color: "#333" }}
                />
              </IncrDecr>
              <div>{currentYear}</div>
              <IncrDecr
                onClick={
                  currentYear < 2025
                    ? () => setCurrentYear((prev) => prev + 1)
                    : undefined
                }
              >
                <IoMdArrowDroprightCircle
                  style={{ fontSize: "1.1vw", color: "#333" }}
                />
              </IncrDecr>
            </div>
            <h2 style={{ marginTop: "1.5vw" }}>Sales:</h2>
            <MonthsSales definedMonth={definedMonth} />
          </div>
        </div>
      )}
    </>
  );
};

const IncrDecr = styled.div`
  width: 1.5vw;
  height: 1.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.2vw;
  background: #f1f1f1;
  cursor: pointer;
`;
