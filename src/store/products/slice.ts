import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PRODUCTS } from 'common/constants';
import { IProduct } from 'interfaces/product';

export type TProductsState = {
  products: IProduct[];
  openModal: boolean;
  openEditModal: boolean;
};

const initialState: TProductsState = {
  openModal: false,
  openEditModal: false,
  products: [
    {
      id: '1',
      name: 'Coca Cola',
      decription:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius, sequi numquam harum natus earum similique repellendus delectus facere, ex a magnam porro nulla quia dicta tenetur tempore labore. Cupiditate, est.',
      imgPath: '',
      type: 'drink',
      price: 2,
      qty: 1,
    },
    {
      id: '2',
      name: 'Sprite',
      decription:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius, sequi numquam harum natus earum similique repellendus delectus facere, ex a magnam porro nulla quia dicta tenetur tempore labore. Cupiditate, est.',
      imgPath: '',
      type: 'drink',
      price: 1.8,
      qty: 1,
    },
    {
      id: '3',
      name: 'Apple',
      decription:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius, sequi numquam harum natus earum similique repellendus delectus facere, ex a magnam porro nulla quia dicta tenetur tempore labore. Cupiditate, est.',
      imgPath: '',
      type: 'fruit',
      price: 1,
      qty: 1,
    },
    {
      id: '4',
      name: 'Banana',
      decription:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius, sequi numquam harum natus earum similique repellendus delectus facere, ex a magnam porro nulla quia dicta tenetur tempore labore. Cupiditate, est.',
      imgPath: '',
      type: 'fruit',
      price: 1.2,
      qty: 1,
    },
    {
      id: 'Orange',
      name: 'Coca Cola',
      decription:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius, sequi numquam harum natus earum similique repellendus delectus facere, ex a magnam porro nulla quia dicta tenetur tempore labore. Cupiditate, est.',
      imgPath: '',
      type: 'fruit',
      price: 1.4,
      qty: 1,
    },
  ],
};

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    setProducts(state) {
      const storedProducts = localStorage.getItem(PRODUCTS);

      if (storedProducts) {
        const producs = JSON.parse(storedProducts);
        if (!producs.length) {
          localStorage.setItem(PRODUCTS, JSON.stringify(state.products));
        }
      }
    },
    getProducts(state) {
      const storedProducts = localStorage.getItem(PRODUCTS);

      if (storedProducts) {
        state.products = JSON.parse(storedProducts);
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((i) => i.id !== action.payload);
      localStorage.setItem(PRODUCTS, JSON.stringify(state.products));
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    toggleEditModal: (state, action: PayloadAction<boolean>) => {
      state.openEditModal = action.payload;
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.unshift(action.payload);
      localStorage.setItem(PRODUCTS, JSON.stringify(state.products));
    },
    editProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);

      if (index !== -1) {
        const updatedProducts = [...state.products];
        updatedProducts[index] = action.payload;

        state.products = updatedProducts;
        localStorage.setItem(PRODUCTS, JSON.stringify(updatedProducts));
      }
    },
  },
});

export const { setProducts, getProducts, deleteProduct, toggleModal, toggleEditModal, addProduct, editProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
