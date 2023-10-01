import React from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { EmailNotVerified } from './EmailNotVerified';
import { DefaultErrorScreen } from 'components/DefaultErrorScreen';
import { EMAIL_IS_NOT_VERIFIED } from '../../common/constants.ts';

export type LoginErrorProps = {
  error: string | null;
};

export const LoginError: React.FC<LoginErrorProps> = ({ error }: LoginErrorProps) => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const message = params?.error_description || error || 'Unknown error';

  if (message === EMAIL_IS_NOT_VERIFIED) {
    return <EmailNotVerified />;
  }

  console.error(`AUTH ERROR: ${message}`);

  return <DefaultErrorScreen />;
};
