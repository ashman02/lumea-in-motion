"use client";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

// we have to register both scroll trigger and scroll smoother
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const SmoothScrollerProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const scrollSmootherRef = useRef<ScrollSmoother>(null);
    useEffect(() => {
        // Before creating kill the previous one
        if (scrollSmootherRef.current) {
            scrollSmootherRef.current.kill();
        }

        scrollSmootherRef.current = ScrollSmoother.create({
            smooth: 1.5,
            effects: true,
            normalizeScroll: true,
            smoothTouch: 0.1,
        });

        // kill the instance before unmount
        return () => {
            if (scrollSmootherRef.current) {
                scrollSmootherRef.current.kill();
            }
        };
    }, []);
    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">{children}</div>
        </div>
    );
};

export default SmoothScrollerProvider;
