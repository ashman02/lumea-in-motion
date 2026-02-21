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

gsap.registerPlugin(useGSAP, SplitText);

export default function Home() {
    const heroHeadingRef = useRef<HTMLHeadingElement>(null);
    const heroBtnRef = useRef<HTMLAnchorElement>(null);
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
    }, []);

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
            <section className="about-section section-container">
                <div className="main-container vertical-flex items-center">
                    <div className="heading-container max-w-md overflow-hidden text-center md:max-w-150 lg:max-w-4xl">
                        <h2 className="heading-2">{homeData.about.heading}</h2>
                    </div>
                    <div className="services-container">
                        <div className="flex w-fit gap-4 md:gap-5 lg:gap-6">
                            {homeData.about.treatments.map((t) => (
                                <ServicesSectionCard key={t.id} treatment={t} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
