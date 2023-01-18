import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buyerName: "",
  firstname: "",
  lastname: "",
  phoneNumber: "",
  email: "",
  city: "",
  adress: "",
  other: "",
  discount: 0,
  delivery: 0,
  items: [],
  comment: "",
  bank: "",
  sum: "",
  coupon: "",
  bookLanguage: "ka",
};

export const Order = createSlice({
  name: "Order",
  initialState,
  reducers: {
    setBuyerName: (state, action) => {
      state.buyerName = action.payload;
    },
    setFirstname: (state, action) => {
      state.firstname = action.payload;
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setAdress: (state, action) => {
      state.adress = action.payload;
    },
    setOther: (state, action) => {
      state.other = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload;
    },
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    setBank: (state, action) => {
      state.bank = action.payload;
    },
    setSum: (state, action) => {
      state.sum = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    setBookLanguage: (state, action) => {
      state.bookLanguage = action.payload;
    },
  },
});

export const {
  setBuyerName,
  setFirstname,
  setLastname,
  setPhoneNumber,
  setCity,
  setAdress,
  setOther,
  setCoupon,
  setDiscount,
  setDelivery,
  setItems,
  setComment,
  setBank,
  setItemName,
  setQnt,
  setItemPrice,
  setOrderList,
  setSum,
  setEmail,
  setBookLanguage,
} = Order.actions;
export default Order.reducer;
