import React from "react";
import styled from "styled-components";

export const MonthsSales = (props) => {
  console.log(props);
  const DefineMonth = (monthName) => {
    const month = props.definedMonth
      ?.filter((item) => item?.month == monthName)
      .map((item, index) => {
        if (item.item.status == "gift" || item.item.status == "canceled") {
          return 0;
        } else if (
          (item.item.status != "gift" || item.item.status != "canceled") &&
          item.item?.discount?.length > 0 &&
          item.item.delivery?.length > 0
        ) {
          return (
            item.item.sum -
            (parseInt(item.item.sum) / 100) * parseInt(item.item?.discount) +
            parseInt(item.item?.delivery)
          );
        } else if (
          (item.item.status != "gift" || item.item.status != "canceled") &&
          item.item?.discount?.length > 0 &&
          (item.item?.delivery?.length < 1 || item.item.delivery == 0)
        ) {
          return (
            parseInt(item.item.sum) -
            (item.item.sum / 100) * parseInt(item.item?.discount)
          );
        } else if (
          (item.item.status != "gift" || item.item.status != "canceled") &&
          (item.item?.discount?.length < 1 || item.item?.discount == 0) &&
          item.item.delivery?.length > 0
        ) {
          return item.item.sum + parseInt(item?.item?.delivery);
        } else {
          return item.item.sum;
        }
      });

    return month;
  };

  const january = DefineMonth("month1").reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const february = DefineMonth("month2").reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const march = DefineMonth("month3").reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const april = DefineMonth("month4").reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const may = DefineMonth("month5").reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const june = DefineMonth("month6").reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const july = DefineMonth("month7").reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const august = DefineMonth("month8").reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const september = DefineMonth("month9").reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const october = DefineMonth("month10").reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const november = DefineMonth("month11").reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const december = DefineMonth("month12").reduce(
    (partialSum, a) => partialSum + a,
    0
  );

  const arr = [
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
  ];
  const MaxHeight = Math.max(...arr.map((o) => o));

  const [transition, setTransition] = React.useState(true);

  setTimeout(() => {
    setTransition(false);
  }, 100);

  return (
    <div
      style={{
        height: "350px",
        width: "88vw",
        background: "#fff",
        marginTop: "1vw",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: "1vw",
        paddingBottom: "1vw",
        paddingTop: "2vw",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (january / MaxHeight) * 100 : 0}
        >
          <span>January</span>
        </Bar>
        <Sum>{january.toFixed(0)} GEL</Sum>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (february / MaxHeight) * 100 : 0}
        >
          February
        </Bar>
        <Sum>{february.toFixed(0)} GEL</Sum>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (march / MaxHeight) * 100 : 0}
        >
          March
        </Bar>
        <Sum>{march.toFixed(0)} GEL</Sum>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (april / MaxHeight) * 100 : 0}
        >
          April
        </Bar>
        <Sum>{april.toFixed(0)} GEL</Sum>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (may / MaxHeight) * 100 : 0}
        >
          May
        </Bar>
        <Sum>{may.toFixed(0)} GEL</Sum>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (june / MaxHeight) * 100 : 0}
        >
          June
        </Bar>
        <Sum>{june.toFixed(0)} GEL</Sum>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (july / MaxHeight) * 100 : 0}
        >
          July
        </Bar>
        <Sum>{july.toFixed(0)} GEL</Sum>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (august / MaxHeight) * 100 : 0}
        >
          August
        </Bar>
        <Sum>{august.toFixed(0)} GEL</Sum>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (september / MaxHeight) * 100 : 0}
        >
          September
        </Bar>
        <Sum>{september.toFixed(0)} GEL</Sum>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (october / MaxHeight) * 100 : 0}
        >
          October
        </Bar>
        <Sum>{october.toFixed(0)} GEL</Sum>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (november / MaxHeight) * 100 : 0}
        >
          November
        </Bar>
        <Sum>{november.toFixed(0)} GEL</Sum>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Bar
          transition={transition}
          height={MaxHeight > 0 ? (december / MaxHeight) * 100 : 0}
        >
          December
        </Bar>
        <Sum>{december.toFixed(0)} GEL</Sum>
      </div>
    </div>
  );
};

const Bar = styled.div`
  background: ${(props) => (props.height < 1 ? "none" : "green")};
  height: ${(props) => (props.transition ? 0 : props.height)}%;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.height < 1 ? "#111" : "white")};
  padding-bottom: 10px;
  transition: ease-in 300ms;
  border-radius: 0.3vw;
  opacity: ${(props) => (props.transition ? 0 : 1)};
`;

const Sum = styled.span`
  padding-top: 0.5vw;
  font-weight: bold;
`;
