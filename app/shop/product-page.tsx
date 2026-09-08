"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { catalog, isApparel, money, sizes, type ShopProduct } from './catalog';
import { useCart } from './cart';
import SiteHeader from '../site/header';
import { useGallerySwipe } from '../site/interactions';
import { MobileRail, MobileReveal } from '../site/mobile-content';

export default function ProductPage({ product }: { product: ShopProduct }) {
  const apparel = isApparel(product);
  const [size, setSize] = useState(apparel ? '' : 'One size');
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const sizeDialog = useRef<HTMLDialogElement>(null);
  const zoomDialog = useRef<HTMLDialogElement>(null);
  const purchaseArea = useRef<HTMLDivElement>(null);
  const sizeArea = useRef<HTMLFieldSetElement>(null);
  const { add } = useCart();
  const related = catalog.filter(p => p.slug !== product.slug).slice(0, 4);
  const swipe = useGallerySwipe(direction => setView(current => (current + direction + 2) % 2));

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setSticky(!entry.isIntersecting && entry.boundingClientRect.bottom < 0), { threshold: 0 });
    if (purchaseArea.current) observer.observe(purchaseArea.current);
    return () => observer.disconnect();
  }, []);

  const purchase = (checkout = false) => {
    if (!size) {
      setSizeError(true);
      sizeArea.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
      sizeArea.current?.querySelector('button')?.focus({ preventScroll: true });
      return;
    }
    add(product, size, quantity, checkout);
  };

  return <main className="pdp">
    <SiteHeader/>
    <div className="pdp-shell">
      <nav className="shop-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/shop">Garage goods</Link><span>/</span><span>{product.name}</span></nav>
      <section className="pdp-main" aria-labelledby="product-title">
        <div className="pdp-gallery" {...swipe}>
          <button type="button" className={`pdp-main-image ${view === 1 ? 'detail-view' : ''}`} onClick={() => zoomDialog.current?.showModal()} aria-label={`Enlarge ${product.name} ${view === 1 ? 'detail' : 'front'} image`}>
            <span className="pdp-edition">THE GARAGE COLLECTION · 01</span>
            <Image src={product.image} alt={`${product.name}, ${view === 1 ? 'graphic detail' : product.color}`} width={1254} height={1254} sizes="(max-width: 760px) 100vw, 58vw" priority />
            <span className="pdp-zoom-label">{view === 1 ? 'Graphic detail' : 'Front view'}<b>Zoom ↗</b></span>
          </button>
          <div className="pdp-thumbnails" aria-label="Product images">
            {[0, 1].map(index => <button type="button" className={`${view === index ? 'selected' : ''} ${index === 1 ? 'detail-view' : ''}`} aria-label={index === 0 ? 'Show front view' : 'Show graphic detail'} aria-pressed={view === index} onClick={() => setView(index)} key={index}><Image src={product.image} alt="" width={92} height={92} /></button>)}
            <p>THE DETAILS MAKE<br />THE DIFFERENCE.</p><span role="status">0{view + 1} / 02</span>
          </div>
          <p className="swipe-hint">Swipe to see the detail. Tap the image to zoom.</p>
        </div>
        <div className="pdp-info">
          <p className="shop-kicker">CARROLL’S ORIGINALS / {product.category}</p>
          <h1 id="product-title">{product.name}</h1>
          <div className="pdp-price"><strong>{money(product.price)}</strong><span>USD</span><a href="#product-details">Explore the details ↓</a></div>
          <p className="pdp-description">{apparel ? 'Your everyday uniform, with a little garage character. The Carroll’s badge, an easy-going fit, and a look that belongs everywhere the road takes you.' : 'A little piece of Carroll’s, wherever you go. Familiar garage graphics meet everyday essentials in the original shop collection.'}</p>
          <div className="pdp-color"><span>Color: <b>{product.color}</b></span><button type="button" aria-label={`${product.color}, selected`} aria-pressed="true" className={`color-swatch ${product.group === 'hoodies' ? 'navy-swatch' : ''}`} /></div>
          <fieldset className={`pdp-sizes ${sizeError ? 'has-error' : ''}`} ref={sizeArea} aria-describedby={sizeError ? 'size-error' : undefined}>
            <legend>Size <span>{size ? `/ ${size}` : '/ Select your fit'}</span></legend>
            {apparel && <button className="size-guide-link" type="button" onClick={() => sizeDialog.current?.showModal()}>Size guide ↗</button>}
            <div className="size-options">{(apparel ? sizes : ['One size']).map(option => <button type="button" aria-pressed={size === option} className={size === option ? 'selected' : ''} key={option} onClick={() => { setSize(option); setSizeError(false); }}>{option}</button>)}</div>
            {sizeError && <p id="size-error" className="size-error" role="alert">Choose a size to continue.</p>}
          </fieldset>
          <div className="pdp-fit-note"><span>↔</span><p>{apparel ? 'Relaxed silhouette. Find your fit in the size guide.' : 'One size. See product details below.'}</p></div>
          <div ref={purchaseArea} className="pdp-purchase">
            <div className="pdp-add-row"><div className="shop-quantity"><button type="button" aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity(q => q - 1)}>−</button><output aria-label="Quantity" aria-live="polite">{quantity}</output><button type="button" aria-label="Increase quantity" disabled={quantity === 10} onClick={() => setQuantity(q => q + 1)}>+</button></div><button className="shop-primary" type="button" onClick={() => purchase()}>Add to cart <span>{money(product.price * quantity)}</span></button></div>
            <button type="button" className="shop-buy-now" onClick={() => purchase(true)}>Buy now <span>→</span></button>
          </div>
          <p className="pdp-checkout-note">Shipping & taxes calculated at checkout.</p>
          <div className="pdp-benefits"><div><b>↗</b><span>From a real<br />family-owned garage</span></div><div><b>◎</b><span>Original Carroll’s<br />badge artwork</span></div><div><b>↔</b><span>Fit information<br />before you buy</span></div></div>
          <div className="pdp-accordions">
            <details><summary>Shipping & delivery <span>+</span></summary><p>Production timing, delivery estimates, and shipping rates will be confirmed when the merchandise collection launches.</p></details>
            <details><summary>Returns & exchanges <span>+</span></summary><p>The merchandise returns policy will be published before ordering opens. For questions about the collection, <a href="mailto:carrolls_garage@yahoo.com">email the garage</a>.</p></details>
          </div>
          <p className="pdp-sample-note">Collection preview · Sample product, pricing and fit details.</p>
        </div>
      </section>
    </div>

    <nav className="pdp-section-nav" aria-label="Product information"><a href="#product-details">The details</a><a href="#fit-care">Fit & care</a><a href="#garage-story">Behind the badge</a><a href="#related-products">Complete your kit</a></nav>

    <section className="pdp-detail-section" id="product-details">
      <div className="pdp-detail-copy"><p className="shop-kicker">01 / THE DETAILS</p><h2>A little shop pride.<br />A lot of everyday wear.</h2><MobileReveal label="About this design"><p>{apparel ? 'Wear it for the coffee run, the weekend project, or the long way home. This collection starts with the sign over our door and ends with something you can make your own.' : 'Good garage character travels well. Take the Carroll’s badge from the service bay to the everyday with goods made for your own routine.'}</p></MobileReveal><MobileRail className="detail-points" label="product detail"><article><span>01</span><div><h3>The original badge</h3><p>Our familiar blue-and-gold mark takes center stage.</p></div></article><article><span>02</span><div><h3>{apparel ? 'An easy silhouette' : 'Everyday character'}</h3><p>{apparel ? 'A laid-back shape that pairs with the gear you already wear.' : 'The garage identity, in a piece that fits your day.'}</p></div></article><article><span>03</span><div><h3>Rooted in Sumner</h3><p>A collection with a real neighborhood shop behind it.</p></div></article></MobileRail></div>
      <div className="pdp-detail-art"><Image src={product.image} alt={`${product.name} artwork close-up`} width={1254} height={1254} sizes="(max-width: 760px) 100vw, 50vw" /><span>CARROLL’S / ORIGINAL SHOP GOODS</span></div>
    </section>

    <section className="pdp-fit-section" id="fit-care"><div><p className="shop-kicker">02 / THE GOOD-TO-KNOWS</p><h2>Get the details.<br />Find your fit.</h2><p>Everything you want to know before it becomes part of your rotation.</p>{apparel && <button className="shop-secondary" type="button" onClick={() => sizeDialog.current?.showModal()}>Open the size guide ↗</button>}</div><div className="pdp-faq">
      <details open><summary>How does it fit?<span>−</span></summary><p>{apparel ? 'The concept uses a relaxed, unisex silhouette. Compare a favorite garment with the sample measurements in the size guide. Final measurements will follow the selected garment.' : 'This concept is offered in one size. Final dimensions and specifications will be confirmed for the launch collection.'}</p></details>
      <details><summary>What is it made from?<span>+</span></summary><p>{product.group === 'tees' ? 'A heavyweight cotton tee is the proposed base for this design.' : product.group === 'hoodies' ? 'A soft fleece hoodie is the proposed base for this design.' : 'Materials and construction will follow the final selected product.'} Exact composition and weight will be confirmed before launch.</p></details>
      <details><summary>How should I care for it?<span>+</span></summary><p>Follow the final garment’s care label. For printed apparel, a cool wash inside out and gentle drying help protect the graphic.</p></details>
      <details><summary>Can I visit the garage too?<span>+</span></summary><p>Absolutely. Find Carroll’s Garage at 16602 64th St. E., Sumner, WA. <Link href="/appointment">Explore service and appointments →</Link></p></details>
    </div></section>

    <section className="pdp-story" id="garage-story"><Image src="/carrolls-garage-1930s.png" alt="Historic garage photograph from the Carroll’s archive" width={1416} height={1111} sizes="(max-width: 760px) 100vw, 50vw" /><div><p className="shop-kicker">03 / BEHIND THE BADGE</p><h2>There’s a real garage<br />behind this graphic.</h2><MobileReveal label="Meet the garage behind the badge"><p>Carroll’s is a family-owned repair shop in Sumner, Washington. The merchandise is another way to carry a little of that neighborhood spirit with you.</p></MobileReveal><Link href="/about-us">Meet Carroll’s Garage <span>↗</span></Link></div></section>

    <section className="pdp-related" id="related-products"><div className="related-heading"><div><p className="shop-kicker">04 / COMPLETE YOUR KIT</p><h2>Good company for your gear.</h2></div><Link href="/shop">Shop all merchandise ↗</Link></div><div className="related-grid">{related.map(p => <Link href={`/products/${p.slug}`} className="related-card" key={p.slug}><div><Image src={p.image} alt={p.name} width={600} height={600} sizes="(max-width: 760px) 50vw, 25vw" /><span>Shop now ↗</span></div><p>{p.category}</p><h3>{p.name}</h3><strong>{money(p.price)}</strong></Link>)}</div></section>

    <div className="pdp-footer"><Link href="/">CARROLL’S GARAGE</Link><span>SUMNER, WASHINGTON</span><Link href="/shop">Keep exploring the shop ↗</Link></div>

    {sticky && <div className="pdp-sticky-cart"><Image src={product.image} alt="" width={48} height={48} /><div><strong>{product.name}</strong><span>{money(product.price)} · {size || 'Choose your size'}</span></div><button type="button" className="shop-primary" onClick={() => purchase()}>{size ? 'Add to cart' : 'Choose size'} <span>→</span></button></div>}

    <dialog ref={sizeDialog} className="shop-size-dialog" aria-labelledby="size-title"><div className="drawer-heading"><h2 id="size-title">Find your fit</h2><button type="button" aria-label="Close size guide" onClick={() => sizeDialog.current?.close()}>×</button></div><p>Lay your favorite {product.group === 'hoodies' ? 'hoodie' : 'tee'} flat. Measure across the chest and from shoulder to hem.</p><div className="unit-toggle">{(['in', 'cm'] as const).map(u => <button type="button" aria-pressed={unit === u} key={u} onClick={() => setUnit(u)}>{u === 'in' ? 'Inches' : 'Centimeters'}</button>)}</div><table><caption>Sample garment measurements · {unit}</caption><thead><tr><th>Size</th><th>Chest width</th><th>Length</th></tr></thead><tbody>{sizes.map((s, i) => <tr key={s}><th>{s}</th><td>{((18 + i * 2) * (unit === 'cm' ? 2.54 : 1)).toFixed(unit === 'cm' ? 1 : 0)}</td><td>{((28 + i) * (unit === 'cm' ? 2.54 : 1)).toFixed(unit === 'cm' ? 1 : 0)}</td></tr>)}</tbody></table><p className="pdp-sample-note">Illustrative measurements for the design preview. Final sizing depends on the approved garment.</p></dialog>
    <dialog ref={zoomDialog} className="shop-zoom-dialog" aria-label="Enlarged product image"><button type="button" aria-label="Close enlarged image" onClick={() => zoomDialog.current?.close()}>Close ×</button><Image src={product.image} alt={product.name} width={1254} height={1254} sizes="90vw" /></dialog>
  </main>;
}
