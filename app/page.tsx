"use client";

import { useMemo, useState } from "react";
import Link from 'next/link';
import SiteHeader from './site/header';
import { SiteFooter } from './site/frame';
import { homeServiceSlugs } from './site/content';
import { productHref } from './shop/catalog';
import { HomeWelcome, HomeGallery, HomeServiceHighlights, HomeWarranty, HomeFinance, HomeReviews, HomeAreas, HomeBlog } from './site/home-sections';
import { GarageBenefits } from './site/interactions';
import { MobileRail, MobileReveal } from './site/mobile-content';

type ServiceKey = "diagnostics" | "diesel" | "brakes" | "maintenance" | "electrical" | "fleet";
type ProductGroup = "tees" | "hoodies" | "headwear" | "goods";

type Product = {
  name: string;
  category: string;
  group: ProductGroup;
  price: string;
  image: string;
  tone: string;
  badge?: string;
};

const services: Array<{
  key: ServiceKey;
  name: string;
  short: string;
  description: string;
  includes: string[];
  image: string;
  accent: string;
}> = [
  {
    key: "diagnostics",
    name: "Diagnostics",
    short: "No guesswork. Just answers.",
    description: "We use detailed testing and digital vehicle inspections to find the real cause of warning lights, strange sounds, and drivability issues.",
    includes: ["Check-engine lights", "Digital inspection", "Computer programming"],
    image: "/carrolls-exterior-night.png",
    accent: "01",
  },
  {
    key: "diesel",
    name: "Diesel & Trucks",
    short: "Built for the hard-working rigs.",
    description: "Specialized light- and medium-duty diesel repair for Power Stroke, Cummins, and Duramax engines—from injectors and turbos to emissions systems.",
    includes: ["Power Stroke", "Cummins", "Duramax"],
    image: "/carrolls-blue-racecar.png",
    accent: "02",
  },
  {
    key: "brakes",
    name: "Brakes & ABS",
    short: "Confident stops start here.",
    description: "From squeaks and pulsation to ABS warning lights, we inspect and repair pads, rotors, calipers, hydraulics, and anti-lock systems.",
    includes: ["Brake repair", "ABS diagnosis", "Hydraulic systems"],
    image: "/carrolls-yellow-racecar.png",
    accent: "03",
  },
  {
    key: "maintenance",
    name: "Maintenance",
    short: "Stay ahead of the expensive stuff.",
    description: "Oil changes, cooling systems, fluids, filters, belts, and factory-scheduled maintenance that keep your vehicle dependable mile after mile.",
    includes: ["Oil changes", "Cooling systems", "Scheduled service"],
    image: "/carrolls-family-owned.png",
    accent: "04",
  },
  {
    key: "electrical",
    name: "Electrical & AC",
    short: "Start strong. Stay comfortable.",
    description: "We track down electrical faults and service batteries, alternators, starters, climate control, sensors, and modern driver-assistance systems.",
    includes: ["Battery & charging", "AC & heat", "ADAS systems"],
    image: "/carrolls-black-racecar.png",
    accent: "05",
  },
  {
    key: "fleet",
    name: "Fleet Service",
    short: "Keep business moving.",
    description: "Consistent maintenance, dependable repairs, and practical scheduling for local businesses that cannot afford unnecessary downtime.",
    includes: ["Preventive plans", "Fast turnaround", "Light & medium duty"],
    image: "/carrolls-family-racecar.png",
    accent: "06",
  },
];

const products: Product[] = [
  { name: "Original Shop Tee", category: "Heavyweight tee", group: "tees", price: "$34", image: "/product-shop-tee.png", tone: "paper", badge: "Shop favorite" },
  { name: "Sumner Service Hoodie", category: "Midweight fleece", group: "hoodies", price: "$68", image: "/product-heritage-hoodie.png", tone: "blue", badge: "New drop" },
  { name: "Garage Patch Cap", category: "Five-panel cap", group: "headwear", price: "$32", image: "/product-garage-cap.png", tone: "yellow" },
  { name: "Counter Essentials Kit", category: "Garage goods", group: "goods", price: "$48", image: "/product-shop-kit.png", tone: "red", badge: "Limited" },
  { name: "Night Shift Tee", category: "Pigment-dyed tee", group: "tees", price: "$36", image: "/product-shop-tee.png", tone: "black" },
  { name: "Bay Door Hoodie", category: "Heavyweight fleece", group: "hoodies", price: "$72", image: "/product-heritage-hoodie.png", tone: "cream" },
  { name: "Wrench Club Cap", category: "Canvas cap", group: "headwear", price: "$30", image: "/product-garage-cap.png", tone: "navy" },
  { name: "Shop Rag + Decal Pack", category: "Four-piece set", group: "goods", price: "$24", image: "/product-shop-kit.png", tone: "paper" },
];

const filters: Array<{ label: string; key: "all" | ProductGroup }> = [
  { label: "All goods", key: "all" },
  { label: "Tees", key: "tees" },
  { label: "Hoodies", key: "hoodies" },
  { label: "Headwear", key: "headwear" },
  { label: "Garage goods", key: "goods" },
];

const shopPromises = [
  ["01", "Digital vehicle inspections", "Photos and notes make the condition of your vehicle easy to understand."],
  ["02", "ASE-certified technicians", "Experienced professionals using current tools and proven repair practices."],
  ["03", "1 year / 12,000 miles", "Repairs are backed by a clear warranty for extra peace of mind."],
  ["04", "Built around your day", "Same-day service, local shuttle, after-hours access, and remote payment."],
];

const process = [
  ["01", "Schedule", "Request an appointment online or call the garage to arrange a convenient visit."],
  ["02", "Inspect", "A digital vehicle inspection documents our findings with clear photos and notes."],
  ["03", "Approve", "Review your digital estimate and approve the work before any repairs begin."],
  ["04", "Repair", "Our ASE-certified technicians complete the approved repairs using quality parts."],
  ["05", "Verify", "We double-check the completed work with a final inspection before handing back your keys."],
  ["06", "Drive", "Pick up your vehicle, review the work with our team, and get back on the road with confidence."],
];

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className={`product-visual tone-${product.tone}`}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <Link href={productHref(product.name)} aria-label={`Shop ${product.name}`}><img src={product.image} alt={product.name} /></Link>
        <Link className="product-shop-link" href={productHref(product.name)}>Shop now <span>↗</span></Link>
      </div>
      <div className="product-meta">
        <div><small>{product.category}</small><h3><Link href={productHref(product.name)}>{product.name}</Link></h3></div>
        <strong>{product.price}</strong>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeService, setActiveService] = useState<ServiceKey>("diagnostics");
  const [activeFilter, setActiveFilter] = useState<"all" | ProductGroup>("all");
  const [requestSent, setRequestSent] = useState(false);

  const selectedService = services.find((service) => service.key === activeService) ?? services[0];
  const filteredProducts = useMemo(
    () => activeFilter === "all" ? products : products.filter((product) => product.group === activeFilter),
    [activeFilter],
  );


  return (
    <main>
      <SiteHeader/>

      <nav className="story-rail" aria-label="Popular services and store">
        {services.slice(0, 5).map((service) => (
          <Link href={`/services/${homeServiceSlugs[service.key]}`} key={service.key}>
            <span className="story-ring"><img src={service.image} alt="" /></span>
            <strong>{service.name}</strong>
          </Link>
        ))}
        <a href="/shop">
          <span className="story-ring merch-ring"><img src="/product-shop-tee.png" alt="" /></span>
          <strong>Shop merch</strong>
        </a>
      </nav>

      <section className="hero" id="top">
        <img className="hero-image" src="/carrolls-exterior-night.png" alt="Carroll's Garage exterior at night in Sumner, Washington" />
        <div className="hero-shade" />
        <div className="hero-minimal-copy">
          <p>Family-owned auto repair · Sumner, WA</p>
          <h1>BUILT TO KEEP<br />YOU MOVING.</h1>
          <a href="/appointment">Book service <span>↗</span></a>
        </div>
        <a className="hero-call" href="tel:+12538632524">(253) 863-2524</a>
      </section>

      <section className="trust-band" id="why-us" aria-label="Why choose Carroll’s Garage">
        <MobileRail className="trust-strip" label="garage benefits" dark>
        {shopPromises.map(([number, title, copy]) => (
          <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
        ))}
        </MobileRail>
      </section>

      <HomeWelcome/>

      <section className="services-section" id="services">
        <div className="section-heading">
          <p className="eyebrow"><span /> What we do</p>
          <h2>ONE SHOP.<br /><em>THE WHOLE VEHICLE.</em></h2>
          <MobileReveal label="Vehicles and repairs we cover"><p>Modern diagnostics, experienced hands, and honest recommendations—whether you drive a commuter, a diesel truck, a hybrid, or a local fleet.</p></MobileReveal>
        </div>
        <div className="service-browser">
          <div className="service-tabs" role="tablist" aria-label="Repair services">
            {services.map((service) => (
              <button
                type="button"
                role="tab"
                id={`service-tab-${service.key}`}
                aria-controls="home-service-panel"
                tabIndex={activeService === service.key ? 0 : -1}
                aria-selected={activeService === service.key}
                className={activeService === service.key ? "active" : ""}
                onClick={(event) => { setActiveService(service.key); event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }}
                onKeyDown={(event) => {
                  const current = services.findIndex(item => item.key === service.key);
                  const index = event.key === 'Home' ? 0 : event.key === 'End' ? services.length - 1 : ['ArrowRight', 'ArrowDown'].includes(event.key) ? (current + 1) % services.length : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? (current + services.length - 1) % services.length : -1;
                  if (index < 0) return;
                  event.preventDefault();
                  setActiveService(services[index].key);
                  document.getElementById(`service-tab-${services[index].key}`)?.focus({ preventScroll: true });
                  document.getElementById(`service-tab-${services[index].key}`)?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                }}
                key={service.key}
              >
                <span>{service.accent}</span>{service.name}<b>↗</b>
              </button>
            ))}
          </div>
          <article className="service-feature" id="home-service-panel" role="tabpanel" aria-labelledby={`service-tab-${activeService}`} tabIndex={0}>
            <img src={selectedService.image} alt={selectedService.name} />
            <div className="service-overlay" />
            <div className="service-feature-copy">
              <p>{selectedService.short}</p>
              <h3>{selectedService.name}</h3>
              <span>{selectedService.description}</span>
              <ul>{selectedService.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link href={`/services/${homeServiceSlugs[selectedService.key]}`}>Explore this service <b>↗</b></Link>
            </div>
          </article>
        </div>
        <HomeServiceHighlights/>
        <div className="service-marquee" aria-hidden="true"><div>ABS · AC REPAIR · ADAS · ALIGNMENTS · BRAKES · DIAGNOSTICS · DIESEL · FLEET · HYBRID · MAINTENANCE ·</div></div>
      </section>

      <section className="merch-section" id="merch">
        <div className="merch-heading">
          <div><p className="eyebrow light"><span /> The parts counter, after hours</p><h2>REP THE SHOP<br /><em>THAT KEEPS YOU ROLLING.</em></h2></div>
          <MobileReveal label="About the garage collection"><p>Real garage identity turned into everyday goods—workwear, tees, hats, and counter pieces designed from the Carroll&apos;s badge and local shop history.</p></MobileReveal>
        </div>
        <div className="filter-row" role="group" aria-label="Filter merchandise">
          {filters.map((filter) => (
            <button type="button" aria-pressed={activeFilter === filter.key} className={activeFilter === filter.key ? "active" : ""} onClick={(event) => { setActiveFilter(filter.key); event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }} key={filter.key}>
              {filter.label}<span>{filter.key === "all" ? products.length : products.filter((product) => product.group === filter.key).length}</span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">{filteredProducts.length} merchandise items shown</p>
        <div className="product-grid">
          {filteredProducts.map((product) => <ProductCard product={product} key={product.name} />)}
        </div>
        <div className="merch-footer"><p>Carroll’s originals, from the garage to your everyday.</p><Link href="/shop">View all merchandise →</Link></div>
      </section>

      <section className="convenience-section">
        <div className="convenience-photo">
          <img src="/carrolls-family-owned.png" alt="Carroll family and friends gathered around classic cars" />
          <div className="photo-label"><span>Family-owned in Sumner</span><strong>THE GARAGE VISIT,<br />WITHOUT THE RUNAROUND.</strong></div>
        </div>
        <div className="convenience-copy">
          <p className="eyebrow"><span /> What sets us apart</p>
          <h2>GOOD SERVICE GOES BEYOND THE REPAIR.</h2>
          <GarageBenefits/>
        </div>
      </section>

      <HomeGallery/>
      <HomeWarranty/>

      <section className="process-section">
        <div className="section-heading compact"><p className="eyebrow light"><span /> What to expect</p><h2>SIX SIMPLE STEPS.<br /><em>ZERO SURPRISES.</em></h2></div>
        <MobileRail className="process-grid" label="repair process" dark>
          {process.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </MobileRail>
      </section>

      <HomeFinance/>

      <section className="story-section" id="story">
        <div className="history-photo"><img src="/carrolls-garage-1930s.png" alt="Historic service station in Sumner, Washington" /><span>From the Sumner archive</span></div>
        <div className="history-copy">
          <img className="history-mark" src="/carrolls-car-logo.png" alt="" />
          <p className="eyebrow"><span /> Family owned. Neighbor trusted.</p>
          <h2>A MODERN SHOP WITH OLD-SCHOOL ACCOUNTABILITY.</h2>
          <MobileReveal label="The story behind the shop"><p>Carroll&apos;s Garage is built around a simple idea: explain the work clearly, repair it properly, and treat every customer like a neighbor. The technology has moved forward. The standard stays personal.</p></MobileReveal>
          <blockquote>“We help people stay safe and confident on the road.”</blockquote>
          <Link href="/about-us">Meet Carroll&apos;s Garage <span>↗</span></Link>
        </div>
      </section>

      <HomeReviews/>
      <HomeAreas/>
      <HomeBlog/>

      <section className="booking-section" id="book">
        <div className="booking-copy">
          <p className="eyebrow"><span /> Need service?</p>
          <h2>LET&apos;S GET YOU<br />BACK ON THE ROAD.</h2>
          <p>Tell us what your vehicle is doing. This form is a design preview; call or email the garage to arrange a confirmed visit.</p>
          <a href="tel:+12538632524">Prefer to call? <strong>(253) 863-2524</strong></a>
        </div>
        <MobileReveal label="Start an appointment request" className="booking-form-reveal">
        <form className="booking-form" onSubmit={(event) => { event.preventDefault(); setRequestSent(true); }}>
          <label><span>Your name</span><input required placeholder="First and last name" /></label>
          <label><span>Phone number</span><input required type="tel" placeholder="(253) 000-0000" /></label>
          <label><span>Vehicle</span><input placeholder="Year, make and model" /></label>
          <label><span>What can we help with?</span><select defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option value={service.key} key={service.key}>{service.name}</option>)}</select></label>
          <label className="form-wide"><span>What are you noticing?</span><textarea rows={3} placeholder="Tell us what is happening" /></label>
          <button className="form-wide" type="submit">{requestSent ? "Preview complete ✓" : "Preview appointment request →"}</button>
          <small className="form-wide" role="status">{requestSent ? "Preview complete. No appointment request was sent; call the garage to book." : "Design preview only—this form does not send customer information yet."}</small>
        </form>
        </MobileReveal>
      </section>

      <SiteFooter/>

    </main>
  );
}
