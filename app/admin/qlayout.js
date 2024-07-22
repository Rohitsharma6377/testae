
// pages/[slug].js

import AdminDashboard from '@/app/admin/page';
import componentsMap from './[slug]/componentsMap';


// export default function Page({params}) {

//   const { push } = useRouter();
//   const { slug } = params;

  
//   if (!componentsMap[slug]) {
//     push('/not-found');
//     return null; // Fallback for unrecognized slugs
//   }

//   const Component = componentsMap[slug].component;  // Get the component based on slug
//   const PageTitle = componentsMap[slug].title;  // Get the page title based on slug

//   return (
//     <AdminDashboard pageTitle={PageTitle}>
//       <Component />
//     </AdminDashboard>
//   );
// }



export default function DashboardLayout({ params, children }) {

    // const { slug } = params;

  
    // if (!componentsMap[slug]) {
    //   push('/not-found');
    //   return null; // Fallback for unrecognized slugs
    // }
  
    // const Component = componentsMap[slug].component;  // Get the component based on slug
    // const PageTitle = componentsMap[slug].title;  // Get the page title based on slug


    return (
        <AdminDashboard pageTitle={'PageTitle'}>
          {children}
        </AdminDashboard>
    );
}