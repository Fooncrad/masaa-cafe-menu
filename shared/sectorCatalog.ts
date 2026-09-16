export type SectorCatalogEntry = {
  slug: string;
  labelAr: string;
  labelEn: string;
  labelFr: string;
  descriptionAr: string;
  icon: string;
  color: string;
  categories: Array<{ ar: string; en: string; fr: string; items: string[] }>;
  serviceModes: string[];
  customFields: string[];
};

export const sectorCatalog: SectorCatalogEntry[] = [
  {
    slug: "restaurant",
    labelAr: "المطاعم والمأكولات والمقاهي",
    labelEn: "Restaurants, Food & Cafes",
    labelFr: "Restaurants, cuisine et cafés",
    descriptionAr: "منيو تفاعلي، إضافات، مطبخ، طاولات، سفري، استلام وتوصيل.",
    icon: "utensils",
    color: "#f97316",
    categories: [
      { ar: "مقبلات", en: "Appetizers", fr: "Entrées", items: ["حمص", "تبولة", "بطاطس مقلية"] },
      { ar: "أطباق رئيسية", en: "Main Dishes", fr: "Plats principaux", items: ["برجر", "مشاوي", "بيتزا"] },
      { ar: "حلويات", en: "Desserts", fr: "Desserts", items: ["كيك", "تشيز كيك", "آيس كريم"] },
      { ar: "مشروبات", en: "Drinks", fr: "Boissons", items: ["قهوة", "عصائر", "مشروبات باردة"] },
    ],
    serviceModes: ["dine_in", "takeaway", "pickup", "delivery", "reservation", "hotel"],
    customFields: ["الإضافات", "الحجم", "المكونات", "الحساسية", "وقت التحضير", "محطة الطباعة"],
  },
  {
    slug: "fashion",
    labelAr: "الموضة والأزياء والملبوسات",
    labelEn: "Fashion, Clothing & Apparel",
    labelFr: "Mode et habillement",
    descriptionAr: "مقاسات، ألوان، تفصيل، مراحل تصنيع، شحن واستلام.",
    icon: "shirt",
    color: "#db2777",
    categories: [
      { ar: "عبايات", en: "Abayas", fr: "Abayas", items: ["عباية عملية", "عباية مطرزة", "عباية مناسبات"] },
      { ar: "فساتين", en: "Dresses", fr: "Robes", items: ["فستان سهرة", "فستان يومي", "فستان أطفال"] },
      { ar: "ملابس جاهزة", en: "Ready to Wear", fr: "Prêt-à-porter", items: ["قميص", "بنطال", "طقم"] },
      { ar: "أقمشة وإكسسوارات", en: "Fabrics & Accessories", fr: "Tissus et accessoires", items: ["قماش", "طرحة", "حقيبة"] },
    ],
    serviceModes: ["pickup", "delivery", "shipping", "custom_order"],
    customFields: ["المقاس", "اللون", "نوع القماش", "طول الكم", "القياسات المخصصة", "مرحلة التصنيع"],
  },
  {
    slug: "beauty_salon",
    labelAr: "الصالونات ومراكز التجميل والحلاقة",
    labelEn: "Beauty Salons & Barbers",
    labelFr: "Salons de beauté et coiffure",
    descriptionAr: "حجوزات، كراسي، فنيون، غرف، مدة الخدمة وباقات العناية.",
    icon: "scissors",
    color: "#8b5cf6",
    categories: [
      { ar: "الشعر والحلاقة", en: "Hair & Barber", fr: "Coiffure", items: ["قص شعر", "تسريحة", "صبغة"] },
      { ar: "العناية بالبشرة", en: "Skin Care", fr: "Soins de la peau", items: ["تنظيف بشرة", "جلسة عناية", "تقشير"] },
      { ar: "الأظافر والمكياج", en: "Nails & Makeup", fr: "Ongles et maquillage", items: ["مانيكير", "بديكير", "مكياج مناسبات"] },
      { ar: "المساج والسبا", en: "Massage & Spa", fr: "Massage et spa", items: ["مساج", "جلسة سبا", "باقة عناية"] },
    ],
    serviceModes: ["appointment", "walk_in", "deposit"],
    customFields: ["الفني", "الكرسي", "الغرفة", "مدة الخدمة", "العربون", "ملاحظات العميل"],
  },
  {
    slug: "grocery",
    labelAr: "البقالات والتموينات والهايبرماركت",
    labelEn: "Grocery Stores & Hypermarkets",
    labelFr: "Épiceries et hypermarchés",
    descriptionAr: "باركود، كاشير، مخزون، مستودعات، صلاحية، عروض وتوصيل.",
    icon: "shopping-cart",
    color: "#0ea5e9",
    categories: [
      { ar: "معلبات ومواد أساسية", en: "Canned & Essentials", fr: "Épicerie", items: ["أرز", "زيت", "معلبات"] },
      { ar: "ألبان ومجمدات", en: "Dairy & Frozen", fr: "Produits laitiers", items: ["حليب", "جبن", "مجمدات"] },
      { ar: "مخبوزات", en: "Bakery", fr: "Boulangerie", items: ["خبز", "كرواسون", "معجنات"] },
      { ar: "منزلية", en: "Household", fr: "Maison", items: ["منظفات", "أدوات منزلية", "مناديل"] },
    ],
    serviceModes: ["pickup", "delivery", "cashier"],
    customFields: ["الباركود", "وحدة البيع", "حد المخزون", "تاريخ الصلاحية", "المستودع", "البدائل"],
  },
  {
    slug: "vegetables",
    labelAr: "الخضار والفواكه والتمور والمنتجات الطازجة",
    labelEn: "Fresh Produce, Fruits & Dates",
    labelFr: "Produits frais, fruits et dattes",
    descriptionAr: "بيع بالوزن، جودة، تعبئة، سلال، توصيل ودفع عند الاستلام.",
    icon: "apple",
    color: "#22c55e",
    categories: [
      { ar: "فواكه", en: "Fruits", fr: "Fruits", items: ["تفاح", "موز", "برتقال"] },
      { ar: "خضروات", en: "Vegetables", fr: "Légumes", items: ["طماطم", "خيار", "خضار ورقية"] },
      { ar: "تمور ومكسرات", en: "Dates & Nuts", fr: "Dattes et noix", items: ["تمور", "مكسرات", "عسل"] },
      { ar: "سلال جاهزة", en: "Ready Baskets", fr: "Paniers", items: ["سلة فواكه", "سلة خضار", "سلة موسمية"] },
    ],
    serviceModes: ["pickup", "delivery", "cash_on_delivery"],
    customFields: ["الوزن", "الكيلو", "الغرام", "الجودة", "التغليف", "الوزن الفعلي"],
  },
  {
    slug: "laundry",
    labelAr: "مغاسل الملابس والسجاد والعناية",
    labelEn: "Laundry, Carpet Cleaning & Care",
    labelFr: "Blanchisserie et nettoyage",
    descriptionAr: "تذاكر، قطع، رفوف، مراحل تنظيف، جاهزية، تسليم وتوصيل.",
    icon: "shirt",
    color: "#6366f1",
    categories: [
      { ar: "غسيل جاف", en: "Dry Cleaning", fr: "Nettoyage à sec", items: ["ثوب", "فستان", "جاكيت"] },
      { ar: "كوي وعناية", en: "Ironing & Care", fr: "Repassage", items: ["كوي بخار", "غسيل خاص", "إزالة بقع"] },
      { ar: "بطانيات وسجاد", en: "Blankets & Rugs", fr: "Couvertures et tapis", items: ["بطانية", "سجادة", "ستارة"] },
    ],
    serviceModes: ["drop_off", "pickup", "delivery"],
    customFields: ["نوع القطعة", "عدد القطع", "رقم التذكرة", "الرف", "موعد الجاهزية", "حالة الفحص"],
  },
  {
    slug: "automotive",
    labelAr: "خدمات السيارات والصيانة ومغاسل السيارات",
    labelEn: "Automotive, Repair & Car Wash",
    labelFr: "Auto, réparation et lavage",
    descriptionAr: "مركبات، مسارات، أوامر عمل، فنيون، قطع غيار وفاتورة موحدة.",
    icon: "car",
    color: "#ef4444",
    categories: [
      { ar: "غسيل وعناية", en: "Wash & Care", fr: "Lavage et soin", items: ["غسيل بخار", "تلميع", "تظليل"] },
      { ar: "صيانة", en: "Maintenance", fr: "Maintenance", items: ["تغيير زيت", "فحص كمبيوتر", "كهرباء سيارات"] },
      { ar: "قطع غيار", en: "Parts", fr: "Pièces", items: ["زيوت", "إطارات", "بطاريات"] },
    ],
    serviceModes: ["appointment", "walk_in", "pickup"],
    customFields: ["نوع المركبة", "رقم اللوحة", "المسار", "الفني", "المدة", "صور قبل وبعد"],
  },
  {
    slug: "public_works",
    labelAr: "الأشغال العامة والصيانة المنزلية والخدمات الميدانية",
    labelEn: "Field Services & Home Maintenance",
    labelFr: "Services terrain et maintenance",
    descriptionAr: "عقود، عروض، أوامر عمل، فنيون، مناطق، صور قبل وبعد.",
    icon: "wrench",
    color: "#eab308",
    categories: [
      { ar: "سباكة وكهرباء", en: "Plumbing & Electrical", fr: "Plomberie et électricité", items: ["إصلاح تسريب", "تمديد كهرباء", "تركيب"] },
      { ar: "تكييف ودهانات", en: "AC & Painting", fr: "Climatisation et peinture", items: ["صيانة تكييف", "دهان غرفة", "تنظيف مكيف"] },
      { ar: "مقاولات وعزل", en: "Contracting & Insulation", fr: "Construction et isolation", items: ["عزل أسطح", "ترميم", "أمر مقاولة"] },
    ],
    serviceModes: ["field_visit", "quote", "contract", "hourly", "per_item"],
    customFields: ["الموقع", "المنطقة", "الفني", "مدة العمل", "المواد", "صور قبل وبعد"],
  },
  {
    slug: "trend",
    labelAr: "سوق المبدعين والمصورين والمحتوى الرقمي",
    labelEn: "Creators, Photographers & Digital Content",
    labelFr: "Créateurs et contenu numérique",
    descriptionAr: "ملفات أعمال، صور، وصفات، أصول رقمية، تراخيص وعمولات.",
    icon: "sparkles",
    color: "#f59e0b",
    categories: [
      { ar: "تصوير طعام", en: "Food Photography", fr: "Photographie culinaire", items: ["صورة طبق", "جلسة تصوير", "بكج صور"] },
      { ar: "وصفات ومحتوى", en: "Recipes & Content", fr: "Recettes et contenu", items: ["وصفة", "فيديو قصير", "قالب منشور"] },
      { ar: "أصول رقمية", en: "Digital Assets", fr: "Ressources numériques", items: ["حزمة صور", "ملف تصميم", "ترخيص استخدام"] },
    ],
    serviceModes: ["digital_delivery", "license", "commission"],
    customFields: ["نوع الترخيص", "مدة الاستخدام", "صيغة الملف", "نطاق الاستخدام", "العمولة"],
  },
  {
    slug: "other",
    labelAr: "متاجر وخدمات أخرى قابلة للتخصيص",
    labelEn: "Other Custom Stores & Services",
    labelFr: "Autres boutiques et services personnalisés",
    descriptionAr: "قالب مرن للأنشطة غير المدرجة مع حقول وفئات وسير عمل مخصص.",
    icon: "store",
    color: "#64748b",
    categories: [
      { ar: "منتجات", en: "Products", fr: "Produits", items: ["منتج مخصص", "باقة", "عرض"] },
      { ar: "خدمات", en: "Services", fr: "Services", items: ["خدمة", "موعد", "طلب عرض سعر"] },
    ],
    serviceModes: ["pickup", "delivery", "appointment", "quote", "custom"],
    customFields: ["حقل مخصص", "حالة مخصصة", "موعد", "موقع", "مرفق"],
  },
];

export function getSectorCatalog(slug: string) {
  return sectorCatalog.find((sector) => sector.slug === slug) ?? sectorCatalog.find((sector) => sector.slug === "other")!;
}
