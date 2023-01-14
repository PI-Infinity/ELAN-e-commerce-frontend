import React from "react";
import { useSelector } from "../../redux/main";

export const eng = {
  delivery: (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2 style={{ letterSpacing: "0.03vw" }}>Delivery</h2>
      <div style={{ width: "60vw" }}>
        <p style={{ textAlign: "center" }}>
          <b style={{ marginBottom: "1vw" }}>
            ELAN Georgia offers product delivery service throughout Georgia
            Tbilisi
          </b>
          <br />
          <br />
          Tbilisi Standard order – <b>6 GEL</b> – Delivery time: <b>1-2 Days</b>{" "}
          <br />
          <br />
          Tbilisi Express order – <b>12 GEL</b> – Delivery time:{" "}
          <b>Order Day (ordered until 20:00)</b>
          <br />
          <br /> Regions of Georgia – <b>10 GEL</b> – Delivery time:{" "}
          <b>1-4 Days </b>
          Delivery Working Days: <b> Monday – Saturday</b>
        </p>
      </div>
    </div>
  ),
};

export const geo = {
  delivery: (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2 style={{ letterSpacing: "0.03vw" }}>ტრანსპორტირება</h2>
      <div style={{ width: "60vw" }}>
        <p style={{ textAlign: "center" }}>
          <b style={{ marginBottom: "1vw" }}>
            ELAN Georgia გთავაზობთ პროდუქციის მიტანის სერვისს მთელი საქართველოს
            მასშტაბით
          </b>
          <br />
          <br /> თბილისის სტანდარტული მიწოდება – <b>6 ლარი</b> – მიწოდების დრო:{" "}
          <b>1-2 დღე</b> <br />
          <br />
          თბილისი ექსპრესის მიწოდება – <b>12 ლარი</b> – მიწოდების დრო:{" "}
          <b>შეკვეთის დღე (შეკვეთა 20:00 საათამდე)</b>
          <br />
          <br /> საქართველოს რეგიონები – <b>10 ლარი</b> – მიწოდების დრო:{" "}
          <b>1-4 დღე </b>
          მიწოდების სამუშაო დღეები: <b> ორშაბათი - შაბათი</b>
        </p>
      </div>
    </div>
  ),
};

export const rus = {
  delivery: (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2 style={{ letterSpacing: "0.03vw" }}>Доставка</h2>
      <div style={{ width: "60vw" }}>
        <p style={{ textAlign: "center" }}>
          <b style={{ marginBottom: "1vw" }}>
            ELAN Georgia предлагает услугу доставки товаров по всей Грузии.
          </b>
          <br />
          <br /> Стандартный заказ Тбилиси – <b>6 лари</b> – Срок доставки:{" "}
          <b>1-2 дня</b> <br />
          <br />
          Заказ Тбилиси Экспресс – <b>12 лари</b> – Время доставки:{" "}
          <b>День заказа (заказ до 20:00)</b>
          <br />
          <br /> Регионы Грузии – <b>10 лари</b> – Срок доставки:{" "}
          <b>1-4 дня </b>
          Доставка в рабочие дни: <b> Понедельник - суббота</b>
        </p>
      </div>
    </div>
  ),
};
