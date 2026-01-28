'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryById, getRecommendedApis, getOtherApis, ApiService, Category } from '@/data/apis';
import { ArrowLeft, Star, ExternalLink, Zap, Clock, Sparkles } from 'lucide-react';

const categoryGradients: Record<string, string> = {
  weather: 'from-blue-500 to-cyan-400',
  crypto: 'from-yellow-500 to-orange-500',
  gaming: 'from-purple-500 to-pink-500',
  maps: 'from-green-500 to-emerald-400',
  social: 'from-blue-600 to-indigo-500',
  movies: 'from-red-500 to-rose-400',
  music: 'from-green-500 to-teal-400',
  news: 'from-gray-600 to-slate-500',
  finance: 'from-emerald-500 to-green-400',
  developer: 'from-slate-600 to-gray-500',
  education: 'from-blue-500 to-sky-400',
  health: 'from-red-400 to-pink-400',
  food: 'from-orange-500 to-amber-400',
  space: 'from-indigo-600 to-purple-500',
  sports: 'from-green-600 to-lime-500',
  random: 'from-fuchsia-500 to-pink-500',
  animals: 'from-amber-500 to-yellow-400',
  anime: 'from-pink-500 to-rose-400',
  art: 'from-violet-500 to-purple-400',
  books: 'from-amber-600 to-orange-500',
  calendar: 'from-blue-500 to-indigo-400',
  chat: 'from-indigo-500 to-blue-400',
  cloud: 'from-sky-500 to-blue-400',
  email: 'from-red-500 to-orange-400',
  environment: 'from-green-600 to-emerald-500',
  government: 'from-slate-700 to-gray-600',
  iot: 'from-teal-500 to-cyan-400',
  network: 'from-blue-600 to-cyan-500',
  jobs: 'from-indigo-600 to-purple-500',
  math: 'from-orange-500 to-red-400',
  payment: 'from-green-500 to-emerald-400',
  photos: 'from-pink-500 to-rose-400',
  fun: 'from-yellow-500 to-amber-400',
  transport: 'from-blue-500 to-indigo-400',
  url: 'from-purple-500 to-violet-400',
  video: 'from-red-500 to-pink-500',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

interface ApiCardProps {
  api: ApiService;
  isRecommended?: boolean;
  gradient: string;
  index: number;
}

function ApiCard({ api, isRecommended, gradient, index }: ApiCardProps) {
  return (
    <motion.a
      href={api.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative block h-full ${isRecommended ? 'md:col-span-2 lg:col-span-1' : ''}`}
    >
      <div className={`relative h-full glass rounded-2xl overflow-hidden ${isRecommended ? 'border-2 border-primary-500/30' : ''}`}>
        {/* Recommended glow */}
        {isRecommended && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
        )}
        
        {/* Hover gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        {/* Shimmer */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
        
        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm">{api.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {api.name}
                </h3>
                {api.isNew && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-500">
                    <Sparkles className="w-3 h-3" />
                    Yeni
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isRecommended && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500">
                  <Star className="w-3 h-3 fill-yellow-500" />
                  <span className="text-xs font-medium">Önerilen</span>
                </div>
              )}
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
            {api.description}
          </p>
          
          {/* Rate limit */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <Zap className="w-4 h-4 text-primary-500" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">{api.rateLimit}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

interface CategoryPageClientProps {
  category: Category;
}

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  const gradient = categoryGradients[category.id] || 'from-primary-500 to-accent-500';
  const recommendedApis = getRecommendedApis(category);
  const otherApis = getOtherApis(category);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/#categories"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Kategorilere Dön
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className={`inline-flex w-24 h-24 rounded-3xl bg-gradient-to-br ${gradient} items-center justify-center text-5xl shadow-2xl mb-6`}
          >
            {category.emoji}
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {category.title}
          </h1>
          
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-6">
            {category.description}
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
              <Zap className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {category.apis.length} API
              </span>
            </div>
            {category.recommendedApi && (
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Önerilen: {category.recommendedApi}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recommended APIs */}
        {recommendedApis.length > 0 && (
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full border border-yellow-500/20">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-slate-900 dark:text-white">Önerilen API&apos;ler</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/20 to-transparent" />
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {recommendedApis.map((api, index) => (
                <ApiCard
                  key={api.name}
                  api={api}
                  isRecommended={true}
                  gradient={gradient}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* Other APIs */}
        {otherApis.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                <Clock className="w-5 h-5 text-slate-500" />
                <span className="font-semibold text-slate-900 dark:text-white">Diğer API&apos;ler</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-500/20 to-transparent" />
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {otherApis.map((api, index) => (
                <ApiCard
                  key={api.name}
                  api={api}
                  isRecommended={false}
                  gradient={gradient}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
