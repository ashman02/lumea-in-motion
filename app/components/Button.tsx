"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

interface ButtonProps {
    title: string;
    onBtnClick?: () => void;
    rightIcon?: boolean;
    secondary?: boolean;
    medium?: boolean;
}

gsap.registerPlugin(useGSAP);

const Button = ({
    title,
    onBtnClick,
    rightIcon = false,
    secondary = false,
    medium = false,
}: ButtonProps) => {
    const { contextSafe } = useGSAP();
    const btnTl = useRef<GSAPTimeline>(null);
    const firstTitleRef = useRef<HTMLDivElement>(null);
    const secondTitleRef = useRef<HTMLDivElement>(null);
    const firstIconRef = useRef<SVGSVGElement>(null);
    const secondIconRef = useRef<SVGSVGElement>(null);
    const btnBackgroundOverlayRef = useRef<HTMLDivElement>(null);
    const btnIconBackgroundOverlayRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/refs
    const handleBtnMouseEnter = contextSafe(() => {
        if (btnTl.current) {
            btnTl.current.kill();
        }

        btnTl.current = gsap.timeline({
            defaults: {
                duration: 0.3,
                ease: "sine.inOut",
            },
        });

        btnTl.current
            .to(btnBackgroundOverlayRef.current, {
                scaleY: 1,
            })
            .to(
                firstTitleRef.current,
                {
                    y: -48,
                },
                "<",
            )
            .to(
                secondTitleRef.current,
                {
                    y: 0,
                },
                "<",
            )
            .to(
                firstIconRef.current,
                {
                    x: 48,
                },
                "-=0.25",
            )
            .to(
                secondIconRef.current,
                {
                    y: 0,
                    x: 0,
                },
                "<",
            )
            .to(
                btnIconBackgroundOverlayRef.current,
                {
                    scaleY: 1,
                },
                "<",
            );
    });
    // eslint-disable-next-line react-hooks/refs
    const handleBtnMouseLeave = contextSafe(() => {
        if (btnTl.current) {
            btnTl.current.kill();
        }

        btnTl.current = gsap.timeline({
            defaults: {
                duration: 0.3,
                ease: "sine.inOut",
            },
        });

        btnTl.current
            .to(btnBackgroundOverlayRef.current, {
                scaleY: 0,
            })
            .to(
                secondTitleRef.current,
                {
                    y: 48,
                },
                "<",
            )
            .to(
                firstTitleRef.current,
                {
                    y: 0,
                },
                "<",
            )
            .to(
                firstIconRef.current,
                {
                    x: 0,
                },
                "-=0.25",
            )
            .to(
                secondIconRef.current,
                {
                    y: 48,
                    x: -48,
                },
                "<",
            )
            .to(
                btnIconBackgroundOverlayRef.current,
                {
                    scaleY: 0,
                },
                "<",
            );
    });

    return (
        <button
            onClick={onBtnClick}
            onTouchStart={(e) => {
                e.preventDefault();
            }}
            onTouchEnd={(e) => {
                e.preventDefault();
            }}
            onMouseEnter={handleBtnMouseEnter}
            onMouseLeave={handleBtnMouseLeave}
            className="flex cursor-pointer gap-0"
            style={{
                height: medium ? "40px" : "48px",
            }}
        >
            <div
                className="text-content button-1 relative flex h-full w-full items-center justify-center overflow-hidden rounded-full px-8"
                style={{
                    paddingInline: medium ? "24px" : "32px",
                    backgroundColor: secondary
                        ? "transparent"
                        : "var(--color-bg-brand)",
                    border: secondary
                        ? "1px solid var(--color-border-base-inverse)"
                        : "none",
                }}
            >
                <div
                    ref={firstTitleRef}
                    className="relatve z-10 will-change-transform"
                    style={{
                        color: secondary
                            ? "var(--color-text-base)"
                            : "var(--color-text-on-color)",
                    }}
                >
                    {title}
                </div>
                <div
                    ref={secondTitleRef}
                    className="absolute z-10 translate-y-12 text-text-on-color will-change-transform"
                >
                    {title}
                </div>
                <div
                    ref={btnBackgroundOverlayRef}
                    className="btn-title-background-overlay absolute top-0 right-0 bottom-0 left-0 origin-bottom scale-y-0 rounded-full bg-bg-base-inverse"
                />
            </div>
            <div
                className="icon relative flex h-full items-center justify-center overflow-hidden rounded-full"
                style={{
                    display: rightIcon ? "flex" : "none",
                    backgroundColor: secondary
                        ? "transparent"
                        : "var(--color-bg-brand)",
                    border: secondary
                        ? "1px solid var(--color-border-base-inverse)"
                        : "none",
                    minWidth: medium ? "40px" : "48px",
                }}
            >
                <svg
                    ref={firstIconRef}
                    viewBox="0 0 24 24"
                    height={24}
                    width={24}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                            fill={
                                secondary
                                    ? "var(--color-text-base)"
                                    : "var(--color-text-on-color)"
                            }
                        ></path>
                    </g>
                </svg>
                <svg
                    ref={secondIconRef}
                    viewBox="0 0 24 24"
                    height={24}
                    width={24}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute z-10 -translate-x-12 translate-y-12 -rotate-45"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                            fill="var(--color-text-on-color)"
                        ></path>
                    </g>
                </svg>
                <div
                    ref={btnIconBackgroundOverlayRef}
                    className="btn-icon-background-overlay absolute top-0 right-0 bottom-0 left-0 origin-bottom-left scale-y-0 rounded-full bg-bg-base-inverse"
                />
            </div>
        </button>
    );
};

export default Button;
