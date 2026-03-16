"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import Button from "./Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Navbar = () => {
    const path = usePathname();

    // is menu bar open or not
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMenuOpenRef = useRef(false); //to prevent scroll hide while menu is open
    const menuTlRef = useRef<gsap.core.Timeline>(null);
    const menuRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const barsRef = useRef({
        top: null as SVGRectElement | null,
        middle: null as SVGRectElement | null,
        bottom: null as SVGRectElement | null,
    });
    const navItemsRef = useRef<HTMLLIElement[]>([]);
    const socialsRef = useRef<HTMLUListElement>(null);

    const isAnimating = useRef<boolean>(false);

    const navItems = [
        {
            name: "Home",
            link: "/",
            isActive: path === "/",
        },
        {
            name: "About",
            link: "/about",
            isActive: path === "/about",
        },
        {
            name: "Services",
            link: "/services",
            isActive: path === "/services",
        },
    ];
    const socialMediaAccounts = [
        {
            title: "Facebook",
            link: "https://www.facebook.com/",
        },
        {
            title: "Instagram",
            link: "https://www.instagram.com/",
        },
    ];

    // We created this function because we have one state and one ref for menu open state
    const updateMenuState = (value: boolean) => {
        isMenuOpenRef.current = value;
        setIsMenuOpen(value);
    };

    // Instead of guessing get the original values of header left right top bottom
    const getHeaderClip = () => {
        const rect = headerRef.current!.getBoundingClientRect();

        const top = rect.top;
        const left = rect.left;
        const right = window.innerWidth - rect.right;
        const bottom = window.innerHeight - rect.bottom;

        // we should be using round 8px for mobile. (we will fix this later even in css)
        return `inset(${top}px ${right}px ${bottom}px ${left}px round 12px)`;
    };

    const { contextSafe } = useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            // We are using auto alpha to prevent flash of unstyled content because we are setting visibility hidden in css and auto alpha will handle that for us.
            gsap.from(headerRef.current, {
                autoAlpha: 0,
                yPercent: -150,
                filter: "blur(4px)",
                // we are using duration 0.5 because power3 ease is quite fast.
                duration: 0.5,
                ease: "power2.out",
            });

            let lastScroll = 0;
            const threshold = 10; // prevents micro scroll jitter

            // we have defined tweens and play them according to our need
            const showAnim = gsap
                .from(headerRef.current, {
                    y: -88,
                    paused: true,
                    duration: 0.4,
                    ease: "power2.out",
                })
                .progress(1);

            ScrollTrigger.create({
                start: "top top",
                end: 99999,
                onUpdate: (self) => {
                    if (isMenuOpenRef.current) return;

                    const scroll = self.scroll();
                    const diff = scroll - lastScroll;

                    // always show navbar near top
                    if (scroll < 80) {
                        showAnim.play();
                        lastScroll = scroll;
                        return;
                    }

                    // ignore micro movements
                    if (Math.abs(diff) < threshold) return;

                    if (diff > 0) {
                        // scrolling down
                        showAnim.timeScale(1.8).reverse();
                    } else {
                        // scrolling up
                        showAnim.timeScale(1).play();
                    }

                    lastScroll = scroll;
                },
            });

            // We do not want to create timeline on every click so we are creating it inside useGSAP and storing it in ref and using it in our handlers
            menuTlRef.current = gsap
                .timeline({
                    paused: true,
                    onStart: () => {
                        gsap.set(menuRef.current, {
                            display: "flex",
                        });
                    },
                    onComplete: () => {
                        updateMenuState(true);
                        isAnimating.current = false;
                    },
                    onReverseComplete: () => {
                        updateMenuState(false);
                        isAnimating.current = false;
                        gsap.set(menuRef.current, {
                            display: "none",
                        });
                    },
                })

                // we are using fromTo because simple to was not working animation was like opening a book
                .fromTo(
                    menuRef.current,
                    {
                        clipPath: () => getHeaderClip(), // ✅ Function returns fresh value
                    },
                    {
                        clipPath: "inset(0px 0px 0px 0px round 0px)",
                        ease: "power3.inOut",
                        duration: 0.3,
                    },
                )
                // We are turning our ham into X sign. Y value is tried and error value nothing calculated
                .to(
                    barsRef.current.top,
                    {
                        rotate: 45,
                        y: 9,
                        transformOrigin: "center center",
                        ease: "sine.inOut",
                        duration: 0.3,
                    },
                    "<",
                )
                .to(
                    barsRef.current.middle,
                    {
                        scaleX: 0,
                        opacity: 0,
                        ease: "sine.inOut",
                        duration: 0.3,
                    },
                    "<",
                )
                .to(
                    barsRef.current.bottom,
                    {
                        rotate: -45,
                        y: -7.25,
                        transformOrigin: "center center",
                        ease: "sine.inOut",
                        duration: 0.3,
                    },
                    "<",
                )
                .to(
                    navItemsRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        ease: "power3.out",
                        duration: 0.2,
                        stagger: 0.03,
                    },
                    "<0.1",
                )
                .to(
                    socialsRef.current,
                    {
                        opacity: 1,
                        ease: "power3.out",
                        duration: 0.2,
                    },
                    "<0.1",
                );
        });

        // if user prefers reduced motion we are only animating opacity, colors and not animating y and blur because that can cause motion sickness for some people
        mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.from(headerRef.current, {
                autoAlpha: 0,
                // we are using duration 0.5 because power3 ease is quite fast.
                duration: 0.5,
                ease: "power2.out",
            });

            let lastScroll = 0;
            const threshold = 10; // prevents micro scroll jitter

            // we have defined tweens and play them according to our need
            const showAnim = gsap
                .to(headerRef.current, {
                    opacity: 1,
                    paused: true,
                    duration: 0.4,
                    ease: "power2.out",
                })
                .progress(1);

            ScrollTrigger.create({
                start: "top top",
                end: 99999,
                onUpdate: (self) => {
                    if (isMenuOpenRef.current) return;

                    const scroll = self.scroll();
                    const diff = scroll - lastScroll;

                    // always show navbar near top
                    if (scroll < 80) {
                        showAnim.play();
                        lastScroll = scroll;
                        return;
                    }

                    // ignore micro movements
                    if (Math.abs(diff) < threshold) return;

                    if (diff > 0) {
                        // scrolling down
                        showAnim.timeScale(1.8).reverse();
                    } else {
                        // scrolling up
                        showAnim.timeScale(1).play();
                    }

                    lastScroll = scroll;
                },
            });

            // Timeline logic
            menuTlRef.current = gsap
                .timeline({
                    paused: true,
                    onStart: () => {
                        gsap.set(menuRef.current, {
                            display: "flex",
                        });
                    },
                    onComplete: () => {
                        updateMenuState(true);
                        isAnimating.current = false;
                    },
                    onReverseComplete: () => {
                        updateMenuState(false);
                        isAnimating.current = false;
                        gsap.set(menuRef.current, {
                            display: "none",
                        });
                    },
                })
                // we are using fromTo because simple to was not working animation was like opening a book
                .fromTo(
                    menuRef.current,
                    {
                        clipPath: "inset(0px 0px 0px 0px round 0px)",
                        opacity: 0,
                    },
                    {
                        clipPath: "inset(0px 0px 0px 0px round 0px)",
                        opacity: 1,
                        ease: "power3.inOut",
                        duration: 0.3,
                    },
                )
                // We are turning our ham into X sign. Y value is tried and error value nothing calculated
                .to(
                    barsRef.current.top,
                    {
                        rotate: 45,
                        y: 9,
                        transformOrigin: "center center",
                        ease: "sine.inOut",
                        duration: 0.3,
                    },
                    "<",
                )
                .to(
                    barsRef.current.middle,
                    {
                        scaleX: 0,
                        opacity: 0,
                        ease: "sine.inOut",
                        duration: 0.3,
                    },
                    "<",
                )
                .to(
                    barsRef.current.bottom,
                    {
                        rotate: -45,
                        y: -7.25,
                        transformOrigin: "center center",
                        ease: "sine.inOut",
                        duration: 0.3,
                    },
                    "<",
                )
                .to(
                    navItemsRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        ease: "power3.out",
                        duration: 0.2,
                        stagger: 0.03,
                    },
                    "<0.1",
                )
                .to(
                    socialsRef.current,
                    {
                        opacity: 1,
                        ease: "power3.out",
                        duration: 0.2,
                    },
                    "<0.1",
                );
        });
    }, []);

    // eslint-disable-next-line react-hooks/refs
    const handleMenuOpen = contextSafe(() => {
        // make sure we are not in animation already
        if (isAnimating.current) return;
        isAnimating.current = true;
        // Just play the timeline we created in useGSAP
        menuTlRef.current?.play();
    });
    // eslint-disable-next-line react-hooks/refs
    const handleMenuClose = contextSafe(() => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        // Reverse the timeline
        menuTlRef.current?.reverse();
    });

    return (
        <>
            <header
                ref={headerRef}
                className="invisible fixed top-3 left-[calc(50%-160px)] z-20 flex w-[320px] items-center justify-between rounded-2 bg-bg-base px-4 py-3 shadow-md will-change-transform md:top-4 md:left-[calc(50%-240px)] md:w-120 md:rounded-3 md:px-6 md:py-4 lg:left-[calc(50%-384px)] lg:w-3xl"
            >
                <div className="logo">
                    <h1 className="heading-3 text-base">LUMEA</h1>
                </div>
                <div className="navitems hidden lg:block">
                    <ul className="flex items-center gap-4">
                        {navItems.map((item) => (
                            <li
                                key={item.name}
                                className={`paragraph-2 ${item.isActive ? "text-text-base" : "text-text-subtle"} transition-colors duration-150 ease-initial hover:text-text-base`}
                            >
                                <Link href={item.link}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                    <Button title="Book Now" medium />
                    <div
                        onClick={() => {
                            if (isMenuOpen) {
                                handleMenuClose();
                            } else {
                                handleMenuOpen();
                            }
                        }}
                        className="hamburger lg:hidden"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32">
                            <rect
                                ref={(el) => {
                                    barsRef.current.top = el;
                                }}
                                className="bar top fill-text-base"
                                width="32"
                                height="2"
                                x="2"
                                y="6"
                                rx="2"
                            />
                            <rect
                                ref={(el) => {
                                    barsRef.current.middle = el;
                                }}
                                className="bar middle fill-text-base"
                                width="32"
                                height="2"
                                x="2"
                                y="14.5"
                                rx="2"
                            />
                            <rect
                                ref={(el) => {
                                    barsRef.current.bottom = el;
                                }}
                                className="bar bottom fill-text-base"
                                width="32"
                                height="2"
                                x="2"
                                y="23"
                                rx="2"
                            />
                        </svg>
                    </div>
                </div>
            </header>
            {/* Menu bar for tablet and mobile */}
            <nav
                ref={menuRef}
                className="fixed top-0 right-0 bottom-0 left-0 z-10 hidden w-full flex-col items-center justify-end gap-16 bg-bg-subtle px-6 pb-10 will-change-auto"
            >
                <ul className="menu-items flex w-full max-w-100 flex-col gap-12 md:max-w-150">
                    {navItems.map((item, idx) => (
                        <li
                            key={item.name}
                            ref={(el) => {
                                if (el) navItemsRef.current[idx] = el;
                            }}
                            className="nav-smaller-screen-items min-w-full opacity-0 will-change-transform motion-safe:translate-y-12 motion-reduce:translate-y-0"
                            style={{
                                textAlign: idx === 1 ? "end" : "start",
                                paddingTop: idx === 2 ? "16px" : "0px",
                            }}
                        >
                            <Link
                                href={item.link}
                                className={`heading-1 ${item.isActive ? "text-text-base" : "text-text-subtle"}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul
                    className="nav-smaller-screen-socials flex gap-4 opacity-0"
                    ref={socialsRef}
                >
                    {socialMediaAccounts.map((account) => (
                        <li key={account.title}>
                            <Link
                                href={account.link}
                                target="_blank"
                                className="paragraph-2 text-subtle"
                            >
                                {account.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
