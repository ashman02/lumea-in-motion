"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import Button from "./Button";
import {
    AnimatePresence,
    motion,
    MotionConfig,
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
    const headerRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(true);
    const [initialClipPath, setInitialClipPath] = useState<string | null>(null);

    // To know in which direction we are scrolling.
    useMotionValueEvent(scrollY, "change", (current) => {
        if (isMenuOpen) return;
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
            return "inset(16px calc(50% - 160px) calc(100% - 88px) calc(50% - 160px) round 12px)";
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
                      "inset(16px calc(50% - 160px) calc(100% - 88px) calc(50% - 160px) round 12px)",
              },
        open: reduceMotion
            ? { opacity: 1 }
            : { clipPath: "inset(0px 0px 0px 0px round 0px)" },
    };

    // Nav Items Variants
    const navItemVariants = {
        closed: {
            opacity: 0,
            y: reduceMotion ? 0 : 48,
        },
        open: {
            opacity: 1,
            y: 0,
        },
    };

    // Nav social variants
    const navSocialVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 },
    };

    // Hamburger bar variants
    const topBarVariants = {
        closed: {
            rotate: 0,
            y: 0,
        },
        open: {
            rotate: 45,
            y: 9,
        },
    };

    const middleBarVariants = {
        closed: {
            scaleX: 1,
            opacity: 1,
        },
        open: {
            scaleX: 0,
            opacity: 0,
        },
    };

    const bottomBarVariants = {
        closed: {
            rotate: 0,
            y: 0,
        },
        open: {
            rotate: -45,
            y: -7.25,
        },
    };

    return (
        <>
            <motion.header
                ref={headerRef}
                initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : -88,
                    filter: "blur(4px)",
                }}
                animate={
                    isVisible
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : {
                              opacity: 0,
                              y: reduceMotion ? 0 : -88,
                              filter: "blur(4px)",
                          }
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
                        <MotionConfig
                            transition={{
                                type: "spring",
                                duration: 0.2,
                                bounce: 0,
                            }}
                        >
                            <svg width="32" height="32" viewBox="0 0 32 32">
                                <motion.rect
                                    variants={topBarVariants}
                                    animate={isMenuOpen ? "open" : "closed"}
                                    className="bar top fill-text-base"
                                    width="32"
                                    height="2"
                                    x="2"
                                    y="6"
                                    rx="2"
                                />
                                <motion.rect
                                    variants={middleBarVariants}
                                    animate={isMenuOpen ? "open" : "closed"}
                                    className="bar middle fill-text-base"
                                    width="32"
                                    height="2"
                                    x="2"
                                    y="14.5"
                                    rx="2"
                                />
                                <motion.rect
                                    variants={bottomBarVariants}
                                    animate={isMenuOpen ? "open" : "closed"}
                                    className="bar bottom fill-text-base"
                                    width="32"
                                    height="2"
                                    x="2"
                                    y="23"
                                    rx="2"
                                />
                            </svg>
                        </MotionConfig>
                    </div>
                </div>
            </motion.header>

            {/* Menu bar for tablet and mobile */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{
                            type: "spring",
                            duration: 0.3,
                            bounce: 0,
                            delayChildren: 0.1,
                            staggerChildren: 0.02,
                        }}
                        className="fixed top-0 right-0 bottom-0 left-0 z-10 flex w-full flex-col items-center justify-end gap-16 bg-bg-subtle px-6 pb-10 will-change-auto lg:hidden"
                    >
                        <ul className="menu-items flex w-full max-w-100 flex-col gap-12 md:max-w-150">
                            {navItems.map((item, idx) => (
                                <motion.li
                                    variants={navItemVariants}
                                    transition={{
                                        type: "spring",
                                        duration: 0.2,
                                        bounce: 0,
                                    }}
                                    key={item.name}
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
                                </motion.li>
                            ))}
                        </ul>
                        <ul className="nav-smaller-screen-socials flex gap-4">
                            {socialMediaAccounts.map((account) => (
                                <motion.li
                                    key={account.title}
                                    variants={navSocialVariants}
                                    transition={{
                                        type: "spring",
                                        duration: 0.2,
                                        bounce: 0,
                                        delay: 0.25,
                                    }}
                                >
                                    <Link
                                        href={account.link}
                                        target="_blank"
                                        className="paragraph-2 text-subtle"
                                    >
                                        {account.title}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
