"use client";
import React, { useRef } from "react";
import { homeData } from "../utils/data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { headingAnimationFunction } from "../utils/gsapAnim";

gsap.registerPlugin(useGSAP);

const TestimonialSection = () => {
    const testimonialHeadingRef = useRef<HTMLHeadingElement>(null);
    const testimonialWrapperRef = useRef<HTMLDivElement>(null);
    const testimonialArrowRef = useRef<HTMLDivElement>(null);
    const testimonialCarouselRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!testimonialArrowRef.current || !testimonialWrapperRef.current)
            return;

        headingAnimationFunction(
            testimonialHeadingRef.current,
            testimonialHeadingRef.current,
        );

        // Initial State of our arrow
        gsap.set(testimonialArrowRef.current, {
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

        // Now we need one for the rotation of the arrow
        const rotateTo = gsap.quickTo(testimonialArrowRef.current, "rotation", {
            duration: 0.3,
            ease: "power3.out",
        });

        // Remember after doing this all wrap every function with contextSafe

        // Carousel code
        const totalSlides = homeData.testimonial.testimonials.length;
        let currentIndex = 0;

        const handleArrowClick = () => {
            if (!testimonialCarouselRef.current) return;

            const rotation = gsap.getProperty(
                testimonialArrowRef.current,
                "rotation",
            ) as number;
            if (rotation === 0) {
                currentIndex++;
            } else {
                currentIndex--;
            }

            // Clamp index so it doesn't overflow
            currentIndex = Math.max(0, Math.min(currentIndex, totalSlides - 1));

            // Animate track
            gsap.to(testimonialCarouselRef.current, {
                xPercent: -100 * currentIndex,
                duration: 0.6,
                ease: "power3.inOut",
            });
        };

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
            if (!testimonialWrapperRef.current) return;
            // we are calculating bounds on every event call but we can store that when mouse enter's in the wrapper and reuse those as well. (performance optimization for later)
            const bounds =
                testimonialWrapperRef.current.getBoundingClientRect();

            // cursor position relative to the section
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            // smoothly animate
            xTo(x);
            yTo(y);

            // 🔥 Determine arrow direction based on horizontal position
            const halfWidth = bounds.width / 2;

            if (x < halfWidth) {
                // Cursor is in left half → show left arrow
                rotateTo(180);
            } else {
                // Cursor is in right half → show right arrow
                rotateTo(0);
            }
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
        testimonialWrapperRef.current.addEventListener(
            "pointerenter",
            handleMouseEnter,
        );
        testimonialWrapperRef.current.addEventListener(
            "pointermove",
            handleMouseMove,
        );
        testimonialWrapperRef.current.addEventListener(
            "pointerleave",
            handleMouseLeave,
        );

        // we are adding click event on the wrapper not on the arrow
        testimonialWrapperRef.current.addEventListener(
            "click",
            handleArrowClick,
        );

        // clean up
        return () => {
            testimonialWrapperRef.current?.removeEventListener(
                "pointerenter",
                handleMouseEnter,
            );
            testimonialWrapperRef.current?.removeEventListener(
                "pointermove",
                handleMouseMove,
            );
            testimonialWrapperRef.current?.removeEventListener(
                "pointerleave",
                handleMouseLeave,
            );
            testimonialWrapperRef.current?.removeEventListener(
                "click",
                handleArrowClick,
            );
        };
    }, []);

    return (
        <section className="testimonial-section section-container relative">
            <div className="section-container vertical-flex">
                <div className="heading-container px-6 md:px-8 lg:px-16">
                    <h2 ref={testimonialHeadingRef} className="heading-2">
                        {homeData.testimonial.heading}
                    </h2>
                </div>
                <div
                    ref={testimonialWrapperRef}
                    className="relative overflow-hidden"
                >
                    <div
                        ref={testimonialCarouselRef}
                        className="flex w-full will-change-transform"
                    >
                        {homeData.testimonial.testimonials.map((t) => (
                            <div
                                key={t.name}
                                className="w-full shrink-0 cursor-pointer px-6 md:px-8 lg:px-16"
                            >
                                <div className="flex min-h-140 w-full flex-col gap-10 rounded-4 border border-border-base bg-bg-base p-6 md:min-h-102 md:rounded-5 md:p-9 lg:min-h-120 lg:gap-16 lg:rounded-6 lg:p-14">
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
                            </div>
                        ))}
                    </div>
                    <div
                        ref={testimonialArrowRef}
                        className="arrow pointer-events-none absolute -top-8 -left-10 z-10 flex h-18 w-18 items-center justify-center rounded-full border border-border-base bg-blend-difference backdrop-blur-xs will-change-transform"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            height={40}
                            width={40}
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
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
