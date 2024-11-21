// components/ui/StatBlurbs.tsx
import { useTranslation } from '~/lib/i18n/useTranslation';

export default function StatBlurbs() {
  const { t } = useTranslation();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-6 border-4 border-black bg-[#FFD700] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
           hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
           transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
        <h3 className="text-6xl font-bold mb-2">{t('statBlurbs.stats.founded.number')}</h3>
        <h4 className="text-xl font-semibold">{t('statBlurbs.stats.founded.text')}</h4>
      </div>
      
      <div className="p-6 border-4 border-black bg-[#FF69B4] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
           hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
           transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
        <h3 className="text-6xl font-bold mb-2">{t('statBlurbs.stats.countries.number')}</h3>
        <h4 className="text-xl font-semibold">{t('statBlurbs.stats.countries.text')}</h4>
      </div>
      
      <div className="p-6 border-4 border-black bg-[#00CED1] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
           hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200
           transform hover:-translate-y-1 hover:-translate-x-1 hover:rotate-1">
        <h3 className="text-6xl font-bold mb-2">{t('statBlurbs.stats.products.number')}</h3>
        <h4 className="text-xl font-semibold">{t('statBlurbs.stats.products.text')}</h4>
      </div>
    </div>
  );
}