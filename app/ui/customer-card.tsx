import { StaticImageData } from "next/image";
import Image from "next/image";

type Props = {
    src: StaticImageData;
    alt: string;
}

export default function CustomerCard({ src, alt }: Props) {
    return (
        <div className="card relative border border-slate-900 min-w-80 w-80 overflow-hidden cursor-pointer">
            <div className="content-wrapper">
                <Image src={src} alt={alt}  />
                <div className="cursor-animation" />
                <div className="card-animation" />
            </div>
        </div>
    );
}
