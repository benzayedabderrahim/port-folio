import { useState, useEffect, useCallback, useRef } from "react";

const API_KEY = "e3afd566e7b761125e620727";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;
const CACHE_DURATION = 3600000;

const CURRENCIES = [
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت", flag: "🇹🇳" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "د.م.", flag: "🇲🇦" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
];

const getCurrencyByCode = (code) => CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];

// Animated number display
function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    if (value === display) return;
    const start = parseFloat(prevRef.current) || 0;
    const end = parseFloat(value) || 0;
    const duration = 600;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplay(current.toFixed(2));
      if (progress < 1) requestAnimationFrame(animate);
      else prevRef.current = value;
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{display}</>;
}

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("TND");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("1");
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [swapping, setSwapping] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  const fetchRates = useCallback(async (base) => {
    setLoading(true);
    setError(null);
    try {
      const cached = sessionStorage.getItem(`rates_${base}`);
      if (cached) {
        const { rates, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setExchangeRates(rates);
          setLastUpdated(new Date(timestamp));
          setLoading(false);
          return;
        }
      }
      const res = await fetch(`${BASE_URL}${base}`);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      if (data.result !== "success") throw new Error(data["error-type"] || "API error");
      setExchangeRates(data.conversion_rates);
      setLastUpdated(new Date());
      sessionStorage.setItem(`rates_${base}`, JSON.stringify({ rates: data.conversion_rates, timestamp: Date.now() }));
    } catch (e) {
      setError("Could not fetch rates. Showing cached data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRates(fromCurrency); }, [fromCurrency, fetchRates]);

  const convertedAmount = (() => {
    const n = parseFloat(amount);
    if (isNaN(n) || n < 0 || !exchangeRates[toCurrency]) return "";
    return (n * exchangeRates[toCurrency]).toFixed(2);
  })();

  const rate = exchangeRates[toCurrency];

  const handleSwap = () => {
    setSwapping(true);
    setSparkle(true);
    setTimeout(() => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setSwapping(false);
    }, 300);
    setTimeout(() => setSparkle(false), 800);
  };

  const fromC = getCurrencyByCode(fromCurrency);
  const toC = getCurrencyByCode(toCurrency);

  const styles = {
    root: {
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      position: "relative",
      overflow: "hidden",
    },
    bgOrb1: {
      position: "fixed", top: "-20%", left: "-10%",
      width: "600px", height: "600px", borderRadius: "50%",
      background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
      pointerEvents: "none",
    },
    bgOrb2: {
      position: "fixed", bottom: "-20%", right: "-10%",
      width: "500px", height: "500px", borderRadius: "50%",
      background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
      pointerEvents: "none",
    },
    bgOrb3: {
      position: "fixed", top: "40%", left: "50%", transform: "translateX(-50%)",
      width: "800px", height: "2px",
      background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.08), rgba(236,72,153,0.08), transparent)",
      pointerEvents: "none",
    },
    card: {
      width: "100%",
      maxWidth: "520px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "28px",
      padding: "40px",
      backdropFilter: "blur(20px)",
      boxShadow: "0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
      position: "relative",
      zIndex: 1,
    },
    header: {
      marginBottom: "36px",
      textAlign: "center",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "4px 12px",
      background: "rgba(99,102,241,0.15)",
      border: "1px solid rgba(99,102,241,0.3)",
      borderRadius: "100px",
      fontSize: "11px",
      fontWeight: "600",
      letterSpacing: "0.08em",
      color: "#a5b4fc",
      textTransform: "uppercase",
      marginBottom: "16px",
    },
    pulseDot: {
      width: "6px", height: "6px",
      borderRadius: "50%",
      background: "#6366f1",
      boxShadow: "0 0 8px rgba(99,102,241,0.8)",
      animation: "pulse 2s ease-in-out infinite",
    },
    title: {
      fontSize: "28px",
      fontWeight: "800",
      color: "#f8fafc",
      margin: "0 0 6px",
      letterSpacing: "-0.02em",
    },
    subtitle: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.35)",
      margin: 0,
    },
    panelFrom: {
      background: "rgba(99,102,241,0.07)",
      border: "1px solid rgba(99,102,241,0.2)",
      borderRadius: "20px",
      padding: "24px",
      marginBottom: "4px",
      transition: "all 0.3s ease",
    },
    panelTo: {
      background: "rgba(16,185,129,0.05)",
      border: "1px solid rgba(16,185,129,0.15)",
      borderRadius: "20px",
      padding: "24px",
      marginBottom: "24px",
      transition: "all 0.3s ease",
    },
    panelLabel: {
      fontSize: "10px",
      fontWeight: "700",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.3)",
      marginBottom: "14px",
    },
    selectRow: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "16px",
    },
    flagBox: {
      width: "44px", height: "44px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      flexShrink: 0,
    },
    selectWrap: { flex: 1, position: "relative" },
    select: {
      width: "100%",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      padding: "10px 14px",
      color: "#f1f5f9",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      outline: "none",
      appearance: "none",
      WebkitAppearance: "none",
    },
    amountInput: {
      width: "100%",
      background: "transparent",
      border: "none",
      outline: "none",
      fontSize: "40px",
      fontWeight: "800",
      color: "#f8fafc",
      letterSpacing: "-0.03em",
      padding: "0",
      boxSizing: "border-box",
    },
    convertedDisplay: {
      fontSize: "40px",
      fontWeight: "800",
      color: "#10b981",
      letterSpacing: "-0.03em",
      lineHeight: 1,
    },
    currencyCode: {
      fontSize: "14px",
      fontWeight: "700",
      color: "rgba(255,255,255,0.35)",
      marginTop: "4px",
    },
    swapArea: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 0",
      position: "relative",
      zIndex: 2,
    },
    swapBtn: {
      width: "42px", height: "42px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      border: "3px solid #0a0a0f",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s",
      boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
      outline: "none",
    },
    rateBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "16px",
      marginBottom: "16px",
    },
    rateText: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.5)",
    },
    rateValue: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#a5b4fc",
      background: "rgba(99,102,241,0.12)",
      padding: "4px 10px",
      borderRadius: "8px",
    },
    refreshBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      width: "100%",
      padding: "14px",
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
      border: "none",
      borderRadius: "14px",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "opacity 0.2s, transform 0.2s",
      letterSpacing: "0.02em",
      outline: "none",
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "11px",
      color: "rgba(255,255,255,0.2)",
    },
    errorBox: {
      padding: "12px 16px",
      background: "rgba(239,68,68,0.08)",
      border: "1px solid rgba(239,68,68,0.2)",
      borderRadius: "12px",
      fontSize: "12px",
      color: "#fca5a5",
      marginBottom: "16px",
      textAlign: "center",
    },
    loader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "12px",
      fontSize: "12px",
      color: "rgba(255,255,255,0.3)",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes sparkleIn { 0% { transform: scale(0) rotate(0deg); opacity: 1; } 100% { transform: scale(2) rotate(180deg); opacity: 0; } }
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .swap-btn-hover:hover { transform: scale(1.15) rotate(180deg) !important; box-shadow: 0 8px 30px rgba(99,102,241,0.6) !important; }
        .refresh-btn-hover:hover { opacity: 0.85; transform: translateY(-1px); }
        .from-panel:focus-within { border-color: rgba(99,102,241,0.5) !important; box-shadow: 0 0 0 4px rgba(99,102,241,0.08); }
        .panel-animate { animation: fadeSlideUp 0.4s ease both; }
        select option { background: #1e1e2e; color: #f1f5f9; }
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        .sparkle-ring { animation: sparkleIn 0.6s ease forwards; }
      `}</style>

      <div style={styles.root}>
        <div style={styles.bgOrb1} />
        <div style={styles.bgOrb2} />
        <div style={styles.bgOrb3} />

        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <div style={styles.badge}>
                <div style={styles.pulseDot} />
                Live Rates
              </div>
            </div>
            <h1 style={styles.title}>Currency Converter</h1>
            <p style={styles.subtitle}>Real-time exchange rates, always accurate</p>
          </div>

          {/* From Panel */}
          <div style={styles.panelFrom} className="from-panel panel-animate">
            <div style={styles.panelLabel}>You send</div>
            <div style={styles.selectRow}>
              <div style={styles.flagBox}>{fromC.flag}</div>
              <div style={styles.selectWrap}>
                <select
                  style={styles.select}
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <input
              type="number"
              style={styles.amountInput}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              min="0"
              step="0.01"
            />
            <div style={styles.currencyCode}>{fromC.symbol} {fromC.name}</div>
          </div>

          {/* Swap Button */}
          <div style={styles.swapArea}>
            <button
              style={{
                ...styles.swapBtn,
                transform: swapping ? "rotate(180deg) scale(0.9)" : "rotate(0deg) scale(1)",
              }}
              className="swap-btn-hover"
              onClick={handleSwap}
            >
              ⇅
            </button>
          </div>

          {/* To Panel */}
          <div style={styles.panelTo} className="panel-animate">
            <div style={styles.panelLabel}>You receive</div>
            <div style={styles.selectRow}>
              <div style={{ ...styles.flagBox, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                {toC.flag}
              </div>
              <div style={styles.selectWrap}>
                <select
                  style={{ ...styles.select, borderColor: "rgba(16,185,129,0.2)" }}
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div style={styles.loader}>
                <div style={{ width: "16px", height: "16px", border: "2px solid rgba(16,185,129,0.2)", borderTop: "2px solid #10b981", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Fetching rates…
              </div>
            ) : (
              <>
                <div style={styles.convertedDisplay}>
                  {convertedAmount ? <AnimatedNumber value={convertedAmount} /> : "—"}
                </div>
                <div style={{ ...styles.currencyCode, color: "rgba(16,185,129,0.6)" }}>
                  {toC.symbol} {toC.name}
                </div>
              </>
            )}
          </div>

          {/* Rate Info */}
          {rate && !loading && (
            <div style={styles.rateBox}>
              <span style={styles.rateText}>
                1 {fromCurrency} =
              </span>
              <span style={styles.rateValue}>
                {rate.toFixed(6)} {toCurrency}
              </span>
            </div>
          )}

          {/* Error */}
          {error && <div style={styles.errorBox}>⚠ {error}</div>}

          {/* Refresh Button */}
          <button
            style={styles.refreshBtn}
            className="refresh-btn-hover"
            onClick={() => fetchRates(fromCurrency)}
            disabled={loading}
          >
            {loading ? (
              <>
                <div style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Updating…
              </>
            ) : (
              <> ↻ Refresh Rates</>
            )}
          </button>

          {/* Footer */}
          <div style={styles.footer}>
            {lastUpdated
              ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
              : "Rates provided by ExchangeRate-API"}
          </div>
        </div>
      </div>
    </>
  );
}