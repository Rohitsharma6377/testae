import Image from "next/image";
import tech from "@/assets/tech.png";
import services from "@/assets/services.png";
import projects from "@/assets/projects.png";
import designer from "@/assets/designer.png";
import uxui from "@/assets/ux-and-ui.svg";


export default function WhyChooseUs() {
  const data = [
    {
      image: tech,
      heading: "UI and UX",
      desc: "We give special attention to the interface and user experience to developing"
    },
    {
      image: services,
      heading: "Native Performance",
      desc: "Our developers deploy hand-code Dart to incorporate the Flutter widget for cross"
    },
    {
      image: projects,
      heading: "Fully Tested",
      desc: "We assure fully functional and tested applications. Our Flutter applications will"
    },
    {
      image: designer,
      heading: "Scalable Applications",
      desc: "We develop the applications keeping the future of your business in mind. A scala"
    },
    {
      image: designer,
      heading: "Low Maintenance",
      desc: "We develop the applications keeping the future of your business in mind. A scala"
    },
    {
      image: designer,
      heading: "Flutter Animation",
      desc: "We develop the applications keeping the future of your business in mind. A scala"
    }
  ];

  return (
    <section className="text-left text-white bg-[#AA2C23] py-20 px-20 md:px-32">
      <h1 className="text-2xl font-bold mb-2">
        Why Choose Us for Flutter App Development?
      </h1>
      <p className="leading-relaxed mb-8">
        Experience and expertise are the two pillars of our success as a Flutter application development service provider. We offer custom application development services at a realistic budget. Our developers ensure fast and flawless service as they roll out the best applications.
      </p>
      
      <div className="mt-12 mx-auto grid grid-cols-2 sm:grid-cols-3 gap-2">
        {data.map((item, index) => (
          <div key={index} className="text-sm p-2">
            <Image src={item.image} alt={item.heading} width={50} height={150} className="mx-auto mb-4" />
            <h3 className="text-md text-center mb-3 font-medium p-2 border rounded-lg">{item.heading}</h3>
            <p className="text-justify leading-relaxed">{item.desc}</p>
            <p className="font-semibold mt-1 text-right cursor-pointer">read more..</p>
          </div>
        ))}
      </div>
    </section>
  );
}
