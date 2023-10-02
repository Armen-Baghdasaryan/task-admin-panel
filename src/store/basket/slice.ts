import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASKET_PRODUCTS } from 'common/constants';
import { IProduct } from 'interfaces/product';

export type TProductsState = {
  basket: IProduct[];
  ubdateState: boolean;
};

const initialState: TProductsState = {
  basket: [],
  ubdateState: false,
};

const basketSlice = createSlice({
  name: 'basketSlice',
  initialState,
  reducers: {
    addBasket: (state, action: PayloadAction<IProduct>) => {
      const storedProducts = localStorage.getItem(BASKET_PRODUCTS);

      if (storedProducts) {
        state.basket = JSON.parse(storedProducts);
      }

      const productToAdd = action.payload;

      const existingProduct = state.basket.find((item) => item.id === productToAdd.id);

      if (!existingProduct) {
        state.basket.push({ ...productToAdd, qty: 1 });
      } else {
        existingProduct.qty += 1;
      }

      localStorage.setItem(BASKET_PRODUCTS, JSON.stringify(state.basket));
    },
    getBasketProducts: (state) => {
      const storedProducts = localStorage.getItem(BASKET_PRODUCTS);

      if (storedProducts) {
        state.basket = JSON.parse(storedProducts);
      }
    },
    deleteFromBasket: (state, action: PayloadAction<string>) => {
      state.basket = state.basket.filter((i) => i.id !== action.payload);
      localStorage.setItem(BASKET_PRODUCTS, JSON.stringify(state.basket));
    },

    increaseQty: (state, action: PayloadAction<string>) => {
      const existingProduct = state.basket.find((item) => item.id === action.payload);

      if (existingProduct) {
        existingProduct.qty += 1;
      }

      localStorage.setItem(BASKET_PRODUCTS, JSON.stringify(state.basket));
    },

    decreaseQty: (state, action: PayloadAction<string>) => {
      const existingProduct = state.basket.find((item) => item.id === action.payload);

      if (existingProduct) {
        existingProduct.qty = existingProduct.qty - 1;
        if (existingProduct.qty === 0) {
          state.basket = state.basket.filter((i) => i.id !== action.payload);
        }
      }

      localStorage.setItem(BASKET_PRODUCTS, JSON.stringify(state.basket));
    },
  },
});

export const { addBasket, getBasketProducts, deleteFromBasket, increaseQty, decreaseQty } = basketSlice.actions;

export default basketSlice.reducer;
