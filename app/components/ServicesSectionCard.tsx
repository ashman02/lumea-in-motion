import { useReducedMotion, motion, MotionConfig } from "motion/react";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface Props {
    treatment: {
        id: number;
        name: string;
        img: StaticImageData;
        services: string[];
    };
}

const ServicesSectionCard = ({ treatment }: Props) => {
    const reduceMotion = useReducedMotion();
    const serviceCardTextPartRef = useRef<HTMLDivElement>(null);
    const [textOffsetY, setTextOffsetY] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            const desktop = window.matchMedia("(min-width: 1024px)").matches;
            setIsDesktop(desktop);

            // Calculate offset only on desktop
            if (desktop && serviceCardTextPartRef.current) {
                const height = serviceCardTextPartRef.current.clientHeight;
                setTextOffsetY(height - 33);
            } else {
                setTextOffsetY(0);
            }
        };
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    const shouldAnimate = isDesktop && !reduceMotion;

    // ============================================
    // ANIMATION VARIANTS
    // ============================================

    // Container variant - controls all children
    const cardVariants = {
        rest: {},
        hover: {},
    };

    // Overlay variant
    const overlayVariants = {
        rest: {
            opacity: 0.2,
        },
        hover: {
            opacity: 0.4,
        },
    };

    // Image variant
    const imageVariants = {
        rest: {
            scale: shouldAnimate ? 1.1 : 1,
        },
        hover: {
            scale: 1,
        },
    };

    // Text variant
    const textVariants = {
        rest: {
            y: shouldAnimate ? textOffsetY : 0,
        },
        hover: {
            y: 0,
        },
    };

    return (
        <MotionConfig transition={{ type: "spring", duration: 0.3, bounce: 0 }}>
            <motion.div
                key={textOffsetY}
                variants={cardVariants}
                initial="rest"
                whileHover={shouldAnimate ? "hover" : "rest"}
                className="relative motion-safe:h-full w-full shrink-0 overflow-hidden rounded-4 h-135 md:rounded-5 motion-safe:md:max-w-125 lg:rounded-6 2xl:aspect-500/540 2xl:h-full motion-safe:2xl:max-w-1/3"
            >
                <div className="img-container relative h-full w-full">
                    <motion.div
                        variants={imageVariants}
                        className="h-full w-full motion-safe:lg:will-change-transform"
                    >
                        <Image
                            src={treatment.img}
                            alt={treatment.name}
                            width={500}
                            height={540}
                            quality={100}
                            className="h-full w-full object-cover"
                        />
                    </motion.div>
                    <motion.div
                        variants={overlayVariants}
                        className="absolute top-0 right-0 bottom-0 left-0 bg-bg-base-inverse"
                    />
                </div>
                <motion.div
                    ref={serviceCardTextPartRef}
                    variants={textVariants}
                    className="text-details absolute bottom-6 left-6 z-10 flex flex-col gap-4 motion-safe:lg:will-change-transform"
                >
                    <h3 className="heading-3-body text-text-on-color">
                        {treatment.name}
                    </h3>
                    <div className="services flex flex-col gap-0">
                        {treatment.services.map((service) => (
                            <span
                                key={service}
                                className="paragraph-2 text-text-on-color"
                            >
                                {service}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </MotionConfig>
    );
};

export default ServicesSectionCard;
