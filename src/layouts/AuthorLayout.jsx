import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthorization } from '../hooks/useAuthorization';

export default function AuthorLayout() {
  const { isAuthorized } = useAuthorization(['author', 'admin']);

  if (!isAuthorized) {
    return <div className="py-12 text-center text-ink-black font-mono">Checking authorization...</div>;
  }

  return <Outlet />;
}
