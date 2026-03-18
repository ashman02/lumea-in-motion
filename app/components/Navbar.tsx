"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import Button from "./Button";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
} from "motion/react";


const Navbar = () => {
    const path = usePathname();
    const reduceMotion = useReducedMotion();

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

    // is menu bar open or not
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const barsRef = useRef({
        top: null as SVGRectElement | null,
        middle: null as SVGRectElement | null,
        bottom: null as SVGRectElement | null,
    });
    const navItemsRef = useRef<HTMLLIElement[]>([]);
    const socialsRef = useRef<HTMLUListElement>(null);
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(true);
    const [initialClipPath, setInitialClipPath] = useState<string | null>(null);

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() || 0;
        const diff = current - previous;

        // Always show near top
        if (current < 80) {
            setIsVisible(true);
            return;
        }

        // Threshold to prevent jitter
        if (Math.abs(diff) < 10) return;

        // Update visibility based on direction
        setIsVisible(diff < 0); // true when scrolling up
    });

    // Instead of guessing get the original values of header left right top bottom
    const getHeaderClip = () => {
        if (!headerRef.current) {
            // Fallback: use a small centered rectangle as placeholder
            return "inset(20px calc(50% - 160px) calc(100% - 60px) calc(50% - 160px) round 12px)";
        }
        const rect = headerRef.current.getBoundingClientRect();

        const top = rect.top;
        const left = rect.left;
        const right = window.innerWidth - rect.right;
        const bottom = window.innerHeight - rect.bottom;

        // we should be using round 8px for mobile. (we will fix this later even in css)
        return `inset(${top}px ${right}px ${bottom}px ${left}px round 12px)`;
    };

    // menu variants
    const menuVariants = {
        closed: reduceMotion
            ? { opacity: 0, clipPath: "inset(0px 0px 0px 0px round 0px)" }
            : {
                  clipPath:
                      initialClipPath ||
                      "inset(20px calc(50% - 160px) calc(100% - 60px) calc(50% - 160px) round 12px)",
              },
        open: reduceMotion
            ? { opacity: 1 }
            : { clipPath: "inset(0px 0px 0px 0px round 0px)" },
    };

    return (
        <>
            <motion.header
                ref={headerRef}
                initial={{ opacity: 0, y: reduceMotion ? 0 : -88 }}
                animate={
                    isVisible
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: reduceMotion ? 0 : -88 }
                }
                transition={{
                    type: "spring",
                    duration: isVisible ? 0.4 : 0.22,
                    bounce: 0,
                }}
                className="fixed top-3 left-[calc(50%-160px)] z-20 flex w-[320px] items-center justify-between rounded-2 bg-bg-base px-4 py-3 shadow-md will-change-transform md:top-4 md:left-[calc(50%-240px)] md:w-120 md:rounded-3 md:px-6 md:py-4 lg:left-[calc(50%-384px)] lg:w-3xl"
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
                        className="hamburger lg:hidden"
                        onClick={() => {
                            // Calculate clip path before opening menu
                            if (!isMenuOpen && headerRef.current) {
                                setInitialClipPath(getHeaderClip());
                            }
                            setIsMenuOpen((prev) => !prev);
                        }}
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
            </motion.header>

            {/* Menu bar for tablet and mobile */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        ref={menuRef}
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{
                            type: "spring",
                            duration: 0.3,
                            bounce: 0,
                        }}
                        className="fixed top-0 right-0 bottom-0 left-0 z-10 flex w-full flex-col items-center justify-end gap-16 bg-bg-subtle px-6 pb-10 will-change-auto lg:hidden"
                    >
                        <ul className="menu-items flex w-full max-w-100 flex-col gap-12 md:max-w-150">
                            {navItems.map((item, idx) => (
                                <li
                                    key={item.name}
                                    ref={(el) => {
                                        if (el) navItemsRef.current[idx] = el;
                                    }}
                                    className="nav-smaller-screen-items min-w-full will-change-transform"
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
                            className="nav-smaller-screen-socials flex gap-4"
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
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
