// pages/[slug].js

import AdminDashboard from "../../layout"
import AddUpdateBlog from "../../blocks/blogs/AddUpdateBlog"


export default function Page({params}) {
  
  return (
    // <AdminDashboard>
      <AddUpdateBlog submitBlog={false} blogId={params.slug}/>
    // </AdminDashboard>
  )
}