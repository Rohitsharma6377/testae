
import Image from "next/image";
import laptop from "@/assets/laptop.png";


export default function CostSection() {
    
    return (
      <section className="text-center py-20">

        <h1 className="text-2xl font-bold text-black mb-2">
            Website Development Cost
        </h1>
        <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" />
        <p className="text-black mx-auto leading-relaxed max-w-4xl mb-8">
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
        
        <Image src={laptop} className="w-3/4 mt-12 mb-8"/>
        
        {/* <div className="mt-36 relative h-64 w-1/2 bg-[#f4ebd0]">
            <Image src={laptop} className="w-3/4 absolute -right-72 -top-16 mx-auto mb-8"/>

            <div className="absolute w-2/3 -right-72 -top-16">
                <h3 className="text-red-600">Starting @ ₹ 20,000</h3>
                <p className="text-center text-white">
                    The costing of the website development depends on the scope of work. For regular websites built on WordPress the costing starts from ₹ 20,000 and can increase depending on the design and further requirement.
                    <br/>
                    For bigger projects like e-commerce, the cost starts from ₹ 50,000. This can increase drastically as more modules are added to it.
                </p>
            </div>
        </div> */}

      </section>
    );
  }
  