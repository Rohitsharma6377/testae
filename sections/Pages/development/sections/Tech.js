
import Image from "next/image";
import php from "@/assets/php.png";


export default function HiringSection() {

    const data = [
        {
          image: php,
          lang: "PHP",
          desc: "PHP is the mother of web languages as it a lot of frameworks come from it. Some of the top ones are Laravel, Code Igniter, Symfony, Cake PHP and the list is really huge. WordPress too is based on PHP and powers a third f websites in the world."
        },
        {
          image: php,
          lang: "JavaScript",
          desc: "The way JavaScript has taken off in last few years is simply amazing and astonishing. From being used to few lines in a typical website to being the backbone of both frontend and backend, it is simply amazing. We too have been pushing our learning curve."
        },
        {
          image: php,
          lang: "Laravel",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
          image: php,
          lang: "React JS",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
          image: php,
          lang: "Node JS",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
          image: php,
          lang: "Vue JS",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
          image: php,
          lang: "Quasar",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
          image: php,
          lang: "WordPress",
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        }
      ];


    
    return (
      <section className="text-center px-32 py-20">

        <h1 className="text-2xl font-bold text-black mb-2">
            Languages & Frameworks <br/> We Work On
        </h1>
        <hr className="border-t-2 w-64 mx-auto border-gray-400 mb-4" />
        <p className="text-black mx-auto leading-relaxed max-w-4xl mb-8">
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
        
        
        <div className="mt-12 container px-72 mx-auto grid grid-cols-3 gap-10">
            {data.map((item, index) => (
                    <div className="relative mt-12 text-sm bg-[#f4ebd0] rounded-lg p-8 pt-16 shadow-md">
                        <Image src={item.image} className="w-32 mx-auto absolute -top-16 left-1/2 -translate-x-1/2 mb-8"/>
                        <h3 className="text-2xl mb-2 text-gray-700 font-bold">{item.lang}</h3>
                        <h5>{item.desc}</h5>
                        <p className="font-bold">read more..</p>
                    </div>
            ))}
        </div>

      </section>
    );
  }
  