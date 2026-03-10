"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";
import Button from "./Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Navbar = () => {
    const path = usePathname();

    // is menu bar open or not
    const isMenuOpen = useRef<boolean>(false);
    const menuTlRef = useRef<GSAPTimeline>(null);
    const menuRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const isAnimating = useRef<boolean>(false);

    const { contextSafe } = useGSAP(() => {
        gsap.from(headerRef.current, {
            yPercent: -150,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
        });
        gsap.from(menuRef.current, {
            yPercent: -150,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
        });
        // we are using matchmedia because for mobile and tablet we have to animate menu as well
        const mm = gsap.matchMedia();
        mm.add(
            {
                isDesktop: "(min-width: 1024px)",
                isTablet: "(min-width: 768px) and (max-width: 1023px)",
                isMobile: "(max-width: 767px)",
            },
            (context) => {
                const { isDesktop } = context.conditions as {
                    isDesktop: boolean;
                };

                let lastScroll = 0;
                const threshold = 10; // prevents micro scroll jitter

                // we have defined tweens and play them according to our need
                const showAnim = gsap
                    .from(headerRef.current, {
                        y: -88,
                        paused: true,
                        duration: 0.25,
                        ease: "power2.out",
                    })
                    .progress(1);
                const showAnimMenu = gsap
                    .from(menuRef.current, {
                        y: -88,
                        paused: true,
                        duration: 0.25,
                        ease: "power2.out",
                    })
                    .progress(1);

                ScrollTrigger.create({
                    start: "top top",
                    end: 99999,
                    onUpdate: (self) => {
                        if (isMenuOpen.current) return;

                        const scroll = self.scroll();
                        const diff = scroll - lastScroll;

                        // always show navbar near top
                        if (scroll < 80) {
                            showAnim.play();
                            if (!isDesktop) {
                                showAnimMenu.play();
                            }
                            lastScroll = scroll;
                            return;
                        }

                        // ignore micro movements
                        if (Math.abs(diff) < threshold) return;

                        if (diff > 0) {
                            // scrolling down
                            showAnim.timeScale(1.8).reverse();
                            if (!isDesktop) {
                                showAnimMenu.timeScale(1.8).reverse();
                            }
                        } else {
                            // scrolling up
                            showAnim.timeScale(1).play();
                            if (!isDesktop) {
                                showAnimMenu.timeScale(1).play();
                            }
                        }

                        lastScroll = scroll;
                    },
                });
            },
        );
    }, []);

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

    // eslint-disable-next-line react-hooks/refs
    const handleMenuOpen = contextSafe(() => {
        // make sure we are not in animation already
        if (isAnimating.current) return;
        if (menuTlRef.current) menuTlRef.current.kill();
        isAnimating.current = true;

        const startClip = getHeaderClip();
        menuTlRef.current = gsap.timeline({
            onComplete: () => {
                isMenuOpen.current = true;
                isAnimating.current = false;
            },
        });
        // we are using fromTo because simple to was not working animation was like opening a book
        menuTlRef.current
            .fromTo(
                menuRef.current,
                { clipPath: startClip },
                {
                    clipPath: "inset(0px 0px 0px 0px round 0px)",
                    ease: "sine.inOut",
                    duration: 0.3,
                },
            )
            // We are turning our ham into X sign. Y value is tried and error value nothing calculated
            .to(
                ".bar.top",
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
                ".bar.middle",
                { scaleX: 0, opacity: 0, ease: "sine.inOut", duration: 0.3 },
                "<",
            )
            .to(
                ".bar.bottom",
                {
                    rotate: -45,
                    y: -7.25,
                    transformOrigin: "center center",
                    ease: "sine.inOut",
                    duration: 0.3,
                },
                "<",
            )
            .to(".nav-smaller-screen-items", {
                opacity: 1,
                y: 0,
                ease: "power3.out",
                duration: 0.2,
                stagger: 0.03,
            })
            .to(".nav-smaller-screen-socials", {
                opacity: 1,
                ease: "power3.out",
                duration: 0.2,
            });
    });
    // eslint-disable-next-line react-hooks/refs
    const handleMenuClose = contextSafe(() => {
        if (isAnimating.current) return;
        if (menuTlRef.current) menuTlRef.current.kill();
        const endClip = getHeaderClip();
        isAnimating.current = true;
        menuTlRef.current = gsap.timeline({
            onComplete: () => {
                isMenuOpen.current = false;
                isAnimating.current = false;
            },
        });
        menuTlRef.current

            .to(".nav-smaller-screen-items", {
                opacity: 0,
                y: 48,
                ease: "power3.out",
                duration: 0.2,
            })
            .to(
                ".nav-smaller-screen-socials",
                {
                    opacity: 0,
                    ease: "power3.out",
                    duration: 0.2,
                },
                "<",
            )
            .fromTo(
                menuRef.current,
                { clipPath: "inset(0px 0px 0px 0px round 0px)" },
                { clipPath: endClip, ease: "sine.inOut", duration: 0.2 },
                "<",
            )
            .to(
                ".bar.top",
                {
                    rotate: 0,
                    y: 0,
                    ease: "sine.inOut",
                    duration: 0.3,
                },
                "<",
            )
            .to(
                ".bar.middle",
                { scaleX: 1, opacity: 1, ease: "sine.inOut", duration: 0.3 },
                "<",
            )
            .to(
                ".bar.bottom",
                {
                    rotate: 0,
                    y: 0,
                    ease: "sine.inOut",
                    duration: 0.3,
                },
                "<",
            );
    });

    return (
        <>
            <header
                ref={headerRef}
                className="fixed top-3 left-[calc(50%-160px)] z-20 flex w-[320px] items-center justify-between rounded-2 bg-bg-base px-4 py-3 shadow-md md:top-4 md:left-[calc(50%-240px)] md:w-120 md:rounded-3 md:px-6 md:py-4 lg:left-[calc(50%-384px)] lg:w-3xl"
            >
                <div className="logo">
                    <h1 className="heading-3 text-base">LUMEA</h1>
                </div>
                <div className="navitems hidden lg:block">
                    <ul className="flex items-center gap-4">
                        {navItems.map((item) => (
                            <li
                                key={item.name}
                                className="paragraph-2 text-base"
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
                            if (isMenuOpen.current) {
                                handleMenuClose();
                            } else {
                                handleMenuOpen();
                            }
                        }}
                        className="hamburger lg:hidden"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32">
                            <rect
                                className="bar top fill-text-base"
                                width="32"
                                height="2"
                                x="2"
                                y="6"
                                rx="2"
                            />
                            <rect
                                className="bar middle fill-text-base"
                                width="32"
                                height="2"
                                x="2"
                                y="14.5"
                                rx="2"
                            />
                            <rect
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
                className="fixed top-0 right-0 bottom-0 left-0 z-10 flex w-full flex-col items-center justify-end gap-16 bg-bg-subtle px-6 pb-10 will-change-[clip-path] [clip-path:inset(12px_calc(50%-160px)_calc(100vh-76px)_round_12px)] md:[clip-path:inset(16px_calc(50%-240px)_calc(100vh-88px)_round_12px)] lg:hidden lg:[clip-path:inset(16px_calc(50%-384px)_calc(100vh-88px)_round_12px)]"
            >
                <ul className="menu-items flex w-full max-w-100 flex-col gap-12 md:max-w-150">
                    {navItems.map((item, idx) => (
                        <li
                            key={item.name}
                            className="nav-smaller-screen-items min-w-full translate-y-12 opacity-0"
                            style={{
                                textAlign: idx === 1 ? "end" : "start",
                                paddingTop: idx === 2 ? "16px" : "0px",
                            }}
                        >
                            <Link
                                href={item.link}
                                className="heading-1 text-base"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className="nav-smaller-screen-socials flex gap-4 opacity-0">
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
