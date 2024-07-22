
export default function About() {
    return (
      <section className="bg-[#f4ebd0] text-center py-20">
        <h1 className="text-2xl font-bold text-black mb-2">
            Why Choose us for Digital Marketing Services
        </h1>
        <hr className="border-t-2 w-64 mx-auto border-gray-200 mb-4" />
        <p className="text-black mx-auto leading-relaxed max-w-4xl mb-8">
            Of all the reasons one should look before hiring a digital marketing agency, strong technological understanding and its level of commitment are the most important. Level of commitment ensures that your brand gets the necessary focus it pays for and a strong technological understanding will ensure that efforts are provided in the right direction.
        </p>
        <p className="text-black mx-auto leading-relaxed max-w-4xl mb-8">
            We possess both of them and below are some more reasons that will convince you.
        </p>
        {/* Adding an image below the button */}
            
        <div className="mt-12 container px-72 mx-auto grid grid-cols-5 gap-10">

            <div className="text-sm bg-white rounded-lg p-8 shadow-md overflow-hidden">
              <h3>Assured results as per deliverables</h3>
            </div>
            <div className="text-sm bg-white rounded-lg p-8 shadow-md overflow-hidden">
              <h3>Assured results as per deliverables</h3>
            </div>
            <div className="text-sm bg-white rounded-lg p-8 shadow-md overflow-hidden">
              <h3>Assured results as per deliverables</h3>
            </div>
            <div className="text-sm bg-white rounded-lg p-8 shadow-md overflow-hidden">
              <h3>Assured results as per deliverables</h3>
            </div>
            <div className="text-sm bg-white rounded-lg p-8 shadow-md overflow-hidden">
              <h3>Assured results as per deliverables</h3>
            </div>
        </div>
      </section>
    );
  }
  