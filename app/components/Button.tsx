import React from "react";

interface ButtonProps {
    title: string;
    onBtnClick?: () => void;
    rightIcon?: boolean;
    secondary?: boolean;
}

const Button = ({
    title,
    onBtnClick,
    rightIcon = false,
    secondary = false,
}: ButtonProps) => {
    return (
        <button onClick={onBtnClick} className="flex h-12 cursor-pointer gap-0">
            <div
                className="text-content button-1 flex h-full w-full items-center justify-center rounded-full px-8"
                style={{
                    backgroundColor: secondary
                        ? "transparent"
                        : "var(--color-bg-brand)",
                    color: secondary
                        ? "var(--color-text-base)"
                        : "var(--color-text-on-color)",
                    border: secondary
                        ? "1px solid var(--color-border-base-inverse)"
                        : "none",
                }}
            >
                {title}
            </div>
            <div
                className="icon flex h-full min-w-12 items-center justify-center rounded-full"
                style={{
                    display: rightIcon ? "flex" : "none",
                    backgroundColor: secondary
                        ? "transparent"
                        : "var(--color-bg-brand)",
                    border: secondary
                        ? "1px solid var(--color-border-base-inverse)"
                        : "none",
                }}
            >
                <svg
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
            </div>
        </button>
    );
};

export default Button;
