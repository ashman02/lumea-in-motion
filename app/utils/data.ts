import heroImage from "@/public/images/hero-image.jpeg";
import injectableImage from "@/public/images/service-1.jpg";
import skinImage from "@/public/images/service-2.jpg";
import aboutImage from "@/public/images/about-image.jpeg";
import r1 from "@/public/images/bf-1.jpeg";
import r2 from "@/public/images/bf-2.jpeg";
import r3 from "@/public/images/bf-3.jpeg";
import r4 from "@/public/images/bf-4.jpeg";
import r5 from "@/public/images/bf-5.jpeg";
import r6 from "@/public/images/bf-6.jpeg";

const homeData = {
    hero: {
        heroImage: heroImage,
        heading: "Reveal Your Natural Radiance",
        cta: "Book Your Consultation",
    },
    services: {
        heading: "Treatments Tailored to Your Goals",
        treatments: [
            {
                id: 1,
                name: "Injectables",
                img: injectableImage,
                services: [
                    "Botox",
                    "Anti-Wrinkle Treatments",
                    "Dermal Fillers",
                    "Rejuvenation Plans",
                ],
            },
            {
                id: 2,
                name: "Skin Treatments",
                img: skinImage,
                services: [
                    "Facials",
                    "Chemical Peels",
                    "Microneedling",
                    "Acne & Pigmentation Treatments",
                ],
            },
            {
                id: 3,
                name: "Laser Treatments",
                img: injectableImage,
                services: [
                    "Laser Skin Rejuvenation",
                    "Laser Hair Removal",
                    "Skin Tightening",
                    "Texture Improvement",
                ],
            },
            {
                id: 4,
                name: "Body & Wellness",
                img: skinImage,
                services: [
                    "Body Contouring",
                    "Fat Reduction",
                    "Skin Tightening",
                ],
            },
        ],
    },
    about: {
        heading: "Built on Trust, Designed for You",
        description:
            "We believe beauty should enhance who you already are never change it. We combine medical expertise with personalized care to deliver treatments that are safe, effective, and thoughtfully tailored to your unique goals. ",
        cta: "Book Now",
        img: aboutImage,
    },
    result: {
        heading: "Results That Speak for Themselves",
        subHeading:
            "See the transformations our clients have experienced—subtle enhancements that honor individuality and reveal confidence.",
        images: [r1, r2, r3, r4, r5, r6],
    },
    testimonial: {
        heading: "What Our Clients Are Saying...",
        testimonials: [
            {
                content:
                    "I wanted natural results, and Luméa exceeded my expectations. I look refreshed, not ‘done.’ The team made me feel comfortable from day one.",
                name: "Sarah M.",
            },
            {
                content:
                    "The consultation alone was worth it. They explained everything honestly and never pressured me. I finally found a med spa I trust.",
                name: "Jessica R.",
            },
            {
                content:
                    "Beautiful clinic, knowledgeable staff, and incredible results. My skin has never looked better.",
                name: "Danial K.",
            },
            {
                content:
                    "From booking to treatment, everything felt seamless and professional. Highly recommend Luméa Medical Aesthetics.",
                name: "Emily T.",
            },
        ],
    },
};

export { homeData };
