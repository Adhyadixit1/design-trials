"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '../shop/cart';

const links = [['/services','Auto repair'],['/shop','Shop merch'],['/about-us','About us'],['/blog','Blog'],['/contact-us','Contact']];
const moreLinks = [['/reviews','Reviews'],['/careers','Careers'],['/financing','Financing'],['/pay-invoice','Pay invoice']];

export default function SiteHeader() {
  const pathname = usePathname();
  const {count,open} = useCart();
  const menu = useRef<HTMLDialogElement>(null);
  const [menuOpen,setMenuOpen] = useState(false);
  const current = (href:string) => pathname === href || pathname.startsWith(href+'/');
  const closeMenu = () => menu.current?.close();

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = () => { if(desktop.matches) menu.current?.close(); };
    desktop.addEventListener('change',closeOnDesktop);
    return () => desktop.removeEventListener('change',closeOnDesktop);
  },[]);

  return <>
    <div className="utility-bar"><p><span>●</span> Family owned · Sumner, WA</p><p>16602 64th St. E. · Sumner, WA</p><a href="tel:+12538632524"><span className="utility-call-label">Call the shop · </span>(253) 863-2524</a><Link className="utility-invoice" href="/pay-invoice">Pay invoice ↗</Link></div>
    <header className="site-header global-header">
      <Link className="brand" href="/" aria-label="Carroll’s Garage home"><Image src="/carrolls-wordmark-transparent.png" width={170} height={62} alt="Carroll’s Garage" priority /></Link>
      <nav aria-label="Primary navigation">{links.map(([href,label])=><Link key={href} href={href} aria-current={current(href)?'page':undefined}>{label}</Link>)}</nav>
      <div className="header-actions">
        <Link className="book-button" href="/appointment">Book service ↗</Link>
        <button className="bag-button" type="button" onClick={open} aria-label={`Open bag with ${count} items`}>Bag <b>{count}</b></button>
        <button className="mobile-menu-toggle" type="button" aria-controls="mobile-navigation" aria-expanded={menuOpen} aria-label="Open navigation menu" onClick={()=>{menu.current?.showModal();setMenuOpen(true);}}><span/><span/></button>
      </div>
    </header>
    <dialog ref={menu} id="mobile-navigation" className="mobile-nav-dialog" aria-labelledby="mobile-nav-title" onClose={()=>setMenuOpen(false)} onClick={e=>{if(e.target===e.currentTarget)closeMenu();}}>
      <div className="mobile-nav-inner">
        <div className="mobile-nav-heading"><span id="mobile-nav-title">YOUR NEXT STOP</span><button type="button" autoFocus onClick={closeMenu} aria-label="Close navigation menu">×</button></div>
        <nav aria-label="Mobile navigation">{[['/','Home'],...links].map(([href,label],i)=><Link key={href} href={href} onClick={closeMenu} aria-current={current(href)?'page':undefined}><small>0{i+1}</small>{label}<span>↗</span></Link>)}</nav>
        <div className="mobile-nav-secondary">{moreLinks.map(([href,label])=><Link key={href} href={href} onClick={closeMenu} aria-current={current(href)?'page':undefined}>{label} ↗</Link>)}</div>
        <Link className="shop-primary" href="/appointment" onClick={closeMenu}>Book a service ↗</Link>
        <a className="mobile-nav-phone" href="tel:+12538632524">(253) 863-2524</a>
        <p>16602 64th St. E. · Sumner, WA</p>
      </div>
    </dialog>
    {!pathname.startsWith('/products/')&&<nav className="mobile-action-dock" aria-label="Quick actions"><a href="tel:+12538632524">Call the shop</a><Link className="dock-book" href="/appointment">Book service ↗</Link>{pathname==='/shop'?<button type="button" onClick={open}>Your bag ({count})</button>:<Link href="/shop">Shop merch</Link>}</nav>}
  </>;
}
