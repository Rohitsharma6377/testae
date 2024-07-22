
import Image from "next/image";
import main from "@/assets/blog/main.jpg";


export default function BlogPage() {
    return (
        <div className="">
            <div className="bg-[#B980FF] px-10 h-72 grid grid-cols-3 gap-6 text-center items-center">
                <h1 className="text-4xl mx-auto font-semibold text-black opacity-80 col-span-2 text-left">Introduction to CTR (Click-Through Rate)</h1>
                <Image src={main} alt="blog main image" className="col-span-1 mx-auto w-64" width={700} height={700}/>
            </div>
        </div>
    )
}
