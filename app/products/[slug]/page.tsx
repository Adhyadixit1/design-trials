import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { catalog } from '../../shop/catalog';
import ProductPage from '../../shop/product-page';

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = catalog.find(product => product.slug === slug);
  if (!product) return { title: 'Product not found | Carroll’s Garage' };
  return { title: `${product.name} | Carroll’s Garage`, description: `${product.name} from the Carroll’s Garage merchandise collection. Explore the details and choose your fit.`, openGraph: { title: product.name, description: `${product.category} from Carroll’s Garage.`, url: `/products/${product.slug}`, images: [] }, twitter: { card: 'summary', title: product.name, images: [] } };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = catalog.find(product => product.slug === slug);
  if (!product) notFound();
  return <ProductPage key={product.slug} product={product} />;
}
