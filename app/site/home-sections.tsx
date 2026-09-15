"use client";

import {useRef,useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {areas,articles,serviceCatalog,testimonials} from './content';
import {useGallerySwipe} from './interactions';
import {MobileRail,MobileReveal} from './mobile-content';

export function HomeWelcome(){return <section className="home-restored home-welcome" id="welcome"><div><p className="shop-kicker">WELCOME TO CARROLL’S GARAGE</p><h2>Your trusted auto repair<br/>experts in Sumner.</h2><p className="welcome-promise">Dependable service. Honest repairs.<br/>Done right the first time.</p></div><div><MobileReveal label="What to expect at Carroll’s"><p>Finding reliable auto repair should feel simple. Our friendly, experienced team handles oil changes, brake service, diagnostics, and complete repairs to keep your vehicle safe and dependable.</p><p>We’re a family-owned shop that treats every customer like a neighbor. Expect transparency, integrity, and expert care from the first conversation to the final inspection.</p></MobileReveal><div className="welcome-links"><Link href="/about-us">Get to know us</Link><Link href="/appointment">Make an appointment</Link></div></div></section>;}

const gallery=[
 {image:'/carrolls-exterior-night.png',alt:'Carroll’s Garage exterior at night with the service truck outside',label:'The garage after hours',note:'A real Sumner shop, lit up after the workday.',layout:'feature'},
 {image:'/carrolls-family-owned.png',alt:'Carroll family and friends gathered under a canopy at a car event',label:'Family owned',note:'Faces, friends, and the people behind the work.',layout:'tall'},
 {image:'/carrolls-family-racecar.png',alt:'Young Carroll family member beside a red and blue race car',label:'Built by hand',note:'Race cars and repair work with the same careful hands.'},
 {image:'/carrolls-yellow-racecar.png',alt:'Yellow Carroll’s Garage race car at the drag strip',label:'Local horsepower',note:'Old-school Mopar energy from the Carroll’s world.'},
 {image:'/carrolls-blue-racecar.png',alt:'Blue Carroll’s Garage Plymouth race car lifting at the drag strip',label:'Weekend race roots',note:'The garage story keeps showing up at the track.',layout:'wide'},
 {image:'/carrolls-black-racecar.png',alt:'Black Plymouth race car launching at Bremerton Raceway',label:'Carroll horsepower',note:'Built to move, tuned by people who care.'},
 {image:'/carrolls-yellow-track-rear.png',alt:'Rear view of the yellow Carroll’s Garage Barracuda at the drag strip',label:'Garage pride',note:'A badge, a number, and a whole lot of shop pride.'},
 {image:'/carrolls-mopar-magazine.png',alt:'Mopar magazine cover featuring Patti Carroll’s 1965 Plymouth Barracuda',label:'Family history',note:'The kind of history you can put on the wall.',layout:'wide'},
 {image:'/carrolls-hotrod-cover.png',alt:'Hot Rod style cover featuring Chris Carroll’s 1963 Nova',label:'Car show stories',note:'Customer service with car-culture roots.'},
 {image:'/carrolls-race-memory-collage.png',alt:'Race night photo collage with a Carroll family trophy photo',label:'Race memories',note:'The scrapbook side of the shop.',layout:'wide'},
];
export function HomeGallery() {
  const [selected, setSelected] = useState(0);
  const [position, setPosition] = useState({start:true, end:false});
  const dialog = useRef<HTMLDialogElement>(null);
  const album = useRef<HTMLDivElement>(null);
  const swipe = useGallerySwipe(direction => setSelected(i => (i + direction + gallery.length) % gallery.length));
  const openPhoto = (index:number) => { setSelected(index); dialog.current?.showModal(); };
  const moveAlbum = (direction:number) => {
    const track = album.current;
    if (!track) return;
    const step = (track.firstElementChild as HTMLElement).offsetWidth + parseFloat(getComputedStyle(track).columnGap);
    track.scrollBy({left:direction * step, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  };
  return <section className="home-restored home-gallery" id="gallery" aria-labelledby="gallery-title">
    <div className="restored-heading gallery-heading">
      <div><p className="shop-kicker">THE CARROLL’S FAMILY ALBUM</p><h2 id="gallery-title">Life around<br/>the garage.</h2></div>
      <div className="gallery-heading-copy"><p>Family, familiar faces, and weekends at the track. A few favorite moments from our world.</p><Link href="/about-us">Get to know the family</Link></div>
    </div>
    <div className="garage-album-toolbar"><span>{gallery.length} PHOTOS & MEMORIES</span><span>Scroll to explore · Select a photo to enlarge</span></div>
    <div className="garage-album" ref={album} role="region" aria-label="Carroll’s family photo album" tabIndex={0}
      onScroll={event => { const track=event.currentTarget; const start=track.scrollLeft < 8; const end=track.scrollLeft + track.clientWidth >= track.scrollWidth - 8; setPosition(previous => previous.start===start && previous.end===end ? previous : {start,end}); }}
      onKeyDown={event => { if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();moveAlbum(event.key==='ArrowRight'?1:-1);} }}>
      {gallery.map((photo,index) => <button className="garage-album-card" type="button" key={photo.image} onClick={()=>openPhoto(index)} aria-label={`Enlarge photo ${index+1}: ${photo.label}`} aria-haspopup="dialog">
        <span className="garage-album-photo"><Image src={photo.image} alt={photo.alt} width={1000} height={750} sizes="(max-width: 700px) 80vw, (max-width: 1050px) 44vw, 34vw"/><span className="garage-album-open">View photo</span></span>
        <span className="garage-album-caption"><strong>{photo.label}</strong><small>{photo.note}</small></span>
      </button>)}
    </div>
    <div className="garage-album-footer"><p>A little of our history. A lot of who we are.</p><nav aria-label="Browse family album"><button type="button" onClick={()=>moveAlbum(-1)} disabled={position.start}>Previous</button><button type="button" onClick={()=>moveAlbum(1)} disabled={position.end}>Next</button></nav></div>
    <dialog ref={dialog} className="home-gallery-dialog" aria-label="Gallery photo" onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}} onKeyDown={event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();setSelected(index=>(index+(event.key==='ArrowRight'?1:-1)+gallery.length)%gallery.length);}}}>
      <div><span role="status">{selected+1} / {gallery.length} · {gallery[selected].label}</span><button type="button" autoFocus onClick={()=>dialog.current?.close()}>Close ×</button></div>
      <Image {...swipe} src={gallery[selected].image} width={2000} height={1333} sizes="90vw" alt={gallery[selected].alt}/>
      <nav aria-label="Gallery controls"><button type="button" onClick={()=>setSelected(index=>(index+gallery.length-1)%gallery.length)}>Previous</button><button type="button" onClick={()=>setSelected(index=>(index+1)%gallery.length)}>Next</button></nav>
    </dialog>
  </section>;
}

export function HomeServiceHighlights(){return <div className="home-service-highlights"><div className="service-highlight-heading"><p>More ways we keep you moving</p><Link href="/services">View all 34 services</Link></div><MobileRail className="service-highlight-cards" label="featured service">{['abs','ac-repair','adas'].map(slug=>{const service=serviceCatalog.find(s=>s.slug===slug)!;return <Link href={`/services/${slug}`} key={slug}><h3>{service.name}</h3><p>{slug==='abs'?'Anti-lock braking system inspection and repair for safe, reliable stops.':slug==='ac-repair'?'Pinpoint the cause of warm air and restore your vehicle’s cooling.':'Calibration and repair for lane assist, adaptive cruise, and collision-avoidance systems.'}</p><span>Explore service</span></Link>;})}</MobileRail></div>;}

export function HomeWarranty(){return <section className="home-restored home-warranty" id="warranty"><div className="warranty-number"><strong>1 YEAR</strong><span>/ 12,000 MILES</span></div><div><p className="shop-kicker">OUR REPAIR WARRANTY</p><h2>Good work.<br/>Backed up.</h2><p>All repairs are backed by our 1-year / 12,000-mile warranty, so you can leave the shop with extra peace of mind.</p><Link href="/contact-us">Talk to us about your repair</Link></div></section>;}

export function HomeFinance(){return <section className="home-restored home-finance" id="financing"><div><p className="shop-kicker">REPAIR FINANCING</p><h2>Unexpected repair?<br/>Let’s talk options.</h2><MobileReveal label="How repair financing works"><p>Vehicle repairs don’t always arrive at a convenient time. Carroll’s Garage offers financing options through Synchrony Car Care and EasyPay Finance to help you get back on the road.</p></MobileReveal><Link href="/financing">Explore financing</Link></div><div className="home-finance-options"><Link href="/financing"><span>01 / FINANCING PARTNER</span><h3>Synchrony<br/>Car Care</h3><b>Learn more</b></Link><Link href="/financing"><span>02 / FINANCING PARTNER</span><h3>EasyPay<br/>Finance</h3><b>Learn more</b></Link></div></section>;}

export function HomeReviews(){return <section className="home-restored home-reviews" id="testimonials"><div className="restored-heading"><div><p className="shop-kicker">WHAT OUR CUSTOMERS SAY</p><h2>Good words.<br/>From our neighbors.</h2></div><Link href="/reviews">View all reviews</Link></div><MobileRail className="home-review-grid" label="customer review" dark>{testimonials.map(({name,quote},i)=><article key={name}><span>0{i+1} / CUSTOMER NOTE</span><blockquote>“{quote}”</blockquote><strong>{name}</strong></article>)}</MobileRail></section>;}

export function HomeAreas(){return <section className="home-restored home-areas" id="service-areas"><div><p className="shop-kicker">AREAS WE SERVE</p><h2>Right here in Sumner.<br/>Here for our neighbors.</h2><p>Serving drivers across Sumner and the surrounding communities.</p><address>16602 64th St. E.<br/>Sumner, WA 98390</address><Link href="/contact-us">Contact & directions</Link></div><MobileReveal label="See the 11 communities around Sumner"><div className="home-area-list">{areas.filter(area=>area!=='Sumner').map((area,i)=><div key={area}><span>{String(i+1).padStart(2,'0')}</span>{area}</div>)}</div></MobileReveal></section>;}

export function HomeBlog(){return <section className="home-restored home-blog" id="blog"><div className="restored-heading"><div><p className="shop-kicker">FROM THE BLOG</p><h2>Car care tips.<br/>Expert advice.</h2></div><Link href="/blog">View all blog posts</Link></div><MobileRail className="home-blog-grid" label="car care article">{articles.map(a=><Link key={a.slug} href={`/blog/${a.slug}`}><div className="home-blog-image"><Image src={a.image} width={900} height={600} sizes="(max-width: 650px) 100vw, 33vw" alt={a.category}/><span>{a.category}</span></div><time dateTime={a.date}>{a.dateLabel}</time><h3>{a.title}</h3><p>{a.intro}</p><b>Read more</b></Link>)}</MobileRail></section>;}

export function Newsletter(){const [preview,setPreview]=useState(false);return <section className="home-restored home-newsletter" id="newsletter"><div><p className="shop-kicker">THE CARROLL’S NEWSLETTER</p><h2>A little know-how<br/>for the road ahead.</h2><p>Maintenance advice, expert insights, and exclusive deals from the garage.</p></div><form onSubmit={e=>{e.preventDefault();setPreview(true);}}><label htmlFor="newsletter-email">Your email address</label><div><input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required/><button type="submit">Subscribe</button></div><p role="status">{preview?'Signup preview complete. No subscription has been sent.':'Local design preview — newsletter signup is not connected yet.'}</p></form></section>;}
