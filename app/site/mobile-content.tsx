"use client";

import { Children, useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/** A normal desktop grid, with native touch scrolling and controls on mobile. */
export function MobileRail({ children, className, label, dark = false }: {
  children: ReactNode; className: string; label: string; dark?: boolean;
}) {
  const items = Children.toArray(children);
  const track = useRef<HTMLDivElement>(null);
  const trackId = useId();
  const [active, setActive] = useState(0);
  const count = items.length;

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const distances = Array.from(element.children).map(child =>
          Math.abs(child.getBoundingClientRect().left - bounds.left - parseFloat(getComputedStyle(element).paddingLeft || '0'))
        );
        const closest = distances.indexOf(Math.min(...distances));
        setActive(Math.max(0, closest));
      });
    };
    element.addEventListener('scroll', sync, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(element);
    return () => {
      element.removeEventListener('scroll', sync);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [count]);

  const go = (index: number) => {
    const element = track.current;
    const target = element?.children[Math.max(0, Math.min(index, count - 1))] as HTMLElement | undefined;
    if (!element || !target) return;
    const inset = parseFloat(getComputedStyle(element).paddingLeft || '0');
    const left = element.scrollLeft + target.getBoundingClientRect().left - element.getBoundingClientRect().left - inset;
    element.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return <div className={`mobile-rail-shell ${dark ? 'rail-dark' : ''}`} role="group" aria-label={label}>
    <div className={`${className} mobile-rail-track`} id={trackId} ref={track} tabIndex={0}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        const target = event.key === 'ArrowRight' ? active + 1 : event.key === 'ArrowLeft' ? active - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : null;
        if (target === null) return;
        event.preventDefault();
        go(target);
      }}>{items}</div>
    {count > 1 && <div className="mobile-rail-controls">
      <div className="rail-caption"><span>Swipe to explore</span><span role="status" aria-live="polite">{active + 1} / {count}</span></div>
      <div className="rail-navigation">
        <button type="button" aria-label={`Previous ${label}`} aria-controls={trackId} disabled={active === 0} onClick={() => go(active - 1)}>←</button>
        {count <= 4 ? <div className="rail-dots">{items.map((_, index) => <button key={index} type="button" aria-label={`Show ${label} ${index + 1} of ${count}`} aria-current={index === active ? 'true' : undefined} aria-controls={trackId} onClick={() => go(index)}><span/></button>)}</div> : <span className="rail-step-label">One step at a time</span>}
        <button type="button" aria-label={`Next ${label}`} aria-controls={trackId} disabled={active >= count - 1} onClick={() => go(active + 1)}>→</button>
      </div>
    </div>}
  </div>;
}

/** One copy of the content: expanded on desktop, opt-in disclosure on mobile. */
export function MobileReveal({ label, children, className = '', initialOpen = false, heading }: {
  label: string; children: ReactNode; className?: string; initialOpen?: boolean; heading?: string;
}) {
  const [expanded, setExpanded] = useState(initialOpen);
  const contentId = useId();
  return <div className={`mobile-reveal ${className}`} data-expanded={expanded}>
    {heading && <h2 className="reveal-desktop-title">{heading}</h2>}
    <button type="button" className="mobile-reveal-toggle" aria-expanded={expanded} aria-controls={contentId} onClick={() => setExpanded(value => !value)}>
      <span>{label}</span><b aria-hidden="true">{expanded ? '−' : '+'}</b>
    </button>
    <div id={contentId} className="mobile-reveal-content">{children}</div>
  </div>;
}
