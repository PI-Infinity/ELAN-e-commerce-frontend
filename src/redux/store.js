import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./placeOrder";
import calendarReducer from "./calendar";
import outcomeReducer from "./outcome";
import productsReducer from "./products";
import dashboardReducer from "./dashboard";
import mainReducer from "./main";
import serverReducer from "./server";

export const store = configureStore({
  reducer: {
    storeOrder: orderReducer,
    storeCalendar: calendarReducer,
    storeOutcome: outcomeReducer,
    storeProducts: productsReducer,
    storeDashboard: dashboardReducer,
    storeMain: mainReducer,
    storeServer: serverReducer,
  },
});
