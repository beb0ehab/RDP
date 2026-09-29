import type { Project } from '../types';

/**
 * All portfolio projects. Order = importance (first = most important).
 *
 * - `featured: true`  → main grid
 * - `featured: false` → hidden under the "More projects" toggle
 * - `url`             → shows a "Live site" button (and lets `npm run screenshots` capture it)
 *
 * Screenshots are picked up automatically from src/data/screenshots.json
 * (written by `npm run screenshots`). Projects without one show the branded placeholder.
 */
export const projects: Project[] = [
  {
    id: 'kero-tours',
    title: { en: 'Kero Tours', ar: 'Kero Tours' },
    subtitle: { en: 'Tour Booking Website', ar: 'موقع حجز رحلات سياحية' },
    badge: { en: 'Client project', ar: 'مشروع لعميل' },
    summary: {
      en: 'Tour booking website built and delivered for a paying client, a Hurghada tour operator.',
      ar: 'موقع لحجز الرحلات السياحية نفّذته وسلّمته لعميل حقيقي، شركة رحلات في الغردقة.',
    },
    details: {
      en: [
        'Built and delivered for a paying client, a Hurghada tour operator.',
        '30+ trips across sea, desert, entertainment and historical categories, plus bundled packages.',
        'One-tap WhatsApp booking on every trip.',
        'Clear per-person, group and area-based pricing.',
      ],
      ar: [
        'نفّذته وسلّمته لعميل حقيقي، شركة تنظّم رحلات في الغردقة.',
        'أكثر من 30 رحلة موزّعة بين البحر والصحراء والترفيه والأماكن التاريخية، إلى جانب باقات مجمّعة.',
        'حجز بضغطة واحدة عبر واتساب على كل رحلة.',
        'أسعار واضحة للفرد وللمجموعات وحسب المنطقة.',
      ],
    },
    tech: ['React', 'Vite'],
    url: 'https://kerotourshurghada.com',
    placeholder: { icon: 'map', from: '#0ea5b7', to: '#1e3a8a' },
    featured: true,
  },
  {
    id: 'leadora',
    title: { en: 'LEADORA', ar: 'LEADORA' },
    subtitle: { en: 'CRM for Arabic Sales Teams', ar: 'نظام CRM لفرق المبيعات العربية' },
    summary: {
      en: 'Seven-stage sales pipeline, multi-channel lead intake and role-based executive dashboards. Arabic-first (RTL).',
      ar: 'مسار مبيعات من سبع مراحل، واستقبال العملاء المحتملين من أكثر من قناة، ولوحات تحكم للإدارة حسب الصلاحيات. بالعربية أولًا.',
    },
    details: {
      en: [
        'Seven-stage sales pipeline.',
        'Multi-channel lead intake.',
        'Attendance, payroll and role-based executive dashboards.',
        'Commission is calculated the moment a demo is logged.',
        'Arabic-first (RTL) UI with an English toggle.',
      ],
      ar: [
        'مسار مبيعات من سبع مراحل.',
        'استقبال العملاء المحتملين من قنوات متعددة.',
        'الحضور والانصراف والرواتب، ولوحات تحكم للإدارة حسب الصلاحيات.',
        'حساب العمولة لحظة تسجيل العرض التجريبي (الديمو).',
        'واجهة عربية أولًا (من اليمين لليسار) مع إمكانية التحويل للإنجليزية.',
      ],
    },
    tech: ['PHP', 'MySQL', 'JavaScript'],
    url: 'https://leadora-crm.com',
    placeholder: { icon: 'pipeline', from: '#7c3aed', to: '#0f172a' },
    featured: true,
  },
  {
    id: 'volume4t',
    title: { en: 'Volume 4T', ar: 'Volume 4T' },
    subtitle: { en: 'Company Website & CRM', ar: 'موقع شركة ونظام CRM' },
    summary: {
      en: 'Company website with an integrated CRM tracking 500+ leads a day, plus an LLM assistant for the CEO.',
      ar: 'موقع شركة مع نظام CRM متكامل يتابع أكثر من 500 عميل محتمل يوميًا، ومساعد ذكاء اصطناعي للمدير التنفيذي.',
    },
    details: {
      en: [
        'Company website with an integrated CRM tracking 500+ leads a day.',
        'Role-based access for sales reps, team leaders and the CEO.',
        'Automated attendance, payroll and commission.',
        'An LLM assistant lets the CEO ask about company finances in plain language.',
      ],
      ar: [
        'موقع للشركة مع نظام CRM متكامل يتابع أكثر من 500 عميل محتمل يوميًا.',
        'صلاحيات مختلفة لمندوبي المبيعات وقادة الفرق والمدير التنفيذي.',
        'أتمتة الحضور والرواتب والعمولات.',
        'مساعد يعمل بنموذج لغوي (LLM) يتيح للمدير التنفيذي السؤال عن الأرقام المالية للشركة بلغة عادية.',
      ],
    },
    tech: ['PHP', 'JavaScript', 'MySQL', 'LLM API'],
    url: 'https://volume4t.com',
    placeholder: { icon: 'building', from: '#f59e0b', to: '#9a3412' },
    featured: true,
  },
  {
    id: 'fbauto',
    title: { en: 'FBAUTO', ar: 'FBAUTO' },
    subtitle: {
      en: 'Facebook Lead Harvesting Desktop App',
      ar: 'تطبيق سطح مكتب لجمع العملاء المحتملين من فيسبوك',
    },
    summary: {
      en: 'Windows desktop app that pulls leads from Facebook posts and groups, scores them by buying intent and exports them to Excel.',
      ar: 'تطبيق ويندوز يجمع العملاء المحتملين من منشورات وجروبات فيسبوك، ويقيّمهم حسب نية الشراء، ويصدّرهم إلى Excel.',
    },
    details: {
      en: [
        "Collects comments from a single post or from a group's top posts, capturing structured data from Facebook's GraphQL responses through the Brave browser.",
        'Scores every lead with buying-intent rules and Arabic-aware matching; a phone number in a comment raises the score.',
        'Terminal-style Arabic desktop UI: paste a link, watch the harvest live, filter leads and export.',
        'Saved-leads mini CRM: star a lead to file it into custom categories.',
        'Excel export, raw data kept for re-parsing, a command-line interface, serial-key licensing with auto-update, and a packaged Windows build.',
      ],
      ar: [
        'يجمع التعليقات من منشور واحد أو من أهم منشورات جروب، ويلتقط البيانات المنظّمة من استجابات GraphQL الخاصة بفيسبوك عبر متصفح Brave.',
        'يقيّم كل عميل محتمل بقواعد لنية الشراء مع مطابقة تراعي اللغة العربية، ووجود رقم هاتف في التعليق يرفع التقييم.',
        'واجهة سطح مكتب عربية بطابع الـ Terminal: ضع الرابط، وتابع الجمع لحظة بلحظة، وفلتر العملاء وصدّرهم.',
        'نظام CRM مصغّر للعملاء المحفوظين: علّم أي عميل بنجمة ليُحفظ في تصنيفات مخصصة.',
        'تصدير إلى Excel، وحفظ البيانات الخام لإعادة تحليلها، وواجهة أوامر (CLI)، وترخيص بمفتاح سيريال مع تحديث تلقائي، ونسخة ويندوز مجمّعة كتطبيق مستقل.',
      ],
    },
    tech: [
      'Python',
      'Playwright (patchright)',
      'pywebview',
      'SQLite',
      'SQLAlchemy',
      'openpyxl',
      'PHP',
    ],
    placeholder: { icon: 'target', from: '#7c3aed', to: '#1e1b4b' },
    landing: 'fbauto/',
    featured: true,
  },
  {
    id: 'ai-workspace',
    title: { en: 'AI Workspace', ar: 'AI Workspace' },
    subtitle: {
      en: 'Local-First Knowledge & Agent Desktop App',
      ar: 'تطبيق سطح مكتب للمعرفة والوكلاء، يعمل محليًا أولًا',
    },
    summary: {
      en: 'Connects notes, files, tasks and sources into one knowledge graph. AI agents enhance it but are never required.',
      ar: 'يربط الملاحظات والملفات والمهام والمصادر في شبكة معرفة واحدة. وكلاء الذكاء الاصطناعي يضيفون له قيمة، لكنه يعمل بدونهم.',
    },
    details: {
      en: [
        'Connects notes, files, tasks and sources into one knowledge graph.',
        'Backlinks and revision history.',
        'AI agents enhance it but are never required.',
        'Verified backup/restore and integrity checks.',
      ],
      ar: [
        'يربط الملاحظات والملفات والمهام والمصادر في شبكة معرفة واحدة.',
        'روابط عكسية (Backlinks) وسجل كامل للتعديلات.',
        'وكلاء الذكاء الاصطناعي يحسّنون التجربة، لكن التطبيق لا يعتمد عليهم.',
        'نسخ احتياطي واستعادة مع التحقق منهما، وفحوصات لسلامة البيانات.',
      ],
    },
    tech: ['Electron', 'SQLite', 'LLM'],
    placeholder: { icon: 'graph', from: '#10b981', to: '#064e3b' },
    featured: true,
  },
  {
    id: 'arabic-voice',
    title: { en: 'Arabic Voice Regeneration Tool', ar: 'أداة إعادة توليد الصوت العربي' },
    subtitle: { en: 'Speech → Text → Neural Voice', ar: 'من الكلام إلى النص إلى صوت طبيعي' },
    summary: {
      en: 'Records Arabic speech, transcribes it and regenerates it in a natural neural voice.',
      ar: 'تسجّل الكلام العربي، وتحوّله إلى نص، ثم تعيد توليده بصوت طبيعي باستخدام الشبكات العصبية.',
    },
    details: {
      en: [
        'Records Arabic speech, transcribes it and regenerates it in a natural neural voice.',
        'Audio cleanup.',
        'Automatic fallback to a secondary engine.',
      ],
      ar: [
        'تسجّل الكلام العربي، وتحوّله إلى نص، ثم تعيد توليده بصوت طبيعي.',
        'تنقية الصوت وتحسينه.',
        'تحويل تلقائي إلى محرّك احتياطي عند الحاجة.',
      ],
    },
    tech: ['Python', 'Speech recognition', 'Neural TTS'],
    placeholder: { icon: 'mic', from: '#ec4899', to: '#581c87' },
    featured: true,
  },
  {
    id: 'pilotvbot',
    title: { en: 'PilotVBot', ar: 'PilotVBot' },
    subtitle: { en: 'Telegram Bot', ar: 'بوت تيليجرام' },
    summary: {
      en: 'Arabic Telegram bot with referral registration, admin approval and automatic content delivery.',
      ar: 'بوت تيليجرام عربي بتسجيل عن طريق الإحالة، وموافقة من الإدارة، وتوصيل تلقائي للمحتوى.',
    },
    details: {
      en: [
        'Arabic Telegram bot with referral registration.',
        'Admin approval and automatic content delivery.',
        'Runs on cheap shared hosting.',
      ],
      ar: [
        'بوت تيليجرام عربي بنظام تسجيل عن طريق الإحالة.',
        'موافقة من الإدارة، وتوصيل تلقائي للمحتوى.',
        'يعمل على استضافة مشتركة منخفضة التكلفة.',
      ],
    },
    tech: ['Python', 'aiogram 3', 'async SQLAlchemy'],
    placeholder: { icon: 'send', from: '#38bdf8', to: '#1e40af' },
    featured: false,
  },
  {
    id: 'sco4m',
    title: { en: 'SCO4M', ar: 'SCO4M' },
    subtitle: {
      en: 'Social Media Services Platform (SMM Panel)',
      ar: 'منصة خدمات سوشيال ميديا (SMM Panel)',
    },
    summary: {
      en: 'An Arabic-first platform for ordering social media services across Instagram, TikTok, YouTube and more, with automatic order dispatch, balance tracking and an API for resellers.',
      ar: 'منصة عربية لطلب خدمات السوشيال ميديا لإنستجرام وتيك توك ويوتيوب وغيرها، مع إرسال أوتوماتيك للطلبات، ورصيد محسوب، وواجهة API للموزّعين.',
    },
    details: {
      en: [
        'Service catalogue across many platforms (Instagram, TikTok, YouTube, Telegram, Facebook, X and more).',
        'Orders are sent to the provider automatically after payment, with status tracking from the dashboard.',
        'Any unfilled quantity is refunded to the user balance automatically.',
        'Reseller API compatible with the SMM API v2 standard.',
        'Balance top-up via Vodafone Cash with transfer-proof review.',
        'Arabic-first interface with an English version.',
      ],
      ar: [
        'كتالوج خدمات لمنصات كتير (إنستجرام، تيك توك، يوتيوب، تيليجرام، فيسبوك، X وغيرها).',
        'الطلب بيتبعت للمزوّد تلقائيًا بعد الدفع، مع متابعة الحالة من لوحة التحكم.',
        'أي كمية لم تُنفّذ بترجع لرصيد المستخدم تلقائيًا.',
        'واجهة API للموزّعين متوافقة مع معيار SMM API v2.',
        'شحن الرصيد بفودافون كاش مع مراجعة إثبات التحويل.',
        'واجهة بالعربية أولًا مع نسخة إنجليزية.',
      ],
    },
    tech: ['Web platform', 'SMM API v2', 'Arabic / English'],
    url: 'https://sco4m.com',
    placeholder: { icon: 'target', from: '#e11d48', to: '#18181b' },
    featured: false,
  },
  {
    id: 'wahm',
    title: { en: 'Wahm', ar: 'Wahm' },
    subtitle: {
      en: 'Digital Subscriptions & Services Store',
      ar: 'متجر اشتراكات وخدمات رقمية',
    },
    summary: {
      en: 'An Arabic online store for digital subscriptions (Spotify, Netflix, Shahid, ChatGPT, Canva), social media services and game top-ups, with a simple order flow finished on WhatsApp.',
      ar: 'متجر عربي أونلاين للاشتراكات الرقمية (Spotify وNetflix وShahid وChatGPT وCanva)، وخدمات السوشيال ميديا، وشحن الألعاب، مع خطوات طلب بسيطة تكتمل على واتساب.',
    },
    details: {
      en: [
        'Catalogue of digital subscriptions, social media services and game top-ups (PUBG UC, Free Fire gems).',
        'A dedicated page per service, with prices, discounts and badges (trending, best seller, new).',
        'Order flow: choose a service, enter details, upload payment proof, then send the order via WhatsApp.',
        'Arabic RTL interface with a premium gold-on-black design, responsive on mobile.',
      ],
      ar: [
        'كتالوج اشتراكات رقمية وخدمات سوشيال ميديا وشحن ألعاب (PUBG UC وجواهر Free Fire).',
        'صفحة خاصة لكل خدمة بالسعر والخصم وشارات (رائج، الأكثر مبيعًا، جديد).',
        'خطوات الطلب: اختيار الخدمة، إدخال البيانات، رفع إثبات الدفع، ثم إرسال الطلب على واتساب.',
        'واجهة عربية (RTL) بتصميم ذهبي على أسود، ومتجاوبة مع الموبايل.',
      ],
    },
    tech: ['PHP', 'JavaScript', 'HTML', 'CSS'],
    url: 'https://wahm.space',
    placeholder: { icon: 'target', from: '#b8862e', to: '#18181b' },
    featured: false,
  },
  {
    id: 'x-marketing-scraper',
    title: { en: 'X Engine', ar: 'X Engine' },
    subtitle: {
      en: 'Desktop Dashboard for X Outreach & Scraping',
      ar: 'لوحة تحكم لسطح المكتب للتسويق وجمع البيانات على X',
    },
    badge: { en: 'Client project', ar: 'مشروع لعميل' },
    summary: {
      en: 'A desktop app for collecting X users and posts, managing outreach and reviewing results, with its dashboard running on a local Flask server.',
      ar: 'تطبيق سطح مكتب لجمع المستخدمين والمنشورات من X، وإدارة التواصل ومراجعة النتائج، ولوحة التحكم بتاعته شغالة على سيرفر Flask محلي.',
    },
    details: {
      en: [
        'Scrapes X communities and keyword searches.',
        'Classifies posts with rules or AI.',
        'Sends direct messages and schedules posts.',
        'Exports collected data to Excel.',
        'Desktop dashboard served by a local Flask server.',
      ],
      ar: [
        'يجمع البيانات من مجتمعات X ومن البحث بالكلمات المفتاحية.',
        'يصنّف المنشورات بالقواعد أو بالذكاء الاصطناعي.',
        'يرسل رسائل مباشرة ويجدول المنشورات.',
        'يصدّر البيانات المجمّعة إلى Excel.',
        'لوحة تحكم لسطح المكتب تعمل من خلال سيرفر Flask محلي.',
      ],
    },
    tech: ['Python', 'Flask', 'Playwright', 'SQLite', 'pywebview'],
    placeholder: { icon: 'send', from: '#3f3f46', to: '#09090b' },
    featured: false,
  },
  {
    id: 'telegram-members-manager',
    title: { en: 'Telegram Members Manager', ar: 'Telegram Members Manager' },
    subtitle: {
      en: 'Desktop Tool for Managing Telegram Groups',
      ar: 'أداة سطح مكتب لإدارة جروبات تيليجرام',
    },
    badge: { en: 'Client project', ar: 'مشروع لعميل' },
    summary: {
      en: 'A Python desktop app for managing Telegram sessions, collecting group members and adding them to groups, with messaging and a local inbox.',
      ar: 'تطبيق سطح مكتب بلغة Python لإدارة جلسات تيليجرام، وجمع أعضاء الجروبات وإضافتهم إلى جروبات أخرى، مع إرسال الرسائل وصندوق وارد محلي.',
    },
    details: {
      en: [
        'Creates and manages Telegram sessions.',
        'Searches groups and collects member data.',
        'Adds members from groups, Excel or a local database.',
        'Sends messages to recipients from Excel.',
        'Stores conversations in a local inbox.',
      ],
      ar: [
        'إنشاء جلسات تيليجرام وإدارتها.',
        'البحث عن الجروبات وجمع بيانات أعضائها.',
        'إضافة الأعضاء من جروبات أو من ملف Excel أو من قاعدة بيانات محلية.',
        'إرسال رسائل لقائمة مستلمين من ملف Excel.',
        'حفظ المحادثات في صندوق وارد محلي.',
      ],
    },
    tech: ['Python', 'CustomTkinter', 'Pyrogram', 'Telethon', 'SQLite'],
    placeholder: { icon: 'send', from: '#229ed9', to: '#0b3a57' },
    featured: false,
  },
  {
    id: 'autopostinsta',
    title: { en: 'AutoPostInsta', ar: 'AutoPostInsta' },
    subtitle: {
      en: 'Instagram Reel Publishing Control Panel',
      ar: 'لوحة تحكم لنشر ريلز إنستجرام',
    },
    badge: { en: 'Client project', ar: 'مشروع لعميل' },
    summary: {
      en: 'A local web dashboard for managing Instagram accounts and publishing Reels, with direct uploads and an automatic mode that checks configured target accounts.',
      ar: 'لوحة تحكم ويب محلية لإدارة حسابات إنستجرام ونشر الريلز، مع رفع مباشر ووضع تلقائي يتابع الحسابات المستهدفة.',
    },
    details: {
      en: [
        'Connect and manage multiple Instagram accounts.',
        'Queue Reel links with captions, target accounts and delays.',
        'Automatically check target accounts for new clips.',
        'Save upload history to avoid reposting tracked clips.',
      ],
      ar: [
        'ربط وإدارة أكثر من حساب إنستجرام.',
        'جدولة روابط الريلز مع الكابشن والحسابات المستهدفة والفواصل الزمنية.',
        'متابعة الحسابات المستهدفة تلقائيًا لالتقاط المقاطع الجديدة.',
        'حفظ سجل الرفع لتجنّب إعادة نشر نفس المقاطع.',
      ],
    },
    tech: ['Python', 'HTML', 'CSS', 'JavaScript', 'instagrapi'],
    placeholder: { icon: 'send', from: '#e11d48', to: '#18181b' },
    featured: false,
  },
  {
    id: 'github-power-explorer',
    title: { en: 'GitHub Power Explorer', ar: 'GitHub Power Explorer' },
    subtitle: { en: 'LLM-powered GitHub search', ar: 'بحث في GitHub بالذكاء الاصطناعي' },
    summary: {
      en: 'Uses an LLM to turn Arabic project descriptions into GitHub searches and ranks results by relevance.',
      ar: 'يستخدم نموذجًا لغويًا لتحويل وصف المشروع بالعربية إلى عمليات بحث في GitHub، ويرتّب النتائج حسب الصلة.',
    },
    details: {
      en: [
        'Uses an LLM to turn Arabic project descriptions into GitHub searches.',
        'Runs the searches in parallel.',
        'Ranks results by relevance.',
      ],
      ar: [
        'يستخدم نموذجًا لغويًا لتحويل وصف المشروع بالعربية إلى عمليات بحث في GitHub.',
        'ينفّذ عمليات البحث بالتوازي.',
        'يرتّب النتائج حسب مدى صلتها بالمطلوب.',
      ],
    },
    tech: ['Flask', 'GitHub API', 'Llama 3.3'],
    placeholder: { icon: 'search', from: '#64748b', to: '#0f172a' },
    featured: false,
  },
  {
    id: 'buying-intent',
    title: { en: 'Arabic Buying-Intent Scoring Engine', ar: 'محرّك تقييم نية الشراء بالعربية' },
    subtitle: { en: 'NLP for social posts', ar: 'معالجة لغة طبيعية للمنشورات' },
    summary: {
      en: 'Ranks social posts by real buying intent instead of engagement.',
      ar: 'يرتّب منشورات السوشيال ميديا حسب نية الشراء الحقيقية بدلًا من التفاعل.',
    },
    details: {
      en: [
        'Ranks social posts by real buying intent instead of engagement.',
        'Arabic text normalization.',
        'Word-boundary matching.',
      ],
      ar: [
        'يرتّب منشورات السوشيال ميديا حسب نية الشراء الحقيقية بدلًا من التفاعل.',
        'توحيد وتطبيع النص العربي.',
        'مطابقة دقيقة على حدود الكلمات.',
      ],
    },
    tech: ['Python', 'NLP'],
    placeholder: { icon: 'target', from: '#ef4444', to: '#7c2d12' },
    featured: false,
  },
];
