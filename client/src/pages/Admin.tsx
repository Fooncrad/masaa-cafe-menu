import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Coffee, Layers3, LogOut, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";

export default function Admin() {
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();
  const { data: session, isLoading } = trpc.admin.session.useQuery();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = trpc.admin.login.useMutation({ onSuccess: () => utils.admin.session.invalidate() });
  const logout = trpc.admin.logout.useMutation({ onSuccess: () => utils.admin.session.invalidate() });

  if (isLoading) return <main className="admin-page"><div className="admin-card">جاري التحميل…</div></main>;

  if (!session?.authenticated) {
    return <main className="admin-page" dir="rtl"><form className="admin-card admin-login" onSubmit={(event) => { event.preventDefault(); login.mutate({ email, password }); }}>
      <div className="admin-icon"><ShieldCheck size={30} /></div><p className="eyebrow accent">إدارة مساء</p><h1>دخول لوحة التحكم</h1><p>استخدم البريد وكلمة المرور المخصصة للإدارة.</p>
      <label>البريد الإلكتروني<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="username" /></label>
      <label>كلمة المرور<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>
      {login.error && <p className="admin-error">بيانات الدخول غير صحيحة</p>}
      <button className="primary-button" type="submit" disabled={login.isPending}>{login.isPending ? "جارٍ الدخول…" : "دخول"}</button>
      <button className="admin-back" type="button" onClick={() => navigate("/")}>العودة للمنيو <ArrowRight size={15} /></button>
    </form></main>;
  }

  return <main className="admin-page" dir="rtl"><section className="admin-dashboard">
    <header><div><p className="eyebrow accent">لوحة التحكم</p><h1>مرحبًا بك في إدارة مساء</h1><span>{session.email}</span></div><div className="admin-actions"><button onClick={() => navigate("/")}><ArrowRight size={16} /> المنيو</button><button onClick={() => logout.mutate()}><LogOut size={16} /> خروج</button></div></header>
    <div className="admin-stats"><article><Coffee /><strong>135</strong><span>صنفًا في المنيو</span></article><article><Layers3 /><strong>17</strong><span>قسمًا متاحًا</span></article></div>
    <div className="admin-panel"><h2>إدارة المحتوى</h2><p>تم تفعيل دخول الإدارة بنجاح. يمكن إضافة أدوات تعديل الأصناف والأسعار والصور والحجوزات في الخطوة التالية.</p></div>
  </section></main>;
}
