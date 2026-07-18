import React from 'react';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  // Public layout doesn't enforce roles, it's open to Guest, Reader, Author
  return <Outlet />;
}
