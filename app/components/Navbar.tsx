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
    return (
        <header className="fixed top-0 right-0 bottom-0 left-0 z-20 h-screen w-full">
            <nav className="absolute top-4 left-1/2 flex w-3xl -translate-x-1/2 items-center justify-between rounded-3 px-6 py-4 shadow-md backdrop-blur-2xl">
                <div className="logo">
                    <h1 className="heading-3 text-base">LUMEA</h1>
                </div>
                <div className="navitems">
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
                <div className="">
                    <Button title="Book Now" medium />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
