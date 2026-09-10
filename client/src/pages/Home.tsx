import { Fragment, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { menuSections, products as sourceProducts } from "@/data/menu";
import {
  ChevronLeft,
  ChevronDown,
  Globe2,
  Instagram,
  Menu,
  Moon,
  Plus,
  ShoppingBag,
  Sun,
  UserRound,
  X,
  MessageCircle,
  Play,
  Minus,
  ListFilter,
  CalendarDays,
  Clock3,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  english: string;
  category: string;
  categoryEnglish: string;
  price: number;
  oldPrice: number | null;
  discount: number;
  image: string;
  description: string;
  descriptionEnglish: string;
};

const products: Product[] = sourceProducts.map((product) => ({ ...product }));
const categories = ["الكل", ...menuSections.map((section) => section.nameAr)];
const categoryEnglish: Record<string, string> = { "الكل": "All", ...Object.fromEntries(menuSections.map((section) => [section.nameAr, section.nameEn])) };

export default function Home() {
  const [dark, setDark] = useState(true);
  const [language, setLanguage] = useState<"AR" | "EN">("AR");
  const [category, setCategory] = useState("الكل");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);

  const visibleProducts = useMemo(
    () => category === "الكل" ? products : products.filter((product) => product.category === category),
    [category],
  );
  const cartItems = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const cartTotal = cartItems.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0);

  const addToCart = (id: number) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  const removeFromCart = (id: number) => setCart((current) => {
    const next = { ...current };
    if ((next[id] || 0) <= 1) delete next[id]; else next[id] -= 1;
    return next;
  });

  return (
    <main className={`site-shell ${dark ? "theme-dark" : "theme-light"}`} dir={language === "AR" ? "rtl" : "ltr"}>
      <header className="topbar">
        <div className="nav-actions" dir="ltr">
          <button className="icon-button" aria-label="تسجيل الدخول" title="الحساب"><UserRound size={18} /><span className="desktop-label">{language === "AR" ? "حسابي" : "Account"}</span></button>
          <div className="nav-dropdown-wrap"><button className="icon-button" aria-expanded={sectionsOpen} aria-label="الأقسام" title="الأقسام" onClick={() => setSectionsOpen((value) => !value)}><ListFilter size={18} /><span className="desktop-label">{language === "AR" ? "الأقسام" : "Sections"}</span><ChevronDown size={14} /></button>{sectionsOpen && <div className="nav-dropdown sections-dropdown">{categories.map((item) => <button key={item} onClick={() => { setCategory(item); setSectionsOpen(false); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}><span>{language === "AR" ? item : categoryEnglish[item]}</span><b>{item === "الكل" ? products.length : products.filter((product) => product.category === item).length}</b></button>)}</div>}</div>
          <button className="icon-button" aria-label="تغيير الوضع" title="تغيير الوضع" onClick={() => setDark((value) => !value)}>{dark ? <Sun size={18} /> : <Moon size={18} />}<span className="desktop-label">{dark ? "نهاري" : "ليلي"}</span></button>
          <div className="nav-dropdown-wrap"><button className="language-button" aria-expanded={languageOpen} aria-label="اختيار اللغة" onClick={() => setLanguageOpen((value) => !value)}><Globe2 size={16} /><b>{language}</b><ChevronDown size={14} /></button>{languageOpen && <div className="nav-dropdown language-dropdown"><button onClick={() => { setLanguage("AR"); setLanguageOpen(false); }}>العربية <span>AR</span></button><button onClick={() => { setLanguage("EN"); setLanguageOpen(false); }}>English <span>EN</span></button></div>}</div>
          <button className="icon-button cart-button" aria-label="السلة" title="السلة" onClick={() => setCartOpen(true)}><ShoppingBag size={19} /><span className="cart-badge">{cartCount}</span><span className="desktop-label">{language === "AR" ? "السلة" : "Cart"}</span></button>
          <button className="icon-button mobile-menu-button" aria-label="القائمة" onClick={() => setMenuOpen((value) => !value)}><Menu size={20} /></button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <div className="mobile-menu-section"><b>{language === "AR" ? "الأقسام" : "Sections"}</b>{categories.map((item) => <button key={item} onClick={() => { setCategory(item); setMenuOpen(false); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}><span>{language === "AR" ? item : categoryEnglish[item]}</span><small>{item === "الكل" ? products.length : products.filter((product) => product.category === item).length}</small></button>)}</div>
          <button className="booking-menu-button" onClick={() => { setMenuOpen(false); setBookingOpen(true); setBookingSent(false); }}><CalendarDays size={17} /> {language === "AR" ? "احجز طاولة" : "Book a table"}</button>
          <div className="working-hours"><Clock3 size={17} /><div><b>{language === "AR" ? "أوقات العمل" : "Working hours"}</b><span>{language === "AR" ? "الأحد–الأربعاء والسبت: 4 م – 2 ص" : "Sun–Wed & Sat: 4 pm–2 am"}</span><span>{language === "AR" ? "الخميس والجمعة: 4 م – 3 ص" : "Thu–Fri: 4 pm–3 am"}</span></div></div>
          <div className="mobile-menu-links"><a href="tel:+966506840235">+966 50 684 0235</a><a href="https://maps.app.goo.gl/2jRS9hd5ehJSjvmLA" target="_blank" rel="noreferrer">{language === "AR" ? "الموقع على الخريطة" : "Location on map"}</a></div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-overlay" />
        <div className="social-stack" aria-label="روابط التواصل" dir="ltr">
          <a href="https://www.instagram.com/almasaa_cafe" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="https://wa.me/966506840235" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
          <a href="https://www.tiktok.com/@almasaa_cafe" target="_blank" rel="noreferrer" aria-label="TikTok" className="text-social">♪</a>
          <a href="https://x.com/almasaa_cafe" target="_blank" rel="noreferrer" aria-label="X" className="text-social">𝕏</a>
          <div className="side-logo" aria-label="مساء cafe"><strong>مساء</strong><span>cafe</span></div>
          <a href="#menu" className="qr-menu" aria-label="فتح قائمة الطعام" title="امسح الرمز أو اضغط لفتح المنيو"><QRCodeSVG value="https://masaamenus-epdxkvyr.manus.space/#menu" size={42} bgColor="transparent" fgColor="#ffffff" level="H" includeMargin={false} /><small>QR MENU</small></a>
        </div>
        <div className="hero-content">
          <p className="eyebrow">{language === "AR" ? "تجربة قهوة استثنائية" : "An exceptional coffee experience"}</p>
          <h1>{language === "AR" ? "أكبر مقهى في العالم" : "The world's biggest cafe"}</h1>
          <p className="hero-subtitle">{language === "AR" ? "نكهات تُصنع بحب، ولحظات تستحق أن تُعاش" : "Crafted with love, made for your moments"}</p>
          <a className="hero-cta" href="https://www.youtube.com/watch?v=MiQ_sCEkZ68" target="_blank" rel="noreferrer"><Play size={14} fill="currentColor" /> {language === "AR" ? "شاهد الفيديو" : "Watch video"}</a>
        </div>
        <div className="hero-mark"><span>م</span><small>مساء</small><small>cafe</small></div>
        <div className="hero-scroll"><span /> اسحب لاكتشاف المنيو</div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div><p className="eyebrow accent">{language === "AR" ? "اختياراتنا" : "Our selection"}</p><h2>{language === "AR" ? "منيو مساء" : "Masaa menu"}</h2></div>
          <p className="section-note">{language === "AR" ? "كل ما تحبه، في مكان واحد" : "Everything you love, in one place"}</p>
        </div>
        <div className="category-bar" role="tablist">
          {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} role="tab" aria-selected={category === item}>{language === "AR" ? item : categoryEnglish[item]}</button>)}
        </div>
        <div className="product-grid">
          {visibleProducts.map((product, index) => (
            <Fragment key={product.id}>
            {(index === 0 || visibleProducts[index - 1]?.category !== product.category) && <div className="category-separator"><span>{language === "AR" ? product.category : product.categoryEnglish}</span><small>{products.filter((item) => item.category === product.category).length}</small></div>}
            <article className="product-card" onClick={() => setSelected(product)} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && setSelected(product)}>
              <div className="product-image-wrap"><img src={product.image} alt={language === "AR" ? product.name : product.english} loading="lazy" />{product.discount > 0 && <span className="discount">-{product.discount}%</span>}<span className="availability"><i /> {language === "AR" ? "متوفر" : "Available"}</span><button className="quick-add" aria-label={`${language === "AR" ? "إضافة" : "Add"} ${language === "AR" ? product.name : product.english}`} onClick={(event) => { event.stopPropagation(); addToCart(product.id); }}><Plus size={16} /></button></div>
              <div className="product-info"><span className="product-category">{language === "AR" ? product.category : product.categoryEnglish}</span><h3>{language === "AR" ? product.name : product.english}</h3><div className="price-row"><strong>{product.price} <small>{language === "AR" ? "ر.س" : "SAR"}</small></strong>{product.oldPrice && <del>{product.oldPrice} {language === "AR" ? "ر.س" : "SAR"}</del>}</div></div>
            </article>
            </Fragment>
          ))}
        </div>
      </section>

      <button className={`floating-cart ${cartCount > 0 ? "has-items" : ""}`} onClick={() => setCartOpen(true)} aria-label="فتح السلة"><ShoppingBag size={21} /><span>{cartCount}</span></button>

      {bookingOpen && <div className="modal-backdrop" onClick={() => setBookingOpen(false)}><div className="booking-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setBookingOpen(false)} aria-label="إغلاق"><X size={20} /></button>{bookingSent ? <div className="booking-success"><CalendarDays size={38} /><h2>تم استلام طلب الحجز</h2><p>سنتواصل معك لتأكيد الموعد في أقرب وقت.</p><button className="primary-button" onClick={() => setBookingOpen(false)}>تم</button></div> : <><p className="eyebrow accent">احجز طاولتك</p><h2>موعدك في مساء</h2><p className="booking-note">أدخل البيانات المطلوبة وسنتواصل معك لتأكيد الحجز.</p><form className="booking-form" onSubmit={(event) => { event.preventDefault(); setBookingSent(true); }}><label>الاسم الكامل<input required name="name" placeholder="اكتب اسمك" /></label><label>رقم الجوال<input required name="phone" type="tel" inputMode="tel" placeholder="05xxxxxxxx" /></label><div className="booking-fields"><label>التاريخ<input required name="date" type="date" /></label><label>الوقت<input required name="time" type="time" /></label></div><label>عدد الأشخاص<select required name="guests" defaultValue="2"><option value="1">شخص واحد</option><option value="2">شخصان</option><option value="3">3 أشخاص</option><option value="4">4 أشخاص</option><option value="5">5 أشخاص</option><option value="6">6 أشخاص أو أكثر</option></select></label><label>ملاحظات<textarea name="notes" rows={3} placeholder="مناسبة خاصة أو طلب إضافي" /></label><button className="primary-button booking-submit" type="submit">إرسال طلب الحجز</button></form></>}</div></div>}

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setSelected(null)} aria-label="إغلاق"><X size={20} /></button><img src={selected.image} alt={language === "AR" ? selected.name : selected.english} /><div className="modal-body"><span className="product-category">{language === "AR" ? selected.category : selected.categoryEnglish}</span><h2>{language === "AR" ? selected.name : selected.english}</h2><p>{language === "AR" ? selected.description : selected.descriptionEnglish}</p><div className="modal-bottom"><strong>{selected.price} <small>{language === "AR" ? "ر.س" : "SAR"}</small></strong><button className="primary-button" onClick={() => { addToCart(selected.id); setSelected(null); setCartOpen(true); }}>{language === "AR" ? "أضف للسلة" : "Add to cart"} <Plus size={17} /></button></div></div></div></div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow accent">{language === "AR" ? "سلة مشترياتك" : "Your cart"}</p><h2>{language === "AR" ? "طلباتك اللذيذة" : "Your selections"}</h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="إغلاق"><X size={20} /></button></div>{cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag size={34} /><p>{language === "AR" ? "السلة فارغة حاليًا" : "Your cart is empty"}</p><button className="primary-button" onClick={() => setCartOpen(false)}>{language === "AR" ? "استكشف المنيو" : "Explore menu"}</button></div> : <><div className="cart-list">{cartItems.map((product) => <div className="cart-item" key={product.id}><img src={product.image} alt={language === "AR" ? product.name : product.english} /><div><h3>{language === "AR" ? product.name : product.english}</h3><strong>{product.price} {language === "AR" ? "ر.س" : "SAR"}</strong><div className="quantity"><button onClick={() => removeFromCart(product.id)}><Minus size={13} /></button><span>{cart[product.id]}</span><button onClick={() => addToCart(product.id)}><Plus size={13} /></button></div></div></div>)}</div><div className="cart-total"><span>{language === "AR" ? "الإجمالي" : "Total"}</span><strong>{cartTotal} {language === "AR" ? "ر.س" : "SAR"}</strong></div><button className="primary-button checkout">{language === "AR" ? "إتمام الطلب" : "Checkout"} <ChevronLeft size={17} /></button></>}</aside></div>}
    </main>
  );
}
