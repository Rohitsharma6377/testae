
import AddUpdatePage from "@/app/admin/blocks/pages/AddUpdatePage"


export default function Page({ params }) {
   
  return (
      <AddUpdatePage pageId={params.slug} />
  )
}