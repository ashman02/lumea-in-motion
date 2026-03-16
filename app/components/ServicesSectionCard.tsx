import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image, { StaticImageData } from "next/image";
import React, { useRef } from "react";
import usePrefersReducedMotion from "../utils/usePreferReduceMotion";

gsap.registerPlugin(useGSAP);

interface Props {
    treatment: {
        id: number;
        name: string;
        img: StaticImageData;
        services: string[];
    };
}

const ServicesSectionCard = ({ treatment }: Props) => {
    const tl = useRef<GSAPTimeline>(null);
    const serviceCardOverlayRef = useRef<HTMLDivElement>(null);
    const serviceCardTextPartRef = useRef<HTMLDivElement>(null);
    const serviceCardImageRef = useRef<HTMLImageElement>(null);

    const reduceMotion = usePrefersReducedMotion();

    const { contextSafe } = useGSAP(() => {
        if (!serviceCardTextPartRef.current) return;

        // for the sake of smooth animation we are letting gsap to set transform on card
        const mm = gsap.matchMedia();

        mm.add(
            {
                isDesktop: "(min-width: 1024px)",
                reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
                const { isDesktop, reduceMotion } = context.conditions as {
                    isDesktop: boolean;
                    reduceMotion: boolean;
                };

                if (isDesktop && !reduceMotion) {
                    const height = serviceCardTextPartRef.current!.clientHeight;

                    gsap.set(serviceCardTextPartRef.current, {
                        y: height - 33,
                    });
                }
            },
        );

        return () => mm.revert();
    });

    // eslint-disable-next-line react-hooks/refs
    const handleMouseEnterCard = contextSafe(() => {
        // using matchmedia so hover effect wont trigger on smaller screens
        if (window.innerWidth < 1024 || reduceMotion) return;

        if (tl.current) {
            tl.current.kill();
        }
        tl.current = gsap.timeline({
            defaults: {
                duration: 0.3,
                ease: "power2.out",
            },
        });
        tl.current
            .to(serviceCardOverlayRef.current, {
                opacity: 0.4,
            })
            .to(
                serviceCardImageRef.current,
                {
                    scale: 1,
                },
                "<",
            )
            .to(
                serviceCardTextPartRef.current,
                {
                    y: 0,
                },
                "<",
            );
    });
    // eslint-disable-next-line react-hooks/refs
    const handleMouseLeaveCard = contextSafe(() => {
        if (window.innerWidth < 1024 || reduceMotion) return;

        if (!serviceCardTextPartRef.current) return;

        if (tl.current) {
            tl.current.kill();
        }
        tl.current = gsap.timeline({
            defaults: {
                duration: 0.2,
                ease: "power2.out",
            },
        });
        tl.current
            .to(serviceCardOverlayRef.current, {
                opacity: 0.2,
            })
            .to(
                serviceCardImageRef.current,
                {
                    scale: 1.1,
                },
                "<",
            )
            .to(
                serviceCardTextPartRef.current,
                {
                    y: serviceCardTextPartRef.current.clientHeight - 33,
                },
                "<",
            );
    });

    return (
        <div
            onMouseEnter={handleMouseEnterCard}
            onMouseLeave={handleMouseLeaveCard}
            className="relative h-135 w-full shrink-0 overflow-hidden rounded-4 md:max-w-125 md:rounded-5 lg:rounded-6 2xl:aspect-500/540 2xl:h-full 2xl:max-w-1/3"
        >
            <div className="img-container relative h-full w-full">
                <Image
                    ref={serviceCardImageRef}
                    src={treatment.img}
                    alt={treatment.name}
                    width={500}
                    height={540}
                    quality={100}
                    className="h-full w-full object-cover motion-safe:lg:scale-110 motion-safe:lg:will-change-transform"
                />
                <div
                    ref={serviceCardOverlayRef}
                    className="absolute top-0 right-0 bottom-0 left-0 bg-bg-base-inverse opacity-20"
                />
            </div>
            <div
                ref={serviceCardTextPartRef}
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
            </div>
        </div>
    );
};

export default ServicesSectionCard;
