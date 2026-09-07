const previewProducts = [
  { name: "Heritage Shop Tee", price: "$32", tone: "cream" },
  { name: "Garage Crew Hoodie", price: "$58", tone: "blue" },
  { name: "Carroll's Classic Tee", price: "$34", tone: "rust" },
];

export default function Home() {
  return (
    <main>
      <div className="utility-bar">
        <span>Serving Sumner since the 1930s</span>
        <span className="utility-center">Built local. Worn everywhere.</span>
        <a href="tel:+12538632524">(253) 863-2524</a>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Carroll's Garage home">
          <img src="/carrolls-wordmark.png" alt="Carroll's Garage" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#shop">Shop</a>
          <a href="#story">Our Story</a>
          <a href="#garage">The Garage</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions" aria-label="Store actions">
          <a className="search-link" href="#shop" aria-label="Search products">Search</a>
          <a href="#shop" aria-label="Shopping bag">Bag <span>0</span></a>
          <details className="mobile-menu">
            <summary>Menu</summary>
            <div className="mobile-menu-panel">
              <a href="#shop">Shop</a>
              <a href="#story">Our Story</a>
              <a href="#garage">The Garage</a>
              <a href="#contact">Contact</a>
            </div>
          </details>
        </div>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-photo"
          src="/carrolls-garage-1930s.png"
          alt="The original Carroll's Garage and Richfield service station in the 1930s"
        />
        <div className="hero-shade" />
        <div className="hero-grain" />
        <div className="hero-content">
          <p className="eyebrow">Sumner, Washington · Family owned</p>
          <h1>The garage that<br />grew up with Sumner.</h1>
          <p className="hero-copy">
            Nearly a century of honest work, now made to wear. Shop garage-built
            goods inspired by the people, stories, and machines that keep us moving.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#shop">Shop the first drop</a>
            <a className="button button-ghost" href="#story">Read our story</a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Garage history">
          <strong>90+</strong>
          <span>years of<br />turning wrenches</span>
        </div>
        <p className="hero-caption">The original shop · Sumner, WA · circa 1930s</p>
      </section>

      <section className="shop-preview" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">From the shop floor</p>
            <h2>Wear the legacy.</h2>
          </div>
          <a href="#shop">View all goods <span aria-hidden="true">→</span></a>
        </div>
        <div className="product-grid">
          {previewProducts.map((product, index) => (
            <article className="product-card" key={product.name}>
              <div className={`product-art ${product.tone}`}>
                <span className="product-number">0{index + 1}</span>
                <img
                  src={index === 2 ? "/carrolls-car-logo.png" : "/carrolls-wordmark.png"}
                  alt=""
                />
                <span className="concept-label">Concept artwork</span>
              </div>
              <div className="product-details">
                <div>
                  <h3>{product.name}</h3>
                  <p>Heavyweight · Garment dyed</p>
                </div>
                <strong>{product.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="ticker" aria-label="Carroll's Garage values">
        <div>
          <span>Honest work</span><i>◆</i><span>Heavyweight goods</span><i>◆</i>
          <span>Sumner made</span><i>◆</i><span>Since the 1930s</span><i>◆</i>
          <span>Honest work</span><i>◆</i><span>Heavyweight goods</span><i>◆</i>
        </div>
      </div>

      <section className="story" id="story">
        <div className="story-image-wrap">
          <img src="/carrolls-garage-1930s.png" alt="Carroll's original service station in Sumner" />
          <p>Archival photograph · Carroll&apos;s Garage collection</p>
        </div>
        <div className="story-copy">
          <p className="eyebrow">Our story</p>
          <h2>Before the freeways. Before the strip malls. There was the garage.</h2>
          <p className="story-lede">
            Carroll&apos;s began as a neighborhood stop for fuel, tires, and the kind of
            repairs that kept a town moving. Decades later, the tools have changed—but
            the promise has not.
          </p>
          <p>
            We still believe in straight answers, careful work, and earning your trust
            one visit at a time. This collection carries that history forward: honest
            goods for people who know the value of things built to last.
          </p>
          <a className="text-link" href="https://carrollsgaragewa.com/about-us/">
            Read the full garage story <span aria-hidden="true">→</span>
          </a>
          <div className="story-mark">
            <img src="/carrolls-car-logo.png" alt="Carroll's Garage classic car mark" />
          </div>
        </div>
      </section>

      <section className="garage" id="garage">
        <div className="garage-heading">
          <p className="eyebrow">Still turning wrenches</p>
          <h2>Built in the garage.</h2>
          <p>Real service. Real people. The same standards behind everything carrying our name.</p>
        </div>
        <div className="garage-grid">
          <figure className="garage-main">
            <img src="/garage-team.webp" alt="Mechanics inspecting an engine" />
            <figcaption>Diagnostics &amp; repair</figcaption>
          </figure>
          <figure>
            <img src="/garage-service.webp" alt="Mechanic servicing a vehicle" />
            <figcaption>Done right the first time</figcaption>
          </figure>
          <figure>
            <img src="/garage-oil.webp" alt="Fresh engine oil being added" />
            <figcaption>Everyday maintenance</figcaption>
          </figure>
        </div>
        <a className="button button-primary garage-button" href="https://carrollsgaragewa.com/services/">
          Explore repair services
        </a>
      </section>

      <section className="manifesto">
        <p className="manifesto-kicker">Carroll&apos;s standard no. 01</p>
        <blockquote>
          “Make it honest.<br />Make it useful.<br /><em>Make it last.</em>”
        </blockquote>
        <p className="manifesto-note">A simple rule for repairs, relationships, and everything we put our name on.</p>
      </section>

      <section className="trust-strip" aria-label="Store promises">
        <div><strong>01</strong><span>Quality garments</span><p>Comfortable, durable pieces made for repeat wear.</p></div>
        <div><strong>02</strong><span>Made on demand</span><p>Produced responsibly with our fulfillment partner.</p></div>
        <div><strong>03</strong><span>Secure checkout</span><p>Simple ordering and protected payment through Shopify.</p></div>
        <div><strong>04</strong><span>Garage approved</span><p>Every design has to earn the Carroll&apos;s name.</p></div>
      </section>

      <section className="newsletter" id="contact">
        <div>
          <p className="eyebrow">Join the garage crew</p>
          <h2>New drops.<br />Old stories.</h2>
        </div>
        <div className="newsletter-form-wrap">
          <p>Get first access to limited runs, shop stories, and news from Sumner.</p>
          <form>
            <label className="sr-only" htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="YOUR EMAIL ADDRESS" />
            <button type="button">Join the crew <span aria-hidden="true">→</span></button>
          </form>
          <small>Prototype signup—connection will be added in Shopify.</small>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <img src="/carrolls-wordmark.png" alt="Carroll's Garage" />
          <p>Serving Sumner with honesty, skill, and neighborly care since the 1930s.</p>
        </div>
        <div className="footer-column">
          <p>Visit the garage</p>
          <address>16602 64th St. E.<br />Sumner, WA 98390</address>
          <a href="tel:+12538632524">(253) 863-2524</a>
        </div>
        <div className="footer-column">
          <p>Explore</p>
          <a href="#shop">Shop goods</a>
          <a href="#story">Our story</a>
          <a href="https://carrollsgaragewa.com/services/">Repair services</a>
          <a href="https://carrollsgaragewa.com/contact-us/">Contact</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Carroll&apos;s Garage</span>
          <span>Prototype storefront · Shopify build follows approval</span>
        </div>
      </footer>
    </main>
  );
}
