"use client";

import { createContext, useContext, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { catalog, isApparel, money, sizes, type ShopProduct } from './catalog';

type Line = { slug: string; size: string; quantity: number };
type CartContextValue = {
  count: number;
  add: (product: ShopProduct, size: string, quantity: number, checkout?: boolean) => void;
  open: () => void;
};
const CartContext = createContext<CartContextValue | null>(null);
const storageKey = 'carrolls-cart-v1';
const emptyCart: Line[] = [];
let cachedLines: Line[] = emptyCart;
let loaded = false;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
const serverSnapshot = () => emptyCart;
const getSnapshot = () => {
  if (!loaded && typeof window !== 'undefined') {
    loaded = true;
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
      if (Array.isArray(saved)) cachedLines = saved.filter((line): line is Line => {
        if (!line || typeof line !== 'object') return false;
        const p = catalog.find(p => p.slug === line.slug);
        return !!p && (isApparel(p) ? sizes.includes(line.size) : line.size === 'One size') && Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 10;
      });
    } catch { /* An unavailable or old local cart starts empty. */ }
  }
  return cachedLines;
};
const setLines = (update: (current: Line[]) => Line[]) => {
  cachedLines = update(getSnapshot());
  try { localStorage.setItem(storageKey, JSON.stringify(cachedLines)); } catch { /* Cart still works in memory. */ }
  listeners.forEach(listener => listener());
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
  const [checkout, setCheckout] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const total = lines.reduce((sum, line) => sum + (catalog.find(p => p.slug === line.slug)?.price ?? 0) * line.quantity, 0);

  const show = (asCheckout = false) => { setCheckout(asCheckout); dialog.current?.showModal(); };
  const add = (product: ShopProduct, size: string, quantity: number, asCheckout = false) => {
    setLines(current => {
      const found = current.find(line => line.slug === product.slug && line.size === size);
      return found ? current.map(line => line === found ? { ...line, quantity: Math.min(10, line.quantity + quantity) } : line) : [...current, { slug: product.slug, size, quantity }];
    });
    show(asCheckout);
  };
  const update = (index: number, quantity: number) => setLines(current => current.flatMap((line, i) => i !== index ? [line] : quantity <= 0 ? [] : [{ ...line, quantity: Math.min(10, quantity) }]));

  return <CartContext.Provider value={{ count, add, open: () => show() }}>
    {children}
    <dialog ref={dialog} className="shop-drawer" aria-labelledby="cart-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="drawer-inner">
        <div className="drawer-heading"><h2 id="cart-title">{checkout ? 'Checkout preview' : 'Your bag'} <span>({count})</span></h2><button autoFocus type="button" aria-label="Close cart" onClick={() => dialog.current?.close()}>×</button></div>
        {count === 0 ? <div className="cart-empty"><span>GOOD GEAR. NEXT STOP.</span><h3>Your bag is taking a breather.</h3><p>Find something with a little Carroll’s character.</p><Link className="shop-primary" href="/shop" onClick={() => dialog.current?.close()}>Explore the merchandise</Link></div> : <>
          <p className="cart-intro">{checkout ? 'Your selected gear, ready for the next step.' : 'A little piece of the garage. All yours.'}</p>
          <div className="cart-lines">{lines.map((line, index) => {
            const p = catalog.find(p => p.slug === line.slug)!;
            return <article className="cart-line" key={`${line.slug}-${line.size}`}>
              <Image src={p.image} alt={p.name} width={100} height={120} />
              <div><Link href={`/products/${p.slug}`} onClick={() => dialog.current?.close()}>{p.name}</Link><p>{p.color} / {line.size}</p><strong>{money(p.price * line.quantity)}</strong><div className="cart-line-bottom"><div className="shop-quantity"><button type="button" aria-label={`Decrease ${p.name} quantity`} onClick={() => update(index, line.quantity - 1)}>−</button><span>{line.quantity}</span><button type="button" disabled={line.quantity >= 10} aria-label={`Increase ${p.name} quantity`} onClick={() => update(index, line.quantity + 1)}>+</button></div><button type="button" className="shop-text-button" onClick={() => update(index, 0)}>Remove</button></div></div>
            </article>;
          })}</div>
          <div className="cart-summary"><div><span>Subtotal</span><strong>{money(total)}</strong></div><p>Shipping and taxes are calculated at checkout.</p>
            {checkout ? <div className="checkout-note" role="status"><b>You’re at the checkout preview.</b><p>Payments aren’t connected in this local design. No order has been placed.</p><button className="shop-secondary" type="button" onClick={() => setCheckout(false)}>Back to your bag</button></div> : <button className="shop-primary" type="button" onClick={() => setCheckout(true)}>Continue to checkout</button>}
            <button type="button" className="continue-shopping" onClick={() => dialog.current?.close()}>Continue shopping</button>
          </div>
        </>}
      </div>
    </dialog>
  </CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('Cart must be used within CartProvider');
  return value;
}
