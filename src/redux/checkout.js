import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buyerName: "",
  phoneNumber: "",
  city: "",
  adress: "",
  other: "",
  coupon: "",
  discount: 0,
  delivery: 0,
  items: "",
  comment: "",
  bank: "",
  itemName: "",
  qnt: 0,
  itemPrice: "",
  list: undefined,
  tota: "",
  email: "",
};

export const Order = createSlice({
  name: "Order",
  initialState,
  reducers: {
    setBuyerName: (state, action) => {
      state.buyerName = action.payload;
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
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setDelivery: (state, action) => {
      state.delivery = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    setBank: (state, action) => {
      state.bank = action.payload;
    },
    setItemName: (state, action) => {
      state.itemName = action.payload;
    },
    setQnt: (state, action) => {
      state.qnt = action.payload;
    },
    setItemPrice: (state, action) => {
      state.itemPrice = action.payload;
    },
    setOrderList: (state, action) => {
      state.list = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const {
  setBuyerName,
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
  setTotal,
  setEmail,
} = Order.actions;
export default Order.reducer;
