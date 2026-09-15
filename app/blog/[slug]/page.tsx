import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import Link from 'next/link';
import {articles} from '../../site/content';
import {SiteFrame,PageIntro} from '../../site/frame';
import {MobileReveal} from '../../site/mobile-content';
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const a=articles.find(a=>a.slug===slug);return{title:a?`${a.title} | Carroll’s Garage`:'Article not found',description:a?.intro,openGraph:{images:[]},twitter:{images:[]}};}
export default async function ArticlePage({params}:Props){const {slug}=await params;const article=articles.find(a=>a.slug===slug);if(!article)notFound();return <SiteFrame><PageIntro label="Blog" title={article.title} copy={article.intro} image={article.image}/><article className="journal-article"><p className="muted-note">Original listing: <time dateTime={article.date}>{article.dateLabel}</time> · Article copy is a local design draft.</p><p className="shop-kicker">{article.category} / CARROLL’S GARAGE</p>{article.sections.map(([heading,copy],index)=><section key={heading}><MobileReveal heading={heading} label={heading} initialOpen={index===0}><p>{copy}</p></MobileReveal></section>)}<div className="article-next"><h2>Have a question about your vehicle?</h2><Link className="shop-primary" href={`/services/${article.service}`}>Explore the service</Link></div><p className="muted-note">Draft article for the local design, based on the topic featured on the current Carroll’s website.</p><Link className="interior-link" href="/blog">Back to the blog</Link></article></SiteFrame>;}
