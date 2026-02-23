import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

// this is function is only for heading animation of all sections
const headingAnimationFunction = (
    headingElement: HTMLHeadingElement | null,
    triggerSection: HTMLElement | null,
) => {
    const serviceHeadingSplit = SplitText.create(headingElement, {
        type: "lines",
    });
    gsap.from(serviceHeadingSplit.lines, {
        y: "100%",
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
            trigger: triggerSection,
            start: "top 80%",
        },
    });
};

const pinnedHorizontalScrollAnimation = (
    scrollContainer: RefObject<HTMLDivElement | null>,
    wrapperContainer: RefObject<HTMLDivElement | null>,
) => {
    const mm = gsap.matchMedia();
    mm.add(
        {
            isDesktop: "(min-width: 1024px)",
            isTablet: "(min-width: 768px) and (max-width: 1023px)",
            isMobile: "(max-width: 767px)",
        },
        (context) => {
            const { isDesktop, isTablet } = context.conditions as {
                isDesktop: boolean;
                isTablet: boolean;
                isMobile: boolean;
            };

            const getScrollAmountY = () => {
                if (!scrollContainer.current) return 0;
                // we have to consider both sides of padding that is why 128 not 64
                const padding = isDesktop ? 128 : isTablet ? 64 : 48;
                const value =
                    scrollContainer.current.scrollWidth +
                    padding -
                    window.innerWidth;
                return value;
            };
            // we are starting animation from bottom on bigger screens (but we have to improve this one because bigger screens can have bigger heights as well.)
            gsap.to(scrollContainer.current, {
                x: () => -getScrollAmountY(),
                scrollTrigger: {
                    trigger: wrapperContainer.current,
                    start: isDesktop ? "bottom bottom" : "top top",
                    end: () => `+=${getScrollAmountY()}`,
                    pin: true,
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });
        },
    );
};

export { headingAnimationFunction, pinnedHorizontalScrollAnimation };
