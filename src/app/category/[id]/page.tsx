import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getCategoryById } from '@/data/apis';
import CategoryPageClient from './CategoryPageClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const category = getCategoryById(id);
  
  if (!category) {
    return {
      title: 'Kategori Bulunamadı | API Showcase',
    };
  }

  return {
    title: `${category.title} API'leri | API Showcase`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = getCategoryById(id);
  
  if (!category) {
    notFound();
    return null;
  }

  return <CategoryPageClient category={category} />;
}
