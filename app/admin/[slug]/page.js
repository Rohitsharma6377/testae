// pages/[slug].js

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
// import AdminDashboard from '@/app/admin/layout';
import componentsMap from '@/app/admin/[slug]/componentsMap';


export default function Page({params}) {

  const { push } = useRouter();
  const { slug } = params;

  
  if (!componentsMap[slug]) {
    push('/not-found');
    return null; // Fallback for unrecognized slugs
  }

  
  const Component = componentsMap[slug].component;  // Get the component based on slug
  const PageTitle = componentsMap[slug].title;  // Get the page title based on slug

  return (
      // <AdminDashboard pageTitle={PageTitle}>
        <Component dashboardTitle={PageTitle}/>
      // </AdminDashboard>
  );
}
