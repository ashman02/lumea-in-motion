"use client";
import React, { useRef } from "react";
import { homeData } from "../utils/data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { headingAnimationFunction } from "../utils/gsapAnim";

gsap.registerPlugin(useGSAP);

const TestimonialSection = () => {
    const testimonialSectionRef = useRef<HTMLElement>(null);
    const testimonialArrowRef = useRef<HTMLDivElement>(null);
    const testimonialHeadingRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!testimonialArrowRef.current || !testimonialSectionRef.current)
            return;

        headingAnimationFunction(
            testimonialHeadingRef.current,
            testimonialHeadingRef.current,
        );

        // Initial State of our arrow
        gsap.set(testimonialArrowRef.current, {
            xPercent: -50,
            yPercent: -50,
            scale: 0,
            opacity: 0,
        });

        // We are going to use quickTo to animate our arrow (Gsap best practice when we are changing same value of a same target. In our case we are changing x and y)
        const xTo = gsap.quickTo(testimonialArrowRef.current, "x", {
            duration: 0.3,
            ease: "power3.out",
        });

        const yTo = gsap.quickTo(testimonialArrowRef.current, "y", {
            duration: 0.3,
            ease: "power3.out",
        });

        // visible the mouse when pointer enters in the section
        const handleMouseEnter = () => {
            gsap.to(testimonialArrowRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: "sine.inOut",
            });
        };

        // When pointer is moving in the section make arrow to follow the pointer
        const handleMouseMove = (e: PointerEvent) => {
            if (!testimonialSectionRef.current) return;
            const bounds =
                testimonialSectionRef.current.getBoundingClientRect();

            // cursor position relative to the section
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            // smoothly animate
            xTo(x);
            yTo(y);
        };

        // hide the mouse when pointer leaves the section
        const handleMouseLeave = () => {
            gsap.to(testimonialArrowRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: "sine.inOut",
            });
        };

        // add listeners to the section
        testimonialSectionRef.current.addEventListener(
            "pointerenter",
            handleMouseEnter,
        );
        testimonialSectionRef.current.addEventListener(
            "pointermove",
            handleMouseMove,
        );
        testimonialSectionRef.current.addEventListener(
            "pointerleave",
            handleMouseLeave,
        );

        // clean up
        return () => {
            testimonialSectionRef.current?.removeEventListener(
                "pointerenter",
                handleMouseEnter,
            );
            testimonialSectionRef.current?.removeEventListener(
                "pointermove",
                handleMouseMove,
            );
            testimonialSectionRef.current?.removeEventListener(
                "pointerleave",
                handleMouseLeave,
            );
        };
    }, []);

    return (
        <section
            ref={testimonialSectionRef}
            className="testimonial-section section-container relative"
        >
            <div
                ref={testimonialArrowRef}
                className="arrow absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-bg-secondary"
            >
                <svg
                    viewBox="0 0 24 24"
                    height={24}
                    width={24}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                            fill={"var(--color-text-base)"}
                        ></path>
                    </g>
                </svg>
            </div>
            <div className="main-container vertical-flex">
                <div className="heading-container">
                    <h2 ref={testimonialHeadingRef} className="heading-2">
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
                                    <h5 className="paragraph-1">{t.name}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
