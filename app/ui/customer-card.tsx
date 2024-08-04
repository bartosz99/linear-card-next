"use client";

import { useState, useRef } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import styles from "./customer-card.module.css";

type Props = {
  src: StaticImageData;
  alt: string;
};

export default function CustomerCard({ src, alt }: Props) {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dynamicClasses = `${styles.card} ${isTransitioning ? `${styles.cardTransition}` : ""}`;

  const dynamicStyles = {
    "--opacity": opacity,
    "--m-x": `${mouseX}%`,
    "--m-y": `${mouseY}%`,
    "--bg-x": `${50 + (mouseX / 100) * 20}%`,
    "--bg-y": `${50 + (mouseY / 100) * 20}%`,
    "--r-x": `${7 - (mouseX / 100) * 12}deg`,
    "--r-y": `${-11.5 + (mouseY / 100) * 22}deg`,
  } as React.CSSProperties;

  const handleCursorMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const { clientHeight, clientWidth } = e.currentTarget;

    const newMouseX = (offsetX / clientWidth) * 100;
    const newMouseY = (offsetY / clientHeight) * 100;

    setMouseX(newMouseX);
    setMouseY(newMouseY);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsTransitioning(true);
    setMouseX(50);
    setMouseY(50);
    if (!timeoutRef.current) return;
    clearTimeout(timeoutRef.current);
  };

  return (
    <div
      className={`${dynamicClasses} ${styles.card} relative border border-slate-900 min-w-80 w-80 h-96 overflow-hidden cursor-pointer`}
      style={dynamicStyles}
      onMouseMove={handleCursorMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.contentWrapper}>
        <Image src={src} width={1360} height={1680} alt={alt} quality={100} />
        <div className={styles.cursorAnimation} />
        <div className={styles.cardAnimation} />
      </div>
    </div>
  );
}
