// pages/[slug].js

'use client';

import React from 'react';
import AdminDashboard from '@/app/admin/page';
import componentsMap from '@/app/admin/[slug]/componentsMap';
import TestimonialTable from '@/app/admin/blocks/pages/Testimonials';


export default function Page({ params }) {

  return (
    // <AdminDashboard pageTitle={'Testimonial'}>
      <TestimonialTable modelData={params} />
    // </AdminDashboard>
  );
}