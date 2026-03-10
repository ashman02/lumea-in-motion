"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Button from "./Button";

const Navbar = () => {
    const path = usePathname();
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
    return (
        <header className="fixed top-0 right-0 bottom-0 left-0 z-20 flex items-end justify-center bg-bg-subtle [clip-path:inset(12px_calc(50%-160px)_calc(-76px+100lvh)_calc(50%-160px)_round_12px)] md:[clip-path:inset(16px_calc(50%-240px)_calc(-88px+100lvh)_calc(50%-240px)_round_12px)] lg:[clip-path:inset(16px_calc(50%-384px)_calc(-88px+100lvh)_calc(50%-384px)_round_12px)]">
            <nav className="absolute top-3 left-[calc(50%-160px)] flex w-[320px] items-center justify-between rounded-2 bg-bg-base px-4 py-3 shadow-md md:top-4 md:left-[calc(50%-240px)] md:w-120 md:rounded-3 md:px-6 md:py-4 lg:left-[calc(50%-384px)] lg:w-3xl">
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
                    <div className="hamburger lg:hidden">
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
            </nav>
            {/* Menu bar for tablet and mobile */}
            <div className="flex w-full max-w-100 flex-col items-center gap-16 px-6 pb-10 md:max-w-150 lg:hidden">
                <ul className="menu-items flex w-full flex-col gap-12">
                    {navItems.map((item, idx) => (
                        <li
                            key={item.name}
                            className="min-w-full"
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
                <ul className="socials flex gap-4">
                    {socialMediaAccounts.map((account) => (
                        <li key={account.title}>
                            <Link
                                href={account.link}
                                className="paragraph-2 text-subtle"
                            >
                                {account.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
