import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
const supportedLanguages = [
  { code: 'en', shortLabel: 'EN', label: 'English' },
  { code: 'shq', shortLabel: 'SQ', label: 'Shqip' },
  { code: 'de', shortLabel: 'DE', label: 'German' },
] as const;

type SupportedLanguageCode = (typeof supportedLanguages)[number]['code'];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (nextLang: SupportedLanguageCode) => {
      i18n.changeLanguage(nextLang);
      setOpen(false);
    },
    [i18n]
  );

  const currentLanguageCode: SupportedLanguageCode =
    (supportedLanguages.find(({ code }) => i18n.resolvedLanguage?.startsWith(code))?.code ??
      supportedLanguages[0].code) as SupportedLanguageCode;

  const currentLanguage =
    supportedLanguages.find((lang) => lang.code === currentLanguageCode) ?? supportedLanguages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl border border-gold-accent/60  bg-cards px-2.5 py-1.5 text-xs font-medium text-primary-text transition-all duration-200 hover:border-gold-accent focus:outline-none focus:ring-2 focus:ring-gold-accent/20"
      >
        <Globe className="h-3.5 w-3.5 text-primary-text" />
        <span className="hidden sm:inline">{currentLanguage.label}</span>
        <span className="sm:hidden">{currentLanguage.shortLabel}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
        <motion.ul
        initial={{opacity:0,y:-15}}
        animate={{opacity:1,y:0}}
        exit={{opacity:0,y:-15}}
        transition={{duration:0.3,ease:'easeInOut'}}
          role="listbox"
          aria-label="Languages"
          className="absolute -right-4 md:-right-5 top-[30px] md:top-[30px] z-[100] mt-1.5 min-w-[150px] overflow-hidden rounded-lg border border-gold-accent bg-cards py-1 shadow-lg"
        >
          {supportedLanguages.map((lang) => {
            const selected = lang.code === currentLanguageCode;
            return (
              <li key={lang.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => handleChange(lang.code)}
                  className={`flex w-full items-center cursor-pointer justify-between px-3 py-2 text-left text-xs transition-colors ${
                    selected ? 'bg-primary/10 text-primary-text' : 'text-secondary-text hover:bg-cards'
                  }`}
                >
                  <span>{lang.label}</span>
                  {selected && <Check className="h-3.5 w-3.5" />}
                </button>
              </li>
            );
          })}
        </motion.ul>
      )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;