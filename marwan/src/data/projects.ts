import type { Project } from '../types';

/**
 * Marwan's projects. The array order is the display order.
 * Screenshots: public/projects/<id>-desktop.webp (listed in src/data/screenshots.json).
 */
export const projects: Project[] = [
  {
    id: 'volume4t',
    title: { en: 'Volume4t', ar: 'Volume4t' },
    subtitle: {
      en: 'Sales Agency Serving the Stock Markets',
      ar: 'وكالة مبيعات تخدم أسواق الأسهم',
    },
    badge: { en: 'Co-Founder & CEO', ar: 'شريك مؤسس ومدير تنفيذي' },
    summary: {
      en: 'The sales agency I co-founded and lead — strategy, operations, client acquisition and sales performance, backed by internal CRM and AI automation systems.',
      ar: 'وكالة المبيعات التي شاركت في تأسيسها وأديرها — الاستراتيجية والتشغيل واكتساب العملاء وأداء المبيعات، بدعم من أنظمة CRM وأتمتة بالذكاء الاصطناعي داخلية.',
    },
    details: {
      en: [
        'Lead company strategy, operations, business development, client acquisition and sales performance.',
        'Manage and coach sales agents, set targets, monitor pipelines, and improve follow-up and closing processes.',
        'Build internal CRM, lead-generation, data-processing and AI automation systems supporting daily operations.',
      ],
      ar: [
        'قيادة استراتيجية الشركة وتشغيلها وتطوير الأعمال واكتساب العملاء وأداء المبيعات.',
        'إدارة وتدريب فريق المبيعات، وتحديد الأهداف، ومتابعة الـ pipelines، وتحسين المتابعة وإغلاق الصفقات.',
        'بناء أنظمة CRM داخلية وتوليد عملاء محتملين ومعالجة بيانات وأتمتة بالذكاء الاصطناعي للعمليات اليومية.',
      ],
    },
    tech: ['Sales Leadership', 'CRM', 'AI Automation'],
    placeholder: { icon: 'building', from: '#7a0a16', to: '#0a0a0b' },
  },
  {
    id: 'leadora',
    title: { en: 'LEADORA CRM', ar: 'LEADORA CRM' },
    subtitle: { en: 'End-to-End Sales CRM', ar: 'نظام CRM متكامل للمبيعات' },
    summary: {
      en: 'Full-stack CRM for sales pipelines, lead distribution, team management, attendance, payroll, commissions and executive reporting.',
      ar: 'نظام CRM متكامل لإدارة مراحل المبيعات وتوزيع العملاء المحتملين وإدارة الفريق والحضور والمرتبات والعمولات وتقارير الإدارة.',
    },
    details: {
      en: [
        'Sales pipelines and lead distribution across the team.',
        'Team operations: attendance, payroll and commissions.',
        'Executive reporting for management.',
      ],
      ar: [
        'مراحل المبيعات وتوزيع العملاء المحتملين على الفريق.',
        'تشغيل الفريق: الحضور والمرتبات والعمولات.',
        'تقارير للإدارة العليا.',
      ],
    },
    tech: ['PHP', 'Python', 'React', 'Node.js', 'MySQL'],
    placeholder: { icon: 'pipeline', from: '#3f3f46', to: '#09090b' },
  },
  {
    id: 'lead-research-tools',
    title: { en: 'Lead Research & Automation Tools', ar: 'أدوات البحث عن العملاء والأتمتة' },
    subtitle: {
      en: 'Prospect Data for Outreach & CRM',
      ar: 'بيانات العملاء المحتملين للتواصل والـ CRM',
    },
    summary: {
      en: 'Tools that collect, process, evaluate and organize online prospect data for outreach and CRM workflows.',
      ar: 'أدوات تجمع بيانات العملاء المحتملين من الإنترنت وتعالجها وتقيّمها وتنظّمها للتواصل ولسير العمل في الـ CRM.',
    },
    details: {
      en: [
        'Automated workflows for lead research, outreach, qualification, scheduling, monitoring and CRM updates.',
        'API integrations, Python and Node.js bots, and LLM-based agents for content and data analysis.',
      ],
      ar: [
        'سير عمل مؤتمت للبحث عن العملاء والتواصل والتأهيل والجدولة والمتابعة وتحديث الـ CRM.',
        'ربط APIs، وبوتات بـ Python و Node.js، ووكلاء ذكاء اصطناعي (LLM) لتحليل المحتوى والبيانات.',
      ],
    },
    tech: ['Python', 'Node.js', 'REST APIs', 'LLM Agents'],
    placeholder: { icon: 'search', from: '#7a0a16', to: '#1a0508' },
  },
];
