import Image from "next/image";
import { homeData } from "./utils/data";
import Button from "./components/Button";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <section className="hero-section">
                <div className="relative flex h-screen min-h-125 w-full items-center justify-center">
                    <div className="Image-div absolute top-0 right-0 bottom-0 left-0">
                        <Image
                            src={homeData.hero.heroImage}
                            alt="Hero Image"
                            quality={100}
                            fill={true}
                            loading="eager"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-bg-base-inverse opacity-30" />
                    </div>
                    <div className="text-part relative z-10 flex flex-col items-center gap-12 px-6">
                        <div className="headings overflow-hidden">
                            <h1 className="heading-1 flex flex-col items-center justify-center gap-0 text-text-on-color">
                                <span className="text-center">
                                    {homeData.hero.headingPartOne}
                                </span>
                                <span className="text-center">
                                    {homeData.hero.headingPartTwo}
                                </span>
                            </h1>
                        </div>
                        <Link href={"#"}>
                            <Button title={homeData.hero.cta} rightIcon />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
