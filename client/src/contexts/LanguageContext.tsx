import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('fr'); // French is default

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem('gromarbre-language') as Language;
    if (saved && ['fr', 'en', 'ar'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  // Save language preference
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('gromarbre-language', lang);
    
    // Set document direction for Arabic
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || translations.fr[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translation data
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.projects': 'Projets',
    'nav.products': 'Produits',
    'nav.contact': 'Contact',
    
    // Home page
    'home.hero.title': 'Excellence en Marbre depuis 1998',
    'home.hero.subtitle': 'Créateurs de solutions en marbre de luxe à Casablanca, Maroc. Spécialisés dans les projets personnalisés pour hôtels, universités, résidences et espaces commerciaux.',
    'home.hero.cta': 'Découvrir nos Réalisations',
    'home.hero.cta2': 'Nos Services',
    
    // About section
    'home.about.title': 'À Propos de Gromarbre',
    'home.about.description': 'Avec plus de 25 ans d\'expérience, Gromarbre est le leader marocain de la transformation du marbre. Nous combinons savoir-faire traditionnel et technologies modernes pour créer des œuvres d\'exception.',
    'home.about.experience': 'Ans d\'Excellence',
    'home.about.projects': 'Projets Réalisés',
    'home.about.satisfaction': 'Satisfaction Client',
    
    // Services section
    'home.services.title': 'Nos Services',
    'home.services.design': 'Conception & Design',
    'home.services.design.desc': 'Plans personnalisés et visualisations 3D pour vos projets',
    'home.services.fabrication': 'Fabrication Sur-Mesure',
    'home.services.fabrication.desc': 'Taille et façonnage précis selon vos spécifications',
    'home.services.installation': 'Installation Professionnelle',
    'home.services.installation.desc': 'Pose experte par nos équipes qualifiées',
    'home.services.maintenance': 'Entretien & Restauration',
    'home.services.maintenance.desc': 'Services de maintenance et restauration de marbre',
    
    // Products section
    'home.products.title': 'Nos Marbres d\'Exception',
    'home.products.calacatta': 'Calacatta Or',
    'home.products.calacatta.desc': 'Marbre italien premium aux veines dorées élégantes',
    'home.products.carrara': 'Carrara Blanc',
    'home.products.carrara.desc': 'Marbre classique italien d\'une pureté exceptionnelle',
    'home.products.emperador': 'Emperador Foncé',
    'home.products.emperador.desc': 'Marbre espagnol aux tons riches et profonds',
    
    // Contact section
    'home.contact.title': 'Contactez-Nous',
    'home.contact.description': 'Prêt à transformer votre espace ? Contactez nos experts pour une consultation gratuite.',
    'home.contact.cta': 'Demander un Devis',
    
    // Products page
    'products.cta.description': 'Nous pouvons sourcer des variétés de marbre rares et personnalisées pour votre projet. Contactez-nous avec vos exigences.',
    
    // Footer
    'footer.company': 'Entreprise',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    'footer.address': 'Casablanca, Maroc',
    'footer.phone': 'Téléphone',
    'footer.email': 'Email',
    'footer.newsletter.desc': 'Abonnez-vous pour recevoir nos actualités et nouveaux projets.',
    'footer.description': 'Solutions de marbre premium pour espaces de luxe. Avec plus de 20 ans d\'expertise, nous apportons une élégance intemporelle à chaque projet.',
    
    // Products page
    'products.subtitle': 'Explorez notre sélection de variétés de marbre fins du monde entier.',
    
    // Contact page
    'contact.title': 'Contactez Gromarbre',
    'contact.subtitle': 'Transformons ensemble vos idées en réalité',
    'contact.form.name': 'Nom Complet',
    'contact.form.email': 'Adresse Email',
    'contact.form.phone': 'Téléphone',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Envoyer le Message',
    'contact.info.title': 'Informations de Contact',
    'contact.info.address': 'Adresse',
    'contact.info.hours': 'Heures d\'Ouverture',
    'contact.info.hours.weekday': 'Lun - Ven: 8h00 - 18h00',
    'contact.info.hours.saturday': 'Sam: 8h00 - 14h00',
    'contact.info.hours.sunday': 'Dim: Fermé',
    'contact.form.title': 'Envoyez-nous un Message',
    'contact.form.sending': 'Envoi en cours...',
    'contact.info.follow': 'Suivez-Nous',
    
    // Additional UI elements
    'ui.viewDetails': 'Voir Détails',
    'ui.learnMore': 'En Savoir Plus',
    'ui.getQuote': 'Demander un Devis',
    'ui.callToAction': 'Prêt à Transformer Votre Espace?',
    'ui.newsletter': 'Newsletter',
    'ui.subscribe': 'S\'abonner',
    'ui.quickLinks': 'Liens Rapides',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.products': 'Products',
    'nav.contact': 'Contact',
    
    // Home page
    'home.hero.title': 'Marble Excellence Since 1998',
    'home.hero.subtitle': 'Creators of luxury marble solutions in Casablanca, Morocco. Specialized in custom projects for hotels, universities, residences, and commercial spaces.',
    'home.hero.cta': 'Discover Our Work',
    'home.hero.cta2': 'Our Services',
    
    // About section
    'home.about.title': 'About Gromarbre',
    'home.about.description': 'With over 25 years of experience, Gromarbre is Morocco\'s leading marble transformation company. We combine traditional craftsmanship with modern technology to create exceptional works.',
    'home.about.experience': 'Years of Excellence',
    'home.about.projects': 'Completed Projects',
    'home.about.satisfaction': 'Client Satisfaction',
    
    // Services section
    'home.services.title': 'Our Services',
    'home.services.design': 'Design & Planning',
    'home.services.design.desc': 'Custom plans and 3D visualizations for your projects',
    'home.services.fabrication': 'Custom Fabrication',
    'home.services.fabrication.desc': 'Precise cutting and shaping according to your specifications',
    'home.services.installation': 'Professional Installation',
    'home.services.installation.desc': 'Expert installation by our qualified teams',
    'home.services.maintenance': 'Maintenance & Restoration',
    'home.services.maintenance.desc': 'Marble maintenance and restoration services',
    
    // Products section
    'home.products.title': 'Our Premium Marbles',
    'home.products.calacatta': 'Calacatta Gold',
    'home.products.calacatta.desc': 'Premium Italian marble with elegant golden veins',
    'home.products.carrara': 'Carrara White',
    'home.products.carrara.desc': 'Classic Italian marble of exceptional purity',
    'home.products.emperador': 'Emperador Dark',
    'home.products.emperador.desc': 'Spanish marble with rich and deep tones',
    
    // Contact section
    'home.contact.title': 'Contact Us',
    'home.contact.description': 'Ready to transform your space? Contact our experts for a free consultation.',
    'home.contact.cta': 'Request a Quote',
    
    // Products page
    'products.cta.description': 'We can source rare and custom marble varieties for your project. Contact us with your requirements.',
    
    // Footer
    'footer.company': 'Company',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.address': 'Casablanca, Morocco',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.newsletter.desc': 'Subscribe to receive updates on new products and projects.',
    'footer.description': 'Premium marble solutions for luxury spaces. With over 20 years of expertise, we bring timeless elegance to every project.',
    
    // Products page
    'products.subtitle': 'Explore our selection of fine marble varieties from around the world.',
    
    // Contact page
    'contact.title': 'Contact Gromarbre',
    'contact.subtitle': 'Let\'s bring your ideas to life together',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'Address',
    'contact.info.hours': 'Business Hours',
    'contact.info.hours.weekday': 'Mon - Fri: 8:00 AM - 6:00 PM',
    'contact.info.hours.saturday': 'Sat: 8:00 AM - 2:00 PM',
    'contact.info.hours.sunday': 'Sun: Closed',
    'contact.form.title': 'Send Us a Message',
    'contact.form.sending': 'Sending...',
    'contact.info.follow': 'Follow Us',
    
    // Additional UI elements
    'ui.viewDetails': 'View Details',
    'ui.learnMore': 'Learn More',
    'ui.getQuote': 'Get Quote',
    'ui.callToAction': 'Ready to Transform Your Space?',
    'ui.newsletter': 'Newsletter',
    'ui.subscribe': 'Subscribe',
    'ui.quickLinks': 'Quick Links',
  },
  
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.projects': 'المشاريع',
    'nav.products': 'المنتجات',
    'nav.contact': 'اتصل بنا',
    
    // Home page
    'home.hero.title': 'التميز في الرخام منذ 1998',
    'home.hero.subtitle': 'مبدعو حلول الرخام الفاخر في الدار البيضاء، المغرب. متخصصون في المشاريع المخصصة للفنادق والجامعات والمساكن والمساحات التجارية.',
    'home.hero.cta': 'اكتشف أعمالنا',
    'home.hero.cta2': 'خدماتنا',
    
    // About section
    'home.about.title': 'حول جرومربر',
    'home.about.description': 'مع أكثر من 25 عامًا من الخبرة، جرومربر هي الشركة الرائدة في المغرب لتحويل الرخام. نحن نجمع بين الحرفية التقليدية والتكنولوجيا الحديثة لإنشاء أعمال استثنائية.',
    'home.about.experience': 'سنة من التميز',
    'home.about.projects': 'مشروع مكتمل',
    'home.about.satisfaction': 'رضا العملاء',
    
    // Services section
    'home.services.title': 'خدماتنا',
    'home.services.design': 'التصميم والتخطيط',
    'home.services.design.desc': 'خطط مخصصة وتصورات ثلاثية الأبعاد لمشاريعك',
    'home.services.fabrication': 'التصنيع المخصص',
    'home.services.fabrication.desc': 'قطع وتشكيل دقيق وفقًا لمواصفاتك',
    'home.services.installation': 'التركيب المهني',
    'home.services.installation.desc': 'تركيب متخصص من قبل فرقنا المؤهلة',
    'home.services.maintenance': 'الصيانة والترميم',
    'home.services.maintenance.desc': 'خدمات صيانة وترميم الرخام',
    
    // Products section
    'home.products.title': 'رخامنا المميز',
    'home.products.calacatta': 'كالاكاتا الذهبي',
    'home.products.calacatta.desc': 'رخام إيطالي فاخر بعروق ذهبية أنيقة',
    'home.products.carrara': 'كارارا الأبيض',
    'home.products.carrara.desc': 'رخام إيطالي كلاسيكي بنقاء استثنائي',
    'home.products.emperador': 'إمبرادور الداكن',
    'home.products.emperador.desc': 'رخام إسباني بألوان غنية وعميقة',
    
    // Contact section
    'home.contact.title': 'اتصل بنا',
    'home.contact.description': 'مستعد لتحويل مساحتك؟ اتصل بخبرائنا للحصول على استشارة مجانية.',
    'home.contact.cta': 'طلب عرض سعر',
    
    // Products page
    'products.cta.description': 'يمكننا توفير أنواع نادرة ومخصصة من الرخام لمشروعك. اتصل بنا مع متطلباتك.',
    
    // Footer
    'footer.company': 'الشركة',
    'footer.services': 'الخدمات',
    'footer.contact': 'اتصل بنا',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.address': 'الدار البيضاء، المغرب',
    'footer.phone': 'الهاتف',
    'footer.email': 'البريد الإلكتروني',
    'footer.newsletter.desc': 'اشترك لتلقي التحديثات حول المنتجات والمشاريع الجديدة.',
    'footer.description': 'حلول الرخام الفاخرة للمساحات الراقية. مع أكثر من 20 عاماً من الخبرة، نضفي الأناقة الخالدة على كل مشروع.',
    
    // Contact page
    'contact.title': 'اتصل بجرومربر',
    'contact.subtitle': 'لنحول أفكارك إلى واقع معًا',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.email': 'عنوان البريد الإلكتروني',
    'contact.form.phone': 'الهاتف',
    'contact.form.subject': 'الموضوع',
    'contact.form.message': 'الرسالة',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.info.title': 'معلومات الاتصال',
    'contact.info.address': 'العنوان',
    'contact.info.hours': 'ساعات العمل',
    'contact.info.hours.weekday': 'الاثنين - الجمعة: 8:00 ص - 6:00 م',
    'contact.info.hours.saturday': 'السبت: 8:00 ص - 2:00 م',
    'contact.info.hours.sunday': 'الأحد: مغلق',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.sending': 'جاري الإرسال...',
    'contact.info.follow': 'تابعونا',
    
    // Additional UI elements
    'ui.viewDetails': 'عرض التفاصيل',
    'ui.learnMore': 'اعرف المزيد',
    'ui.getQuote': 'احصل على عرض سعر',
    'ui.callToAction': 'مستعد لتحويل مساحتك؟',
    'ui.newsletter': 'النشرة الإخبارية',
    'ui.subscribe': 'اشترك',
    'ui.quickLinks': 'روابط سريعة',
  }
};