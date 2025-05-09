import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3, course1, customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3 } from "../assets/images";

export const styles = {
    'padding-x': 'px-32'
}

export const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "All Courses" },
    { href: "/pages/about", label: "About Us" },
    { href: "/pages/contact", label: "Contact Us" },
];


export const shoes = [
    {
        id: 1,
        thumbnail: thumbnailShoe1,
        bigShoe: bigShoe1,
    },
    {
        id: 2,
        thumbnail: thumbnailShoe2,
        bigShoe: bigShoe2,
    },
    {
        id: 3,
        thumbnail: thumbnailShoe3,
        bigShoe: bigShoe3,
    },
];

export const statistics = [
    { id: 1, value: '1k+', label: 'Students' },
    { id: 2, value: '50+', label: 'Companies' },
    { id: 3, value: '100+', label: 'Reviews' },
];

export const products = [
    {
        imgURL: course1,
        name: "Scaled Scrum Master",
        price: "$150.00",
    },
    {
        imgURL: course1,
        name: "Scrum Fundamentals Certified",
        price: "$150.00",
    },
    {
        imgURL: course1,
        name: "Scrum Product Owner Certified",
        price: "$150.00",
    },
    {
        imgURL: course1,
        name: "Scaled Scrum Master",
        price: "$150.00",
    },
];

export const articles = [
    {
        imgURL: course1,
        name: "Scaled Scrum Master",
        price: "$150.00",
    },
    {
        imgURL: course1,
        name: "Scrum Fundamentals Certified",
        price: "$150.00",
    },
    {
        imgURL: course1,
        name: "Scrum Product Owner Certified",
        price: "$150.00",
    },

];


export const services = [
    {
        imgURL: truckFast,
        label: "Free shipping",
        subtext: "Enjoy seamless shopping with our complimentary shipping service."
    },
    {
        imgURL: shieldTick,
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURL: support,
        label: "Love to help you",
        subtext: "Our dedicated team is here to assist you every step of the way."
    },
];

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];


export const footerLinks = [
    {
        title: "Courses",
        links: [
            { name: "Air Force 1", link: "/" },
            { name: "Air Max 1", link: "/" },
            { name: "Air Jordan 1", link: "/" },
            { name: "Air Force 2", link: "/" },
            { name: "Nike Waffle Racer", link: "/" },
            { name: "Nike Cortez", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@pmenhnace.com", link: "mailto:customer@nike.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];