import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
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
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  english: string;
  category: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
  description: string;
};

const products: Product[] = [
  { id: 1, name: "لاتيه كلاسيك", english: "Classic Latte", category: "قهوة مختصة", price: 18, oldPrice: 24, discount: 20, image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=700&q=85", description: "إسبريسو ناعم مع حليب مبخر ورغوة مخملية." },
  { id: 2, name: "آيس لاتيه", english: "Iced Latte", category: "مشروبات باردة", price: 20, oldPrice: 26, discount: 15, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=85", description: "قهوة باردة منعشة مع الثلج والحليب الكريمي." },
  { id: 3, name: "كابتشينو", english: "Cappuccino", category: "قهوة مختصة", price: 17, oldPrice: 21, discount: 10, image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=700&q=85", description: "توازن مثالي بين الإسبريسو والحليب والرغوة الكثيفة." },
  { id: 4, name: "كيك الشوكولاتة", english: "Chocolate Cake", category: "حلويات", price: 22, oldPrice: 29, discount: 25, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85", description: "طبقات شوكولاتة غنية مع كريمة ناعمة ولمسة كاكاو." },
  { id: 5, name: "تشيز كيك التوت", english: "Berry Cheesecake", category: "حلويات", price: 24, oldPrice: 30, discount: 20, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=85", description: "تشيز كيك كريمي مع صوص التوت الطازج." },
  { id: 6, name: "فرابتشينو موكا", english: "Mocha Frappuccino", category: "مشروبات باردة", price: 19, oldPrice: 24, discount: 15, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=85", description: "مشروب بارد بنكهة الشوكولاتة والقهوة مع كريمة مخفوقة." },
  { id: 7, name: "كرواسون زبدة", english: "Butter Croissant", category: "مخبوزات", price: 14, oldPrice: 18, discount: 10, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=85", description: "كرواسون فرنسي طازج بطبقات هشة وزبدة غنية." },
  { id: 8, name: "ماتشا لاتيه", english: "Matcha Latte", category: "قهوة مختصة", price: 20, oldPrice: 25, discount: 15, image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=700&q=85", description: "ماتشا يابانية ناعمة مع حليب كريمي ولمسة حلوة." },
  { id: 9, name: "قهوة أمريكية", english: "Americano", category: "قهوة مختصة", price: 15, oldPrice: 18, discount: 10, image: "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=700&q=85", description: "إسبريسو كلاسيكي مخفف بالماء الساخن بنكهة متوازنة." },
  { id: 10, name: "تيراميسو", english: "Tiramisu", category: "حلويات", price: 21, oldPrice: 27, discount: 20, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=85", description: "حلوى إيطالية بطبقات الماسكربوني والقهوة والكاكاو." },
  { id: 11, name: "موكا بارد", english: "Iced Mocha", category: "مشروبات باردة", price: 21, oldPrice: 27, discount: 20, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=85", description: "موكا بارد غني مع الشوكولاتة والثلج والحليب." },
  { id: 12, name: "فطيرة السبانخ", english: "Spinach Tart", category: "مخبوزات", price: 16, oldPrice: 20, discount: 15, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=85", description: "فطيرة مخبوزة بحشوة السبانخ والجبن والأعشاب." },
];

const categories = ["الكل", "قهوة مختصة", "مشروبات باردة", "الحلويات", "المخبوزات"];

export default function Home() {
  const [dark, setDark] = useState(true);
  const [language, setLanguage] = useState<"AR" | "EN">("AR");
  const [category, setCategory] = useState("الكل");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <button className="icon-button" aria-label="تغيير الوضع" title="تغيير الوضع" onClick={() => setDark((value) => !value)}>{dark ? <Sun size={18} /> : <Moon size={18} />}<span className="desktop-label">{dark ? "نهاري" : "ليلي"}</span></button>
          <button className="language-button" aria-label="تغيير اللغة" onClick={() => setLanguage((value) => value === "AR" ? "EN" : "AR")}><Globe2 size={16} /><b>{language}</b><span>/</span><span>{language === "AR" ? "EN" : "AR"}</span></button>
          <button className="icon-button cart-button" aria-label="السلة" title="السلة" onClick={() => setCartOpen(true)}><ShoppingBag size={19} /><span className="cart-badge">{cartCount}</span><span className="desktop-label">{language === "AR" ? "السلة" : "Cart"}</span></button>
          <button className="icon-button mobile-menu-button" aria-label="القائمة" onClick={() => setMenuOpen((value) => !value)}><Menu size={20} /></button>
        </div>
        <a className="brand" href="#home" aria-label="مساء كافيه"><strong>مساء</strong><span>cafe</span></a>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <a href="#menu" onClick={() => setMenuOpen(false)}>قائمة الطعام</a><a href="#about" onClick={() => setMenuOpen(false)}>عن مساء</a><a href="#contact" onClick={() => setMenuOpen(false)}>تواصل معنا</a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-overlay" />
        <div className="social-stack" aria-label="روابط التواصل" dir="ltr">
          <a href="#contact" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="#contact" aria-label="WhatsApp"><MessageCircle size={18} /></a>
          <a href="#contact" aria-label="TikTok" className="text-social">♪</a>
          <a href="#contact" aria-label="X" className="text-social">𝕏</a>
        </div>
        <div className="hero-content">
          <p className="eyebrow">{language === "AR" ? "تجربة قهوة استثنائية" : "An exceptional coffee experience"}</p>
          <h1>{language === "AR" ? "أكبر مقهى في العالم" : "The world's biggest cafe"}</h1>
          <p className="hero-subtitle">{language === "AR" ? "نكهات تُصنع بحب، ولحظات تستحق أن تُعاش" : "Crafted with love, made for your moments"}</p>
          <button className="hero-cta" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}><Play size={14} fill="currentColor" /> {language === "AR" ? "شاهد الفيديو" : "Watch video"}</button>
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
          {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} role="tab" aria-selected={category === item}>{item}</button>)}
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id} onClick={() => setSelected(product)} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && setSelected(product)}>
              <div className="product-image-wrap"><img src={product.image} alt={product.name} loading="lazy" /><span className="discount">-{product.discount}%</span><span className="availability"><i /> متوفر</span><button className="quick-add" aria-label={`إضافة ${product.name}`} onClick={(event) => { event.stopPropagation(); addToCart(product.id); }}><Plus size={16} /></button></div>
              <div className="product-info"><span className="product-category">{product.category}</span><h3>{product.name}</h3><p className="product-english">{product.english}</p><div className="price-row"><strong>{product.price} <small>ر.س</small></strong><del>{product.oldPrice} ر.س</del></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="story-section" id="about"><div className="story-image" /><div className="story-copy"><p className="eyebrow accent">عن مساء</p><h2>مساحتك الهادئة<br />وسط إيقاع المدينة</h2><p>نختار حبوبنا بعناية، ونحمصها بشغف، ونقدمها لك في أجواء صُممت لتعود إليها كل يوم.</p><button className="outline-button">اكتشف قصتنا <ArrowLeft size={16} /></button></div></section>
      <footer id="contact"><div className="footer-brand"><strong>مساء</strong><span>cafe</span></div><p>قهوتك، مزاجك، مساحتك.</p><div className="footer-links"><a href="#menu">المنيو</a><a href="#about">عن مساء</a><a href="#contact">تواصل معنا</a></div><small>© 2026 مساء كافيه. جميع الحقوق محفوظة.</small></footer>

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setSelected(null)} aria-label="إغلاق"><X size={20} /></button><img src={selected.image} alt={selected.name} /><div className="modal-body"><span className="product-category">{selected.category}</span><h2>{selected.name}</h2><p>{selected.description}</p><div className="modal-bottom"><strong>{selected.price} <small>ر.س</small></strong><button className="primary-button" onClick={() => { addToCart(selected.id); setSelected(null); setCartOpen(true); }}>أضف للسلة <Plus size={17} /></button></div></div></div></div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow accent">سلة مشترياتك</p><h2>طلباتك اللذيذة</h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="إغلاق"><X size={20} /></button></div>{cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag size={34} /><p>السلة فارغة حاليًا</p><button className="primary-button" onClick={() => setCartOpen(false)}>استكشف المنيو</button></div> : <><div className="cart-list">{cartItems.map((product) => <div className="cart-item" key={product.id}><img src={product.image} alt={product.name} /><div><h3>{product.name}</h3><strong>{product.price} ر.س</strong><div className="quantity"><button onClick={() => removeFromCart(product.id)}><Minus size={13} /></button><span>{cart[product.id]}</span><button onClick={() => addToCart(product.id)}><Plus size={13} /></button></div></div></div>)}</div><div className="cart-total"><span>الإجمالي</span><strong>{cartTotal} ر.س</strong></div><button className="primary-button checkout">إتمام الطلب <ChevronLeft size={17} /></button></>}</aside></div>}
    </main>
  );
}

