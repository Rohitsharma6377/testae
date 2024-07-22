// pages/[slug].js

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/app/admin/page';
import componentsMap from '@/app/admin/[slug]/componentsMap';
import FaqTable from '@/app/admin/blocks/pages/FAQ';


export default function Page({ params }) {

  return (
    // <AdminDashboard pageTitle={'FAQ'}>
      <FaqTable modelData={params} />
    // </AdminDashboard>
  );
}