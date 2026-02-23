"use client";
import Image from "next/image";
import { homeData } from "./utils/data";
import Button from "./components/Button";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import ServicesSectionCard from "./components/ServicesSectionCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    headingAnimationFunction,
    pinnedHorizontalScrollAnimation,
} from "./utils/gsapAnim";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Home() {
    const heroSectionRef = useRef<HTMLDivElement>(null);
    const heroHeadingRef = useRef<HTMLHeadingElement>(null);
    const heroBtnRef = useRef<HTMLAnchorElement>(null);

    const servicesSectionRef = useRef<HTMLDivElement>(null);
    const servicesHeadingRef = useRef<HTMLHeadingElement>(null);
    const servicesWrapperRef = useRef<HTMLDivElement>(null);
    const servicesContainerRef = useRef<HTMLDivElement>(null);

    const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
    const aboutDescriptionRef = useRef<HTMLParagraphElement>(null);
    const aboutButtonRef = useRef<HTMLAnchorElement>(null);
    const aboutImageRef = useRef<HTMLDivElement>(null);

    const resultHeadingRef = useRef<HTMLHeadingElement>(null);
    const resultSubheadingRef = useRef<HTMLParagraphElement>(null);
    const resultWrapperRef = useRef<HTMLDivElement>(null);
    const resultImagesContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero Section Animations
        SplitText.create(heroHeadingRef.current, {
            type: "lines",
            autoSplit: true,
            onSplit: (self) => {
                gsap.fromTo(
                    self.lines,
                    {
                        y: "100%",
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power1.out",
                        stagger: 0.1,
                    },
                );
                gsap.to(heroBtnRef.current, {
                    y: 0,
                    opacity: 1,
                    delay: 0.3,
                    duration: 0.6,
                    ease: "power1.out",
                });
            },
        });

        // Services Section Animations
        headingAnimationFunction(
            servicesHeadingRef.current,
            servicesHeadingRef.current,
        );

        pinnedHorizontalScrollAnimation(
            servicesContainerRef,
            servicesWrapperRef,
        );

        // About Section Animations
        headingAnimationFunction(
            aboutHeadingRef.current,
            aboutHeadingRef.current,
        );
        headingAnimationFunction(
            aboutDescriptionRef.current,
            aboutDescriptionRef.current,
        );
        gsap.from(aboutImageRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
                trigger: aboutImageRef.current,
                start: "top 80%",
            },
        });
        gsap.from(aboutButtonRef.current, {
            y: 48,
            opacity: 0,
            duration: 0.6,
            ease: "power1.out",
            scrollTrigger: {
                trigger: aboutButtonRef.current,
                start: "top 90%",
            },
        });

        // Result Section Animations
        headingAnimationFunction(
            resultHeadingRef.current,
            resultHeadingRef.current,
        );
        headingAnimationFunction(
            resultSubheadingRef.current,
            resultSubheadingRef.current,
        );

        pinnedHorizontalScrollAnimation(
            resultImagesContainerRef,
            resultWrapperRef,
        );
    }, []);

    return (
        <main>
            <section ref={heroSectionRef} className="hero-section">
                <div className="relative flex h-screen min-h-125 w-full items-center justify-center">
                    <div className="Image-div absolute top-0 right-0 bottom-0 left-0">
                        <Image
                            src={homeData.hero.heroImage}
                            alt="Hero Image"
                            quality={100}
                            fill={true}
                            sizes="100vw"
                            loading="eager"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-bg-base-inverse opacity-30" />
                    </div>
                    <div
                        data-speed="1.3"
                        className="text-part relative z-10 flex flex-col items-center gap-12 px-6"
                    >
                        <div className="headings overflow-hidden">
                            <h1
                                ref={heroHeadingRef}
                                className="heading-1 max-w-100 text-center text-text-on-color md:max-w-129 lg:max-w-165"
                            >
                                {homeData.hero.heading}
                            </h1>
                        </div>
                        <Link
                            ref={heroBtnRef}
                            href={"#"}
                            className="translate-y-12 opacity-0"
                        >
                            <Button title={homeData.hero.cta} rightIcon />
                        </Link>
                    </div>
                </div>
            </section>
            <section
                ref={servicesSectionRef}
                className="services-section section-container"
            >
                <div
                    ref={servicesWrapperRef}
                    className="main-container vertical-flex items-center"
                >
                    <div className="heading-container overflow-hidden">
                        <h2
                            ref={servicesHeadingRef}
                            className="heading-2 max-w-md text-center md:max-w-150 lg:max-w-4xl"
                        >
                            {homeData.services.heading}
                        </h2>
                    </div>
                    <div>
                        <div
                            ref={servicesContainerRef}
                            className="flex gap-4 md:gap-5 lg:gap-6"
                        >
                            {homeData.services.treatments.map((t) => (
                                <ServicesSectionCard key={t.id} treatment={t} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="main-container flex flex-col items-center gap-10 lg:flex-row lg:gap-24">
                    <div
                        ref={aboutImageRef}
                        className="imgContainer relative aspect-square w-full overflow-hidden rounded-4 md:rounded-5 lg:w-1/2 lg:max-w-150 lg:min-w-100 lg:rounded-6"
                    >
                        <Image
                            src={homeData.about.img}
                            alt="About Image"
                            fill
                            sizes="(max-width: 1023px) 100vw, 600px"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="textContainer flex w-full flex-col gap-4 md:gap-5 lg:max-w-200 lg:gap-6">
                        <div className="headingWrapper overflow-hidden">
                            <h3 ref={aboutHeadingRef} className="heading-3">
                                {homeData.about.heading}
                            </h3>
                        </div>
                        <div className="descriptionWrapper overflow-hidden">
                            <p
                                ref={aboutDescriptionRef}
                                className="paragraph-1 text-text-subtle"
                            >
                                {homeData.about.description}
                            </p>
                        </div>
                        <Link ref={aboutButtonRef} href={"#"}>
                            <Button
                                title={homeData.about.cta}
                                secondary
                                rightIcon
                            />
                        </Link>
                    </div>
                </div>
            </section>
            <section className="result-section section-container">
                <div
                    ref={resultWrapperRef}
                    className="main-container vertical-flex"
                >
                    <div className="heading-subheading-container flex flex-col items-center gap-4 md:gap-8">
                        <div className="heading-container overflow-hidden">
                            <h2
                                ref={resultHeadingRef}
                                className="heading-2 max-w-md text-center md:max-w-150 lg:max-w-4xl"
                            >
                                {homeData.result.heading}
                            </h2>
                        </div>
                        <div className="subheading-container overflow-hidden">
                            <p
                                ref={resultSubheadingRef}
                                className="paragraph-1 max-w-md text-center text-text-subtle md:max-w-150 lg:max-w-4xl"
                            >
                                {homeData.result.subHeading}
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <div
                            ref={resultImagesContainerRef}
                            className="flex gap-4 md:gap-5 lg:gap-6"
                        >
                            {homeData.result.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="relative aspect-400/500 w-full shrink-0 overflow-hidden rounded-4 md:w-100 md:rounded-5 lg:rounded-6 2xl:w-1/4"
                                >
                                    <Image
                                        src={img}
                                        alt="Before and after image"
                                        width={400}
                                        height={500}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-bg-base-inverse opacity-10" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="testimonial-section section-container">
                <div className="main-container vertical-flex">
                    <div className="heading-container">
                        <h2 className="heading-2">
                            {homeData.testimonial.heading}
                        </h2>
                    </div>
                    <div>
                        <div className="flex gap-6 md:gap-8 lg:gap-16">
                            {homeData.testimonial.testimonials.map((t) => (
                                <div
                                    key={t.name}
                                    className="flex min-h-140 w-full shrink-0 flex-col gap-10 rounded-4 border border-border-base bg-bg-base p-6 md:min-h-102 md:rounded-5 md:p-9 lg:min-h-120 lg:gap-16 lg:rounded-6 lg:p-14"
                                >
                                    <div className="quote-svg h-16 w-16 lg:h-20 lg:w-20">
                                        <svg
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="var(--color-text-brand)"
                                        >
                                            <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"
                                            ></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <g>
                                                    {" "}
                                                    <path
                                                        fill="none"
                                                        d="M0 0h24v24H0z"
                                                    ></path>{" "}
                                                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>{" "}
                                                </g>{" "}
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="text-part flex flex-col gap-10">
                                        <p className="paragraph-0 text-text-subtle lg:max-w-250">
                                            {t.content}
                                        </p>
                                        <h5 className="paragraph-1">
                                            {t.name}
                                        </h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
