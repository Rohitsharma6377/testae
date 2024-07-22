// components/HeroSection.js

import Image from "next/image";
import hero from "../assets/hero.png";

export default function HeroSection({tech}) {
    return (
      <section className="bg-[#f4ebd0] text-center max-lg:px-20 pt-28 h-screen">
        <div>
          {
            tech ? (<h1 className="text-5xl px-96 font-bold text-[#00203f] mb-4">
            Ultimate {tech}
            </h1>) : (<h1 className="text-5xl px-96 font-bold text-[#00203f] mb-4">
              Ultimate Web- Design <br/> and Web Development
            </h1>)
          }
          <p className="text-[#00203f] mx-auto leading-relaxed max-w-3xl mb-8">
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <button className="bg-[#00203f] hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg mb-8">
            View More
          </button>
          {/* Adding an image below the button */}
          <Image
            src={hero}
            alt="Description"
            className="max-lg:absolute max-lg:-bottom-96 w-3/6 mx-auto max-sm:w-3/6 h-auto" // Centers the image and ensures it's responsive
          />
        </div>
      </section>
    );
}
  