import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const SectionHeader = ({ title }: { title: string }) => {
    const headerRef = useRef<HTMLHeadingElement>(null);
    const reduceMotion = useReducedMotion();
    const isInView = useInView(headerRef, {
        once: true,
        margin: "-10% 0px 0px 0px",
    }); // Similar to start: "top 80%" });

    return (
        <div className="overflow-hidden">
            <motion.h2
                initial={{
                    y: reduceMotion ? "0%" : "100%",
                    opacity: 0,
                }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                    type: "spring",
                    duration: 0.6,
                    bounce: 0,
                }}
                ref={headerRef}
                className="heading-2 max-w-md text-center md:max-w-150 lg:max-w-4xl"
            >
                {title}
            </motion.h2>
        </div>
    );
};

export default SectionHeader;
