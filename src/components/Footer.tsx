import { Heart, Search, BookOpen, Compass, ShieldCheck, Moon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gold-accent/40 bg-gradient-to-b mask-x-from-95% mask-x-to-100% from-transparent via-background to-cards pt-16 pb-8 px-6 md:px-12 text-primary-text">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Top Grid: Brand & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <div className="flex items-center gap-2">
              {/* Subtle Gold Star / Crescent Badge */}
              <div className="w-8 h-8 rounded-lg bg-gold-accent/15 border border-gold-accent/30 flex items-center justify-center text-gold-accent font-serif font-bold text-lg">
                <span className="rounded-full p-2 border border-gold-accent/60 bg-cards text-gold-accent shadow-sm">
                    <Moon size={18}/>
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary-text">
                Nur
              </span>
            </div>
            <p className="text-xs text-start text-secondary-text font-light leading-relaxed">
              This app was created by <em className="text-gold-accent">Enis Zekiqi</em> for everyone that wants to improve their deen,with the help of <b className="text-gold-accent underline font-medium">Ummahapi</b> & <b className="text-gold-accent underline font-medium">Aladhan</b> that made possible the data and the information used here 
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col gap-3 items-start md:items-baseline">
            <h4 className="text-xs font-semibold  text-gold-accent uppercase tracking-wider">
              Explore
            </h4>
            <ul className="flex flex-col items-start md:items-baseline gap-2 text-xs text-secondary-text">
              <li>
                <a href="#daily-quran" className="hover:text-gold-accent transition-colors">
                  Daily Quran Verse
                </a>
              </li>
              <li>
                <a href="#daily-duas" className="hover:text-gold-accent transition-colors">
                  Daily Supplications (Duas)
                </a>
              </li>
              <li>
                <a href="#search" className="hover:text-gold-accent transition-colors">
                  Search Surah & Ayah
                </a>
              </li>
              <li>
                <a href="#random" className="hover:text-gold-accent transition-colors">
                  Random Dua Generator
                </a>
              </li>
            </ul>
          </div>

          {/* Daily Practice */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-start text-gold-accent uppercase tracking-wider">
              Make It A Practice
            </h4>
            <ul className="flex flex-col gap-3 text-xs text-secondary-text">
              <li className="flex items-start gap-2">
                <BookOpen size={14} className="mt-0.5 shrink-0 text-gold-accent" />
                <span>Read a verse with presence.</span>
              </li>
              <li className="flex items-start gap-2">
                <Search size={14} className="mt-0.5 shrink-0 text-gold-accent" />
                <span>Explore its meaning and context.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-gold-accent" />
                <span>Return tomorrow, even for a moment.</span>
              </li>
            </ul>
          </div>

          {/* Daily Reminder Box */}
          <div className="p-4 rounded-xl bg-gold-accent/5 border border-gold-accent/20 flex flex-col gap-2 justify-between">
            <span className="text-xs font-medium text-gold-accent flex items-center gap-1.5">
              <Compass size={14} /> Ayah of the Day
            </span>
            <p className="text-xs text-secondary-text italic font-light">
              "So remember Me; I will remember you." — (2:152)
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full border-t border-gold-accent/10" />

        {/* Bottom Bar: Copyright & Note */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary-text font-light">
          <p>© {new Date().getFullYear()} Daily Quran & Dua App. All rights reserved.</p>
          
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart size={12} className="text-gold-accent fill-gold-accent/50" />
            <span>for the Ummah</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
