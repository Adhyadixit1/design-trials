"use client";

import { useRef } from 'react';
import type { TouchEvent } from 'react';

// Only a deliberate single-finger horizontal swipe changes the image.
// Vertical scrolling and two-finger zoom keep their native behavior.
export function useGallerySwipe(onSwipe: (direction: number) => void) {
  const start = useRef<{x:number;y:number}|null>(null);
  const swiped = useRef(false);
  return {
    onTouchStart(event: TouchEvent) {
      swiped.current = false;
      start.current = event.touches.length === 1 ? {x:event.touches[0].clientX,y:event.touches[0].clientY} : null;
    },
    onTouchMove(event: TouchEvent) {
      if(event.touches.length !== 1) start.current = null;
    },
    onTouchCancel() { start.current = null; },
    onTouchEnd(event: TouchEvent) {
      if(!start.current) return;
      const dx = event.changedTouches[0].clientX-start.current.x;
      const dy = event.changedTouches[0].clientY-start.current.y;
      start.current = null;
      if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)*1.5) {
        swiped.current = true;
        onSwipe(dx<0 ? 1 : -1);
      }
    },
    onClickCapture(event: React.MouseEvent) {
      if(swiped.current) { event.preventDefault();event.stopPropagation();swiped.current=false; }
    },
  };
}

const benefits = [
  ['After-hours access','Drop off or pick up when it works for your schedule.'],
  ['Local shuttle','We’ll help get you where you need to go nearby.'],
  ['Remote approval & pay','Review estimates and handle payment securely from your phone.'],
  ['Comfortable waiting area','Wi-Fi and refreshments if you decide to stay.'],
  ['Fast same-day service','Get back to your day sooner. Ask the shop about availability for your repair.'],
  ['Courtesy 25-point inspection','A free inspection to help you understand your vehicle’s condition and plan ahead.'],
];

export function GarageBenefits() {
  return <div className="garage-benefits">{benefits.map(([title,copy],i)=><details key={title} name="garage-benefits" open={i===0}><summary><h3>{title}</h3><b aria-hidden="true"/></summary><p>{copy}</p></details>)}</div>;
}
