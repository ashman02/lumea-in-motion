import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image, { StaticImageData } from "next/image";
import React, { useRef } from "react";

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
    const tl = useRef<gsap.core.Timeline>(null);
    const serviceCardOverlayRef = useRef<HTMLDivElement>(null);
    const serviceCardTextPartRef = useRef<HTMLDivElement>(null);
    const serviceCardImageRef = useRef<HTMLImageElement>(null);

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

                    // Create the timeline to use in handlers and pause it initially
                    tl.current = gsap
                        .timeline({
                            paused: true,
                            defaults: {
                                duration: 0.3,
                                ease: "power2.inOut",
                            },
                        })
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
                }
            },
        );

        return () => mm.revert();
    });

    // eslint-disable-next-line react-hooks/refs
    const handleMouseEnterCard = contextSafe(() => {
        tl.current?.play();
    });
    // eslint-disable-next-line react-hooks/refs
    const handleMouseLeaveCard = contextSafe(() => {
        tl.current?.timeScale(1.5).reverse();
    });

    return (
        <div
            onMouseEnter={handleMouseEnterCard}
            onMouseLeave={handleMouseLeaveCard}
            className="motion-safe:2xl:max-w-1/3 relative h-135 w-full shrink-0 overflow-hidden rounded-4 md:rounded-5 motion-safe:md:max-w-125 lg:rounded-6 2xl:aspect-500/540 2xl:h-full"
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
