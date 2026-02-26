"use client";
import React, { useRef, useState } from "react";
import { homeData } from "../utils/data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { headingAnimationFunction } from "../utils/gsapAnim";
import { Draggable } from "gsap/all";

gsap.registerPlugin(useGSAP, Draggable);

const TestimonialSection = () => {
    const testimonialHeadingRef = useRef<HTMLHeadingElement>(null);
    const testimonialWrapperRef = useRef<HTMLDivElement>(null);
    const testimonialArrowRef = useRef<HTMLDivElement>(null);
    const testimonialCarouselRef = useRef<HTMLDivElement>(null);

    // state for index to calculate pagination
    const [activeIndex, setActiveIndex] = useState(0);

    // we are using extented sildes for inifinite loop (we are adding one extra first in the last and one extar last in the first)
    const testiSlides = homeData.testimonial.testimonials;
    const extendedSlides = [
        testiSlides[testiSlides.length - 1], // last one
        ...testiSlides,
        testiSlides[0], // first
    ];

    const {contextSafe} = useGSAP(() => {
        headingAnimationFunction(
            testimonialHeadingRef.current,
            testimonialHeadingRef.current,
        );

        // Carousel code
        const totalSlides = testiSlides.length;
        // we are starting from one because 0th is cloned (last) one.
        let currentIndex = 1;

        let isAnimating = false;

        const updateActiveDot = () => {
            const realIndex =
                currentIndex === 0
                    ? totalSlides - 1
                    : currentIndex === totalSlides + 1
                      ? 0
                      : currentIndex - 1;

            setActiveIndex(realIndex);
        };

        updateActiveDot();

        const mm = gsap.matchMedia();
        // arrow animation for desktop
        mm.add("(min-width: 1024px)", () => {
            if (!testimonialArrowRef.current || !testimonialWrapperRef.current)
                return;

            // set initial position
            gsap.set(testimonialCarouselRef.current, {
                xPercent: -100 * currentIndex,
            });

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
            const rotateTo = gsap.quickTo(
                testimonialArrowRef.current,
                "rotation",
                {
                    duration: 0.3,
                    ease: "power3.out",
                },
            );

            // Remember after doing this all wrap every function with contextSafe

            const handleArrowClick = contextSafe(() => {
                if (!testimonialCarouselRef.current || isAnimating) return;

                isAnimating = true;

                const rotation = gsap.getProperty(
                    testimonialArrowRef.current,
                    "rotation",
                ) as number;
                if (rotation === 0) {
                    currentIndex++;
                } else {
                    currentIndex--;
                }

                gsap.to(testimonialCarouselRef.current, {
                    xPercent: -100 * currentIndex,
                    duration: 0.6,
                    ease: "power3.inOut",
                    onComplete: () => {
                        // If we hit the fake last clone
                        if (currentIndex === totalSlides + 1) {
                            currentIndex = 1;
                            gsap.set(testimonialCarouselRef.current, {
                                xPercent: -100 * currentIndex,
                            });
                        }

                        // If we hit the fake first clone
                        if (currentIndex === 0) {
                            currentIndex = totalSlides;
                            gsap.set(testimonialCarouselRef.current, {
                                xPercent: -100 * currentIndex,
                            });
                        }

                        isAnimating = false;
                    },
                });
            });

            // visible the mouse when pointer enters in the section
            const handleMouseEnter = contextSafe(() => {
                gsap.to(testimonialArrowRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    ease: "sine.inOut",
                });
            });

            // When pointer is moving in the section make arrow to follow the pointer
            const handleMouseMove = contextSafe((e: PointerEvent) => {
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
            });

            // hide the mouse when pointer leaves the section
            const handleMouseLeave = contextSafe(() => {
                gsap.to(testimonialArrowRef.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "sine.inOut",
                });
            });

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
        });

        // drag and pagination animation for mobile and desktop
        mm.add("(max-width: 1023px)", () => {
            const wrapper = testimonialWrapperRef.current!;
            const carousel = testimonialCarouselRef.current!;
            const slideWidth = wrapper.offsetWidth;

            // Set initial pixel position
            gsap.set(carousel, {
                x: -slideWidth * currentIndex,
            });

            const dragInstance = Draggable.create(carousel, {
                type: "x",
                edgeResistance: 0.85,
                inertia: false,

                bounds: {
                    minX: -slideWidth * (totalSlides + 1),
                    maxX: 0,
                },

                onDragStart: () => {
                    isAnimating = true;
                },

                onDragEnd: function () {
                    const draggedX = this.x;

                    // Calculate nearest index properly
                    const newIndex = Math.round(
                        Math.abs(draggedX) / slideWidth,
                    );

                    currentIndex = newIndex;

                    gsap.to(carousel, {
                        x: -slideWidth * currentIndex,
                        duration: 0.4,
                        ease: "power3.out",
                        onComplete: () => {
                            // Infinite loop reset logic
                            if (currentIndex === totalSlides + 1) {
                                currentIndex = 1;
                                gsap.set(carousel, {
                                    x: -slideWidth * currentIndex,
                                });
                            }

                            if (currentIndex === 0) {
                                currentIndex = totalSlides;
                                gsap.set(carousel, {
                                    x: -slideWidth * currentIndex,
                                });
                            }
                            updateActiveDot();
                            isAnimating = false;
                        },
                    });
                },
            })[0];

            return () => {
                dragInstance.kill();
            };
        });
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
                        {extendedSlides.map((t, idx) => (
                            <div
                                key={idx}
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
                        className="arrow pointer-events-none absolute -top-8 -left-10 z-10 hidden h-18 w-18 items-center justify-center rounded-full border border-border-base bg-blend-difference backdrop-blur-xs will-change-transform lg:flex"
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
                    {/* Pagination Dots */}
                    <div className="mt-6 flex justify-center gap-3 lg:hidden">
                        {testiSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    const wrapper =
                                        testimonialWrapperRef.current!;
                                    const carousel =
                                        testimonialCarouselRef.current!;
                                    const slideWidth = wrapper.offsetWidth;

                                    const targetIndex = index + 1;

                                    gsap.to(carousel, {
                                        x: -slideWidth * targetIndex,
                                        duration: 0.4,
                                        ease: "power3.out",
                                    });

                                    setActiveIndex(index);
                                }}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                    activeIndex === index
                                        ? "w-6 bg-text-base"
                                        : "bg-border-base"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
