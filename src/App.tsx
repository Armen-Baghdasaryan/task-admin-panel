import { Suspense, useEffect } from 'react';
import { AuthWrapper } from './providers/AuthWrapper.tsx';
import { LoadingScreen } from './components/LoadingScreen';
import Router from './Router.tsx';
import { getProducts, setProducts } from 'store/products/slice.ts';
import { useDispatch } from 'react-redux';
import { getBasketProducts } from 'store/basket/slice.ts';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBasketProducts());
  }, [dispatch]);

  return (
    <AuthWrapper>
      <Suspense fallback={<LoadingScreen />}>
        <Router />
      </Suspense>
    </AuthWrapper>
  );
}

export default App;
