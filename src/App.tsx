import { Suspense } from 'react';
import { AuthWrapper } from './providers/AuthWrapper.tsx';
import { LoadingScreen } from './components/LoadingScreen';
import { Provider } from 'react-redux';
import Router from './Router.tsx';
import { store } from 'store';
import './index.scss';

function App() {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <Suspense fallback={<LoadingScreen />}>
          <Router />
        </Suspense>
      </AuthWrapper>
    </Provider>
  );
}

export default App;
