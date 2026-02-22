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
import { headingAnimationFunction } from "./utils/gsapAnim";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Home() {
    const heroSectionRef = useRef<HTMLDivElement>(null);
    const heroHeadingRef = useRef<HTMLHeadingElement>(null);
    const heroBtnRef = useRef<HTMLAnchorElement>(null);

    const servicesSectionRef = useRef<HTMLDivElement>(null);
    const servicesHeadingRef = useRef<HTMLHeadingElement>(null);
    const servicesWrapperRef = useRef<HTMLDivElement>(null);
    const servicesContainerRef = useRef<HTMLDivElement>(null);
    const servicesExtraRef = useRef<HTMLDivElement>(null);

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
            servicesSectionRef.current,
        );

        const mm = gsap.matchMedia();
        mm.add(
            {
                isDesktop: "(min-width: 1024px)",
                isTablet: "(min-width: 768px) and (max-width: 1023px)",
                isMobile: "(max-width: 767px)",
            },
            (context) => {
                const { isDesktop, isTablet } = context.conditions as {
                    isDesktop: boolean;
                    isTablet: boolean;
                    isMobile: boolean;
                };

                const getScrollAmountY = () => {
                    if (!servicesContainerRef.current) return 0;
                    const padding = isDesktop ? 128 : isTablet ? 64 : 48;
                    const value =
                        servicesContainerRef.current.scrollWidth +
                        padding -
                        window.innerWidth;
                    return value;
                };

                gsap.to(servicesContainerRef.current, {
                    x: () => -getScrollAmountY(),
                    scrollTrigger: {
                        trigger: servicesWrapperRef.current,
                        start: isDesktop ? "bottom bottom" : "top top",
                        end: () => `+=${getScrollAmountY()}`,
                        pin: true,
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });
            },
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
                            {homeData.about.heading}
                        </h2>
                    </div>
                    <div ref={servicesExtraRef} className="">
                        <div
                            ref={servicesContainerRef}
                            className="flex gap-4 md:gap-5 lg:gap-6"
                        >
                            {homeData.about.treatments.map((t) => (
                                <ServicesSectionCard key={t.id} treatment={t} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="h-screen bg-bg-secondary"></section>
        </main>
    );
}
