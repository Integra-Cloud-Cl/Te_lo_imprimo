"use client";

import * as React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      position: "relative",
      padding: "var(--space-24) var(--space-8) var(--space-12)", 
      borderTop: "1.5px solid var(--color-border-subtle)",
      background: "var(--color-bg-base)",
      marginTop: "auto",
      overflow: "hidden"
    }}>
      {/* Decorative Large Background Logo */}
      <div style={{
        position: "absolute",
        bottom: "-10%",
        right: "-5%",
        fontSize: "clamp(150px, 25vw, 400px)",
        fontWeight: "var(--weight-black)",
        color: "var(--color-text-primary)",
        opacity: 0.03,
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        letterSpacing: "-0.05em",
        zIndex: 0
      }}>
        Te lo imprimo
      </div>

      <div style={{ 
        position: "relative",
        zIndex: 1,
        maxWidth: "var(--container-xl)", 
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "var(--space-16)",
        marginBottom: "var(--space-24)"
      }}>
        {/* Branding */}
        <div style={{ gridColumn: "span 2" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
            <svg width="32" height="32" viewBox="0 0 186.24211 216.25645" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m 51.919141,240.74824 c -0.665111,-0.10519 -1.46749,-0.26147 -1.783069,-0.34731 -0.796126,-0.21655 -2.107664,-1.51827 -2.765484,-2.7448 -0.696774,-1.29916 -0.750149,-2.5747 -1.056268,-25.24284 -0.166634,-12.33911 -0.300474,-16.88404 -0.511041,-17.35382 -0.335747,-0.74903 -4.215978,-3.03507 -11.585622,-6.82565 -9.89437,-5.08918 -10.312696,-5.3597 -11.198774,-7.24191 -0.816341,-1.73408 -0.979571,-4.51726 -1.002328,-17.09031 -0.0212,-11.71075 -0.01012,-12.02332 0.465836,-13.13825 0.948435,-2.22173 1.477477,-2.57226 15.163012,-10.04657 7.105243,-3.88051 13.054556,-7.09183 13.220693,-7.13627 0.175059,-0.0468 0.30207,-0.43758 0.30207,-0.92932 0,-0.73272 -0.16522,-0.98204 -1.21075,-1.82709 -1.671858,-1.35128 -2.372714,-2.21085 -2.943817,-3.61046 -0.445575,-1.09198 -0.508299,-1.88635 -0.700548,-8.87216 -0.261704,-9.50956 0.104713,-41.311223 0.497171,-43.150053 0.210987,-0.98854 0.532849,-1.5293 1.596035,-2.68147 1.166502,-1.26412 1.94274,-1.76628 6.255632,-4.04683 2.708129,-1.432 9.645809,-5.10373 15.417049,-8.15942 10.92705,-5.78552 13.1703,-6.8756 14.81383,-7.1986 2.1689,-0.42625 3.323888,0.0869 19.317812,8.58253 6.02492,3.20031 11.76818,6.22132 12.7628,6.71335 2.73904,1.35497 5.77607,3.30957 6.96218,4.48079 l 1.06206,1.04871 0.21507,2.37424 c 0.25774,2.84525 0.58769,49.211973 0.35956,50.528033 -0.19718,1.13753 -1.6618,2.95172 -3.67799,4.55582 -3.90788,3.10918 -2.64002,4.07673 9.87531,7.5362 5.88434,1.62655 6.7201,1.66658 9.14296,0.4379 0.83842,-0.42519 3.84618,-2.28856 6.68389,-4.14084 2.83772,-1.85229 6.45672,-4.1874 8.04223,-5.18916 3.93427,-2.48574 4.78821,-3.17689 5.05796,-4.09368 0.12541,-0.42623 0.38602,-3.02424 0.57912,-5.77336 0.26818,-3.81779 0.43251,-5.06294 0.69574,-5.27171 0.43609,-0.34583 6.53414,-0.60328 9.07216,-0.38301 1.30709,0.11344 1.98222,0.28341 2.12969,0.53617 0.40666,0.69692 0.35947,16.28927 -0.0529,17.48959 -0.62652,1.82356 -2.4371,3.18878 -13.1,9.87766 -3.23443,2.02898 -8.16391,5.15262 -10.9544,6.94141 -6.69292,4.29038 -7.64184,4.76583 -9.45237,4.73607 -0.78128,-0.0128 -3.78118,-0.48844 -6.66644,-1.05689 -2.88526,-0.56846 -5.57591,-0.99891 -5.97921,-0.95656 -0.71069,0.0746 -0.73895,0.1232 -0.91737,1.57652 -0.10125,0.82474 -0.15314,4.16152 -0.11531,7.41507 0.0675,5.80678 0.0787,5.92699 0.60774,6.53716 0.75163,0.86691 2.36395,1.74634 8.33988,4.54893 5.72842,2.68652 11.52578,5.74417 13.0602,6.88823 0.54656,0.40751 1.26505,1.1264 1.59664,1.59753 1.36043,1.93289 1.3149,0.8979 1.27029,28.87014 l -0.0408,25.61679 -0.59455,1.43639 c -0.6866,1.65875 -2.12533,3.21567 -3.43425,3.71636 -1.24508,0.47631 -33.83695,0.5131 -35.26533,0.0398 -1.36973,-0.45385 -3.09471,-2.21874 -3.36529,-3.44314 -0.12149,-0.54983 -0.31522,-7.84694 -0.4305,-16.21578 -0.13689,-9.93871 -0.29309,-15.30661 -0.45035,-15.47703 -0.26541,-0.28762 -2.17293,0.0267 -9.014464,1.4853 -5.17163,1.10261 -5.60383,1.2338 -6.12651,1.85969 -0.40763,0.48812 -0.44931,1.36604 -0.6794,14.30895 -0.27127,15.25911 -0.19173,14.55914 -1.83156,16.11942 -1.38729,1.31999 -2.508718,1.51289 -10.388608,1.78685 -8.19765,0.28503 -25.47316,0.28671 -27.269257,0.003 z" transform="translate(-22.010628,-24.703877)" fill="var(--color-accent)" />
            </svg>
            <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-1)" }}>
              <span style={{ 
                fontFamily: "var(--font-sans)", 
                fontSize: "var(--text-xl)", 
                fontWeight: "var(--weight-black)", 
                color: "var(--color-text-primary)" 
              }}>Te lo</span>
              <span style={{ 
                fontFamily: "var(--font-sans)", 
                fontSize: "var(--text-xl)", 
                fontWeight: "var(--weight-black)", 
                color: "var(--color-accent)" 
              }}>imprimo</span>
            </div>
          </Link>
          <p style={{ 
            color: "var(--color-text-secondary)", 
            lineHeight: "var(--leading-relaxed)",
            fontSize: "var(--text-md)",
            maxWidth: "35ch"
          }}>
            Repensando la forma en que se hacen las cosas. Diseño 3D con propósito y fabricación local.
          </p>
        </div>

        {/* Explorar */}
        <div>
          <h4 style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-widest)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-8)" }}>Explorar</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <li><Link href="/tienda" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Tienda</Link></li>
            <li><Link href="/#como-trabajamos" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Cómo trabajamos</Link></li>
            <li><Link href="/contacto" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Contacto</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-widest)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-8)" }}>Legal</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <li><Link href="/privacidad" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Privacidad</Link></li>
            <li><Link href="/cookies" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Cookies</Link></li>
            <li><Link href="/terminos" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Términos</Link></li>
            <li><Link href="/accesibilidad" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Accesibilidad</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-widest)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-8)" }}>Seguir</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <li><a href="https://linkedin.com/company/ir3d-cl" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>LinkedIn</a></li>
            <li><a href="https://instagram.com/ir3d.cl" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>Instagram</a></li>
            <li><a href="https://youtube.com/@ir3d.cl" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-secondary)", textDecoration: "none", fontSize: "var(--text-sm)" }}>YouTube</a></li>
          </ul>
        </div>
      </div>

      {/* Credits */}
      <div style={{ 
        position: "relative",
        zIndex: 1,
        maxWidth: "var(--container-xl)", 
        margin: "0 auto", 
        paddingTop: "var(--space-8)", 
        borderTop: "1px solid var(--color-border-subtle)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "var(--space-4)"
      }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "var(--space-2)",
          alignItems: "center",
          textAlign: "center",
          width: "100%"
        }}>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "var(--tracking-wide)" }}>
            © {currentYear} Te Lo Imprimo
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-disabled)", textTransform: "uppercase" }}>
            Desarrollado por <strong>Integra Cloud</strong>
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-disabled)", textTransform: "uppercase", letterSpacing: "var(--tracking-tight)", marginTop: "var(--space-2)" }}>
            Santiago, Chile
          </span>
        </div>
      </div>
    </footer>
  );
}

