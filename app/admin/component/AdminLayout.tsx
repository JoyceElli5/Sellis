'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import HIcon from '@/components/ui/HIcon';
import { Home03Icon, Calendar01Icon, ServiceIcon, Megaphone01Icon, Settings01Icon, GlobeIcon } from '@hugeicons/core-free-icons';

/* ── Nav items ─────────────────────────────────────────────── */
const navItems = [
  { href: '/admin',              icon: Home03Icon,        label: 'Dashboard' },
  { href: '/admin/bookings',     icon: Calendar01Icon,    label: 'Bookings' },
  { href: '/admin/services',     icon: ServiceIcon,       label: 'Services' },
  { href: '/admin/announcement', icon: Megaphone01Icon,   label: 'Announcements' },
  { href: '/admin/settings',     icon: Settings01Icon,    label: 'Settings' },
];

/* ── Types ─────────────────────────────────────────────────── */
interface AdminLayoutProps {
  children: React.ReactNode;
}

/* ── Component ─────────────────────────────────────────────── */
export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname          = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={styles.shell}>

      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside style={{ ...styles.sidebar, width: collapsed ? 72 : 240 }}>

        {/* Logo */}
        <div style={styles.logoRow}>
          <Image
            src="/logo.png"
            alt="Sellis Beauty Spa"
            width={36}
            height={36}
            style={{ borderRadius: 6, flexShrink: 0 }}
          />
          {!collapsed && (
            <div style={styles.logoText}>
              <span style={styles.logoName}>SELLIS</span>
              <span style={styles.logoSub}>Admin Panel</span>
            </div>
          )}
        </div>

        {/* Nav links */}
        <nav style={styles.nav}>
          {navItems.map((item) => {
            const active = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                style={{
                  ...styles.navLink,
                  ...(active ? styles.navLinkActive : {}),
                  justifyContent: collapsed ? 'center' : 'flex-start',
                }}
              >
                <span style={styles.navIcon}>
                  <HIcon icon={item.icon} size={18} strokeWidth={1.8} />
                </span>
                {!collapsed && <span style={styles.navLabel}>{item.label}</span>}
                {active && <span style={styles.activeDot} />}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((v) => !v)}
          style={styles.collapseBtn}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>

        {/* Back to site */}
        <Link
          href="/"
          style={{
            ...styles.backLink,
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
          title={collapsed ? 'Back to site' : undefined}
        >
          <span>
            <HIcon icon={GlobeIcon} size={18} strokeWidth={1.8} />
          </span>
          {!collapsed && <span>View Site</span>}
        </Link>
      </aside>

      {/* ── Main area ─────────────────────────────────────── */}
      <div style={{ ...styles.main, marginLeft: collapsed ? 72 : 240 }}>

        {/* Header */}
        <header style={styles.header}>
          {/* Mobile hamburger */}
          <button
            style={styles.hamburger}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          {/* Page title derived from pathname */}
          <div>
            <h1 style={styles.pageTitle}>
              {navItems.find(
                (n) => n.href === pathname ||
                  (n.href !== '/admin' && pathname.startsWith(n.href))
              )?.label ?? 'Dashboard'}
            </h1>
            <p style={styles.pageSub}>Sellis Beauty Spa — Admin</p>
          </div>

          {/* Right side */}
          <div style={styles.headerRight}>
            <div style={styles.headerDate}>
              {new Date().toLocaleDateString('en-GB', {
                weekday: 'short', day: 'numeric', month: 'long',
              })}
            </div>
            <div style={styles.avatar} title="Admin">A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>

      {/* ── Mobile overlay ─────────────────────────────────── */}
      {mobileOpen && (
        <div
          style={styles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
        >
          <aside style={styles.mobileSidebar} onClick={(e) => e.stopPropagation()}>
            <div style={styles.logoRow}>
              <Image src="/logo.png" alt="Sellis" width={36} height={36} style={{ borderRadius: 6 }} />
              <div style={styles.logoText}>
                <span style={styles.logoName}>SELLIS</span>
                <span style={styles.logoSub}>Admin Panel</span>
              </div>
            </div>
            <nav style={styles.nav}>
              {navItems.map((item) => {
                const active = pathname === item.href ||
                  (item.href !== '/admin' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{ ...styles.navLink, ...(active ? styles.navLinkActive : {}) }}
                  >
                    <span style={styles.navIcon}>
                      <HIcon icon={item.icon} size={18} strokeWidth={1.8} />
                    </span>
                    <span style={styles.navLabel}>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <Link href="/" style={styles.backLink} onClick={() => setMobileOpen(false)}>
              <span><HIcon icon={GlobeIcon} size={18} strokeWidth={1.8} /></span><span>View Site</span>
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

/* ── Inline styles (uses project CSS tokens via var()) ──────── */
const styles: Record<string, React.CSSProperties> = {
  shell: {
    display: 'flex',
    minHeight: '100vh',
    background: 'var(--cream, #FAF5EF)',
    fontFamily: 'var(--font-raleway, sans-serif)',
  },

  /* Sidebar */
  sidebar: {
    position: 'fixed',
    top: 0, left: 0, bottom: 0,
    background: 'var(--brown-dark, #2C1810)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
    zIndex: 200,
    overflowX: 'hidden',
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '24px 16px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  logoText: { display: 'flex', flexDirection: 'column', lineHeight: 1.15, overflow: 'hidden' },
  logoName: {
    fontSize: '0.95rem', fontWeight: 700, letterSpacing: 2,
    color: '#fff', fontFamily: 'var(--font-playfair, serif)', whiteSpace: 'nowrap',
  },
  logoSub: {
    fontSize: '0.55rem', fontWeight: 700, letterSpacing: 2.5,
    textTransform: 'uppercase', color: 'var(--gold-light, #EDD9B8)', whiteSpace: 'nowrap',
  },

  nav: { display: 'flex', flexDirection: 'column', gap: 4, padding: '16px 8px', flex: 1 },
  navLink: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '11px 12px',
    borderRadius: 10,
    color: 'rgba(255,255,255,0.58)',
    textDecoration: 'none',
    fontSize: '0.84rem', fontWeight: 600,
    transition: 'all 0.2s ease',
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  navLinkActive: {
    background: 'rgba(201,168,112,0.18)',
    color: 'var(--gold-light, #EDD9B8)',
  },
  navIcon:  { fontSize: '1.05rem', flexShrink: 0, width: 22, textAlign: 'center' },
  navLabel: { fontSize: '0.84rem', fontWeight: 600 },
  activeDot: {
    position: 'absolute', right: 10,
    width: 6, height: 6, borderRadius: '50%',
    background: 'var(--gold, #C9A870)',
  },

  collapseBtn: {
    margin: '0 8px 8px',
    padding: '9px 0',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 700,
    transition: 'all 0.2s',
  },
  backLink: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '12px 20px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.78rem', fontWeight: 600,
    textDecoration: 'none',
    transition: 'color 0.2s',
    whiteSpace: 'nowrap',
  },

  /* Main */
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    transition: 'margin-left 0.3s ease',
  },

  /* Header */
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '0 28px',
    height: 70,
    background: '#fff',
    borderBottom: '1px solid var(--cream-dark, #F0E4D4)',
    boxShadow: '0 2px 8px rgba(44,24,16,0.06)',
    position: 'sticky', top: 0, zIndex: 100,
  },
  hamburger: {
    display: 'none',    /* shown via media query — use a wrapper with CSS if needed */
    background: 'none', border: 'none', fontSize: '1.3rem',
    cursor: 'pointer', color: 'var(--brown-dark, #2C1810)',
  },
  pageTitle: {
    fontSize: '1.15rem', fontWeight: 700,
    fontFamily: 'var(--font-playfair, serif)',
    color: 'var(--brown-dark, #2C1810)',
    margin: 0, lineHeight: 1.2,
  },
  pageSub: {
    fontSize: '0.7rem', fontWeight: 600,
    letterSpacing: '1px', textTransform: 'uppercase',
    color: 'var(--text-light, #9E7B68)',
    margin: 0,
  },
  headerRight: {
    marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16,
  },
  headerDate: {
    fontSize: '0.78rem', color: 'var(--text-light, #9E7B68)',
    fontWeight: 600,
  },
  avatar: {
    width: 36, height: 36, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--gold-dark,#A8865A), var(--gold,#C9A870))',
    color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-playfair, serif)',
    fontWeight: 700, fontSize: '0.95rem',
    cursor: 'pointer',
    flexShrink: 0,
  },

  /* Mobile overlay */
  mobileOverlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 300,
    display: 'flex',
  },
  mobileSidebar: {
    width: 240, height: '100%',
    background: 'var(--brown-dark, #2C1810)',
    display: 'flex', flexDirection: 'column',
    overflowY: 'auto',
  },
};
