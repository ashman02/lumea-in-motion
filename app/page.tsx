"use client";
import Image from "next/image";
import { homeData } from "./utils/data";
import Button from "./components/Button";
import Link from "next/link";
import { useRef } from "react";
import ServicesSectionCard from "./components/ServicesSectionCard";
import TestimonialSection from "./components/TestimonialSection";
import { motion } from "motion/react";
import SectionHeader from "./components/SectionHeader";

export default function Home() {
    const servicesSectionRef = useRef<HTMLDivElement>(null);
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

    return (
        <main>
            <section className="hero-section">
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
                            <motion.h1
                                initial={{
                                    y: "100%",
                                    opacity: 0,
                                    filter: "blur(4px)",
                                }}
                                animate={{
                                    y: "0%",
                                    opacity: 1,
                                    filter: "blur(0px)",
                                }}
                                transition={{
                                    type: "spring",
                                    duration: 0.6,
                                    bounce: 0,
                                    delay: 0.05,
                                }}
                                className="heading-1 max-w-100 text-center text-text-on-color will-change-transform md:max-w-129 lg:max-w-165"
                            >
                                {homeData.hero.heading}
                            </motion.h1>
                        </div>
                        <motion.div
                            initial={{
                                y: "100%",
                                opacity: 0,
                            }}
                            animate={{
                                y: "0%",
                                opacity: 1,
                            }}
                            transition={{
                                type: "spring",
                                duration: 0.6,
                                bounce: 0,
                                delay: 0.2,
                            }}
                        >
                            <Link
                                href={"#"}
                                className="motion-safe:will-change-transform"
                            >
                                <Button title={homeData.hero.cta} rightIcon />
                            </Link>
                        </motion.div>
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
                    <SectionHeader title={homeData.services.heading} />
                    <div className="w-full">
                        <div
                            ref={servicesContainerRef}
                            className="flex grid-cols-1 gap-4 motion-reduce:grid md:grid-cols-2 md:gap-5 lg:gap-6 2xl:grid-cols-3"
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
                            className="flex grid-cols-1 gap-4 motion-reduce:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6 2xl:grid-cols-4"
                        >
                            {homeData.result.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="relative aspect-400/500 w-full shrink-0 overflow-hidden rounded-4 md:w-100 md:rounded-5 motion-reduce:md:w-full lg:rounded-6 2xl:w-1/4 motion-reduce:2xl:w-full"
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
            <TestimonialSection />
        </main>
    );
}
