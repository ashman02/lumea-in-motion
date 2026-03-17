"use client";
import React, { useRef, useState } from "react";
import { homeData } from "../utils/data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { headingAnimationFunction } from "../utils/gsapAnim";
import { Draggable } from "gsap/all";
import ArrowIcon from "./ArrowIcon";

gsap.registerPlugin(useGSAP, Draggable);

const TestimonialSection = () => {
    const testimonialHeadingRef = useRef<HTMLHeadingElement>(null);
    const testimonialWrapperRef = useRef<HTMLDivElement>(null);
    const testimonialArrowRef = useRef<HTMLDivElement>(null);
    const testimonialLeftArrowRef = useRef<HTMLDivElement>(null);
    const testimonialRightArrowRef = useRef<HTMLDivElement>(null);
    const testimonialCarouselRef = useRef<HTMLDivElement>(null);

    // state for index to calculate pagination
    const [activeIndex, setActiveIndex] = useState(0);
    const currentIndexRef = useRef(0);
    const isAnimatingRef = useRef(false);

    const dragInstanceRef = useRef<Draggable | null>(null);

    // we are using extented sildes for inifinite loop (we are adding one extra first in the last and one extar last in the first)
    const testiSlides = homeData.testimonial.testimonials;
    const extendedSlides = [
        testiSlides[testiSlides.length - 1], // last one
        ...testiSlides,
        testiSlides[0], // first
    ];

    const { contextSafe } = useGSAP(() => {
        headingAnimationFunction(
            testimonialHeadingRef.current,
            testimonialHeadingRef.current,
        );

        // Carousel code
        const totalSlides = testiSlides.length;
        // we are starting from one because 0th is cloned (last) one.

        const updateActiveDot = () => {
            const realIndex =
                currentIndexRef.current === 0
                    ? totalSlides - 1
                    : currentIndexRef.current === totalSlides + 1
                      ? 0
                      : currentIndexRef.current - 1;

            setActiveIndex(realIndex);
        };

        updateActiveDot();

        const mm = gsap.matchMedia();
        // arrow animation for desktop
        mm.add(
            {
                isDesktop: "(min-width: 1024px)",
                isTablet: "(min-width: 768px) and (max-width: 1023px)",
                isMobile: "(max-width: 767px)",
                reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
                const { isDesktop, reduceMotion } = context.conditions as {
                    isDesktop: boolean;
                    reduceMotion: boolean;
                };
                // Use pixels everywhere
                const getSlidePosition = () => {
                    const slideWidth =
                        testimonialWrapperRef.current!.offsetWidth;
                    return -slideWidth * currentIndexRef.current;
                };

                if (!reduceMotion) {
                    if (isDesktop) {
                        if (
                            !testimonialArrowRef.current ||
                            !testimonialWrapperRef.current
                        )
                            return;

                        // set initial position
                        gsap.set(testimonialCarouselRef.current, {
                            x: getSlidePosition(),
                        });

                        // Initial State of our arrow
                        gsap.set(testimonialArrowRef.current, {
                            scale: 0,
                            opacity: 0,
                        });

                        // We are going to use quickTo to animate our arrow (Gsap best practice when we are changing same value of a same target. In our case we are changing x and y)
                        const xTo = gsap.quickTo(
                            testimonialArrowRef.current,
                            "x",
                            {
                                duration: 0.6,
                                ease: "power3.out",
                            },
                        );

                        const yTo = gsap.quickTo(
                            testimonialArrowRef.current,
                            "y",
                            {
                                duration: 0.6,
                                ease: "power3.out",
                            },
                        );

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
                            if (
                                !testimonialCarouselRef.current ||
                                isAnimatingRef.current
                            )
                                return;

                            isAnimatingRef.current = true;

                            const rotation = gsap.getProperty(
                                testimonialArrowRef.current,
                                "rotation",
                            ) as number;
                            if (rotation === 0) {
                                currentIndexRef.current++;
                            } else {
                                currentIndexRef.current--;
                            }

                            gsap.to(testimonialCarouselRef.current, {
                                x: getSlidePosition(),
                                duration: 0.6,
                                ease: "power3.inOut",
                                onComplete: () => {
                                    // If we hit the fake last clone
                                    if (
                                        currentIndexRef.current ===
                                        totalSlides + 1
                                    ) {
                                        currentIndexRef.current = 1;
                                        gsap.set(
                                            testimonialCarouselRef.current,
                                            {
                                                x: getSlidePosition(),
                                            },
                                        );
                                    }

                                    // If we hit the fake first clone
                                    if (currentIndexRef.current === 0) {
                                        currentIndexRef.current = totalSlides;
                                        gsap.set(
                                            testimonialCarouselRef.current,
                                            {
                                                x: getSlidePosition(),
                                            },
                                        );
                                    }
                                    updateActiveDot();
                                    isAnimatingRef.current = false;
                                },
                            });
                        });

                        // visible the mouse when pointer enters in the section
                        const handleMouseEnter = contextSafe(() => {
                            gsap.to(testimonialArrowRef.current, {
                                scale: 1,
                                opacity: 1,
                                duration: 0.3,
                                ease: "power3.out",
                            });
                        });

                        // When pointer is moving in the section make arrow to follow the pointer
                        const handleMouseMove = contextSafe(
                            (e: PointerEvent) => {
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
                            },
                        );

                        // hide the mouse when pointer leaves the section
                        const handleMouseLeave = contextSafe(() => {
                            gsap.to(testimonialArrowRef.current, {
                                scale: 0,
                                opacity: 0,
                                duration: 0.2,
                                ease: "power3.out",
                            });
                        });

                        const testiWrapperElement =
                            testimonialWrapperRef.current;

                        // add listeners to the section
                        testiWrapperElement.addEventListener(
                            "pointerenter",
                            handleMouseEnter,
                        );
                        testiWrapperElement.addEventListener(
                            "pointermove",
                            handleMouseMove,
                        );
                        testiWrapperElement.addEventListener(
                            "pointerleave",
                            handleMouseLeave,
                        );

                        // we are adding click event on the wrapper not on the arrow
                        testiWrapperElement.addEventListener(
                            "click",
                            handleArrowClick,
                        );

                        // clean up
                        return () => {
                            testiWrapperElement?.removeEventListener(
                                "pointerenter",
                                handleMouseEnter,
                            );
                            testiWrapperElement?.removeEventListener(
                                "pointermove",
                                handleMouseMove,
                            );
                            testiWrapperElement?.removeEventListener(
                                "pointerleave",
                                handleMouseLeave,
                            );
                            testiWrapperElement?.removeEventListener(
                                "click",
                                handleArrowClick,
                            );
                        };
                    } else {
                        const initDraggable = () => {
                            const wrapper = testimonialWrapperRef.current!;
                            const carousel = testimonialCarouselRef.current!;
                            const slideWidth = wrapper.offsetWidth;

                            if (dragInstanceRef.current)
                                dragInstanceRef.current.kill();

                            // Set initial pixel position
                            gsap.set(carousel, {
                                x: getSlidePosition(),
                            });

                            dragInstanceRef.current = Draggable.create(
                                carousel,
                                {
                                    type: "x",
                                    edgeResistance: 0.85,
                                    inertia: false,

                                    bounds: {
                                        minX: -slideWidth * (totalSlides + 1),
                                        maxX: 0,
                                    },

                                    onDragStart: () => {
                                        isAnimatingRef.current = true;
                                    },

                                    onDragEnd: function () {
                                        const draggedX = this.x;

                                        // Calculate nearest index properly
                                        const newIndex = Math.round(
                                            Math.abs(draggedX) / slideWidth,
                                        );

                                        currentIndexRef.current = newIndex;

                                        gsap.to(carousel, {
                                            x: getSlidePosition(),
                                            duration: 0.4,
                                            ease: "power3.out",
                                            onComplete: () => {
                                                // Infinite loop reset logic
                                                if (
                                                    currentIndexRef.current ===
                                                    totalSlides + 1
                                                ) {
                                                    currentIndexRef.current = 1;
                                                    gsap.set(carousel, {
                                                        x: getSlidePosition(),
                                                    });
                                                }

                                                if (
                                                    currentIndexRef.current ===
                                                    0
                                                ) {
                                                    currentIndexRef.current =
                                                        totalSlides;
                                                    gsap.set(carousel, {
                                                        x: getSlidePosition(),
                                                    });
                                                }
                                                updateActiveDot();
                                                isAnimatingRef.current = false;
                                            },
                                        });
                                    },
                                },
                            )[0];
                        };

                        // Call on mount
                        initDraggable();

                        // ✅ Recalculate on resize
                        let resizeTimer: NodeJS.Timeout;
                        const handleResize = () => {
                            clearTimeout(resizeTimer);
                            resizeTimer = setTimeout(() => {
                                initDraggable();
                            }, 150);
                        };

                        window.addEventListener("resize", handleResize);

                        return () => {
                            window.removeEventListener("resize", handleResize);
                            clearTimeout(resizeTimer);
                            dragInstanceRef.current?.kill();
                        };
                    }
                } else {
                    const handleLeftArrowClick = contextSafe(() => {
                        if (
                            !testimonialCarouselRef.current ||
                            isAnimatingRef.current
                        )
                            return;

                        isAnimatingRef.current = true;
                        currentIndexRef.current--;

                        gsap.to(testimonialCarouselRef.current, {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power3.out",
                            onComplete: () => {
                                // If we hit the fake first clone
                                if (currentIndexRef.current === 0) {
                                    currentIndexRef.current = totalSlides;
                                }
                                gsap.set(testimonialCarouselRef.current, {
                                    x: getSlidePosition(),
                                });
                                gsap.to(testimonialCarouselRef.current, {
                                    opacity: 1,
                                    duration: 0.6,
                                    ease: "power3.out",
                                });
                                updateActiveDot();
                                isAnimatingRef.current = false;
                            },
                        });
                    });
                    const handleRightArrowClick = contextSafe(() => {
                        if (
                            !testimonialCarouselRef.current ||
                            isAnimatingRef.current
                        )
                            return;

                        isAnimatingRef.current = true;
                        currentIndexRef.current++;

                        gsap.to(testimonialCarouselRef.current, {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power3.inOut",
                            onComplete: () => {
                                // If we hit the fake last clone
                                if (
                                    currentIndexRef.current ===
                                    totalSlides + 1
                                ) {
                                    currentIndexRef.current = 1;
                                }
                                gsap.set(testimonialCarouselRef.current, {
                                    x: getSlidePosition(),
                                });

                                gsap.to(testimonialCarouselRef.current, {
                                    opacity: 1,
                                    duration: 0.6,
                                    ease: "power3.inOut",
                                });
                                updateActiveDot();
                                isAnimatingRef.current = false;
                            },
                        });
                    });

                    testimonialLeftArrowRef.current?.addEventListener(
                        "click",
                        handleLeftArrowClick,
                    );
                    testimonialRightArrowRef.current?.addEventListener(
                        "click",
                        handleRightArrowClick,
                    );

                    return () => {
                        testimonialLeftArrowRef.current?.removeEventListener(
                            "click",
                            handleLeftArrowClick,
                        );
                        testimonialRightArrowRef.current?.removeEventListener(
                            "click",
                            handleRightArrowClick,
                        );
                    };
                }
            },
        );

        return () => mm.revert();
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
                    {/* Arrow for motion safe */}
                    <div
                        ref={testimonialArrowRef}
                        className="arrow pointer-events-none absolute -top-8 -left-10 z-10 hidden h-18 w-18 items-center justify-center rounded-full border border-border-base bg-blend-difference backdrop-blur-xs motion-safe:lg:flex"
                    >
                        <ArrowIcon className="h-10 w-10" />
                    </div>
                    {/* Arrows for motion reduce */}
                    <div className="absolute top-[calc(50%-44px)] left-0 flex w-full items-center justify-between px-3 motion-safe:hidden md:px-2 lg:px-8">
                        <div
                            ref={testimonialLeftArrowRef}
                            className="arrow flex h-10 w-10 rotate-180 cursor-pointer items-center justify-center rounded-full border border-border-base bg-blend-difference backdrop-blur-xs md:h-14 md:w-14 lg:h-18 lg:w-18"
                        >
                            <ArrowIcon className="h-4 w-4 md:h-6 md:w-6 lg:h-10 lg:w-10" />
                        </div>
                        <div
                            ref={testimonialRightArrowRef}
                            className="arrow flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border-base bg-blend-difference backdrop-blur-xs md:h-14 md:w-14 lg:h-18 lg:w-18"
                        >
                           <ArrowIcon className="h-4 w-4 md:h-6 md:w-6 lg:h-10 lg:w-10" />
                        </div>
                    </div>
                    {/* Pagination Dots */}
                    <div className="mt-6 flex justify-center gap-3 motion-reduce:hidden lg:hidden">
                        {testiSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (isAnimatingRef.current) return; // ✅ Add guard
                                    isAnimatingRef.current = true;
                                    const wrapper =
                                        testimonialWrapperRef.current!;
                                    const carousel =
                                        testimonialCarouselRef.current!;
                                    const slideWidth = wrapper.offsetWidth;

                                    const targetIndex = index + 1;

                                    currentIndexRef.current = targetIndex;

                                    gsap.to(carousel, {
                                        x: -slideWidth * targetIndex,
                                        duration: 0.4,
                                        ease: "power3.out",
                                        onComplete: () => {
                                            isAnimatingRef.current = false;
                                        },
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
