import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

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

export {headingAnimationFunction}
