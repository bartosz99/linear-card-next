'use client';

import { useState } from 'react';
import { StaticImageData } from "next/image";
import Image from "next/image";
import styles from "./customer-card.module.css";

type Props = {
    src: StaticImageData;
    alt: string;
}

export default function CustomerCard({ src, alt }: Props) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);
  const [backgroundX, setBackgroundX] = useState(50);
  const [backgroundY, setBackgroundY] = useState(50);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const dynamicClasses = `${styles.card} ${isTransitioning ? 'cardTransition' : ''}`;

  const dynamicStyles = {
    '--opacity': opacity,
    '--m-x': `${mouseX}%`,
    '--m-y': `${mouseY}%`,
    '--bg-x': `${backgroundX}%`,
    '--bg-y': `${backgroundY}%`,
    '--r-x': `${rotateX}deg`,
    '--r-y': `${rotateY}deg`
  } as React.CSSProperties

  const handleCursorMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, offsetY, srcElement } = e.nativeEvent;
    if (srcElement instanceof HTMLElement) {
      const width = srcElement.offsetWidth;
      const height = srcElement.offsetHeight;

      setMouseX(Number(((offsetX / width) * 100).toFixed(2)));
      setMouseY(Number(((offsetY / height) * 100).toFixed(2)));
      setBackgroundX(50 + (mouseX / 100) * 20);
      setBackgroundY(50 + (mouseY / 100) * 20);
      setRotateX(6 - (mouseX / 100) * 12);
      setRotateY(-11 + (mouseY / 100) * 22);
    }
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
    setIsTransitioning(false);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsTransitioning(true);
  };


    return (
        <div
            className={`${dynamicClasses} ${styles.card} relative border border-slate-900 min-w-80 w-80 overflow-hidden cursor-pointer`}
            style={dynamicStyles}
            onMouseMove={handleCursorMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.contentWrapper}>
                <Image src={src} alt={alt}  />
                <div className={styles.cursorAnimation} />
                <div className={styles.cardAnimation} />
            </div>
        </div>
    );
}
