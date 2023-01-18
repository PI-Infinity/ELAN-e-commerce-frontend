import { createSlice } from "@reduxjs/toolkit";

// console.log("get");
// const localCart =
//   localStorage.getItem("cart:elan-ecommerce") !== null
//     ? JSON.parse(localStorage.getItem("cart:elan-ecommerce"))
//     : [];

const initialState = {
  list: undefined,
  salons: undefined,
  filter: "all",
  search: "",
  cart: [],
};

export const products = createSlice({
  name: "products",
  initialState,

  reducers: {
    setProductsList: (state, action) => {
      state.list = action.payload;
    },
    setSalons: (state, action) => {
      state.salons = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCart: (state, action) => {
      state.cart.push(action.payload);
    },
    setCartList: (state, action) => {
      state.cart = action.payload;
    },
    removeItem: (state, action) => {
      const item = state.cart.find((item) => item.name === action.payload);
      const index = state.cart.indexOf(item);
      if (index > -1) {
        // only splice array when item is found
        state.cart.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    Decriment: (state, action) => {
      const item = state.cart.find((prdct) => prdct.name === action.payload);
      if (item.quantity > 1) {
        state = state.cart?.map((items) =>
          items.name === action.payload
            ? {
                ...items,
                quantity: (items.quantity -= 1),
              }
            : items
        );
      } else {
        state = state.cart?.map((items) =>
          items.name === action.payload
            ? {
                ...items,
              }
            : items
        );
      }
    },
    Increment: (state, action) => {
      const item = state.cart.find((prdct) => prdct.name === action.payload);
      if (item) {
        state = state.cart?.map((items) =>
          items.name === action.payload
            ? {
                ...items,
                quantity: (items.quantity += 1),
              }
            : items
        );
      } else {
        return false;
      }
    },
    ClearCart: (state, action) => {
      state.cart = [];
    },
  },
});

// console.log("add");
// localStorage.setItem(
//   "cart:elan-ecommerce",
//   JSON.stringify(initialState.cart?.map((item) => item))
// );

export const {
  setProductsList,
  setSalons,
  setFilter,
  setSearch,
  setCart,
  setCartList,
  removeItem,
  Increment,
  Decriment,
  ClearCart,
} = products.actions;
export default products.reducer;
