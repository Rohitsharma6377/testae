
import BannerSection from "../sections/Banner";
import TestimonialsSection from "../sections/Testimonials";
import FaqSection from "../sections/Faq";
import LookingForSection from "../sections/LookingFor";
import OfficesSection from "../sections/Offices";
import FooterSection from "../sections/Footer";
import Nav from "../sections/Navbar";
import Head from "next/head";


const ServicePageLayout = function RootLayout({ children, pages, banners, testimonials, faqs, lookingForText }) {
    return (
        <>
            <Head>
                <title>{pages.meta_title}</title>
                <meta name="description" content={pages.meta_description} />
            </Head>

            <Nav />
            {/* <BannerSection data={banners} /> */}
            <div className='mt-20'></div>

            {children}

            <LookingForSection text={`${lookingForText ? lookingForText : 'Hire us to work for you!'}`} />
            {testimonials.length > 0 && <TestimonialsSection data={testimonials} pageData={pages} />}
            {faqs.length > 0 && <FaqSection data={faqs} pageData={pages} />}
            <OfficesSection />
            <FooterSection />
        </>
    )
}


export default ServicePageLayout;