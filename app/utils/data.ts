import heroImage from "@/public/images/hero-image.jpeg";
import injectableImage from "@/public/images/service-1.jpg";
import skinImage from "@/public/images/service-2.jpg";

const homeData = {
    hero: {
        heroImage: heroImage,
        heading: "Reveal Your Natural Radiance",
        cta: "Book Your Consultation",
    },
    about: {
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
};

export { homeData };
