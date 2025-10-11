import React from "react";
import PropTypes from "prop-types";

/**
 * Stats component
 * Props:
 * - items: [{ id, title, value, delta, deltaType: 'up'|'down', icon (optional JSX), color }]
 *
 * Example:
 * <Stats items={[
 *   { id: '1', title: 'Ventas', value: '12.4k', delta: '4.2%', deltaType: 'up', color: '#10b981' },
 *   { id: '2', title: 'Usuarios', value: '3.2k', delta: '1.1%', deltaType: 'down', color: '#ef4444' },
 * ]} />
 */

const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
    alignItems: "stretch",
    width: "100%",
    overflkowX: "auto",
};

const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "12px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
    minHeight: "88px",
    boxSizing: "border-box",
};

const topRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
};

const titleStyle = {
    fontSize: "13px",
    color: "#6b7280",
    margin: 0,
};

const valueStyle = {
    fontSize: "20px",
    fontWeight: 600,
    margin: "6px 0 0 0",
    color: "#111827",
};

const badgeStyle = (color) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: color ? `${hexToRgba(color, 0.12)}` : "#eef2ff",
    color: color || "#4f46e5",
    flexShrink: 0,
});

const deltaStyle = (isUp) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: isUp ? "#065f46" : "#7f1d1d",
    background: isUp ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)",
    padding: "4px 8px",
    borderRadius: "999px",
    fontWeight: 600,
});

/* Small helper to create subtle background from color */
function hexToRgba(hex, alpha = 1) {
    if (!hex) return `rgba(79,70,229,${alpha})`; // default indigo
    const cleaned = hex.replace("#", "");
    const bigint = parseInt(cleaned, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ArrowIcon({ up = true, size = 12 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d={up ? "M12 19V6M12 6l-5 5M12 6l5 5" : "M12 5v13M12 19l5-5M12 19l-5-5"}
                stroke={up ? "#065f46" : "#7f1d1d"}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Stats({ items = [], className = "" }) {
    const list = items.length
        ? items
        : [
            
                { id: "1", title: "Visitas", value: "8.4k", delta: "2.4%", deltaType: "up", color: "#0ea5a4" },
                { id: "2", title: "Nuevos", value: "1.2k", delta: "0.6%", deltaType: "up", color: "#06b6d4" },
                { id: "3", title: "Conversión", value: "3.8%", delta: "−0.4%", deltaType: "down", color: "#f97316" },
                { id: "4", title: "Ingresos", value: "$12.4k", delta: "5.8%", deltaType: "up", color: "#10b981" },
                { id: "3", title: "Conversión", value: "3.8%", delta: "−0.4%", deltaType: "down", color: "#f97316" },
                { id: "4", title: "Ingresos", value: "$12.4k", delta: "5.8%", deltaType: "up", color: "#10b981" },
            ];

    return (
        <div style={containerStyle} className={`${className} overflow-x-auto`}>
            {list.map((it) => {
                const isUp = it.deltaType !== "down";
                return (
                    <div key={it.id} style={cardStyle} role="group" aria-label={it.title}>
                        <div style={topRowStyle}>
                            <div>
                                <p style={titleStyle}>{it.title}</p>
                                <p style={valueStyle}>{it.value}</p>
                            </div>

                            <div style={badgeStyle(it.color)}>
                                {it.icon ? (
                                    it.icon
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                                        <path
                                            d="M3 12h18M3 6h18M3 18h18"
                                            stroke={it.color || "#4f46e5"}
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>

                        <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-start", gap: 8 }}>
                            <span style={deltaStyle(isUp)}>
                                <ArrowIcon up={isUp} size={12} />
                                {it.delta}
                            </span>
                            {it.note ? (
                                <span style={{ fontSize: 12, color: "#6b7280", alignSelf: "center" }}>{it.note}</span>
                            ) : null}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

Stats.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            delta: PropTypes.string,
            deltaType: PropTypes.oneOf(["up", "down"]),
            icon: PropTypes.node,
            color: PropTypes.string,
            note: PropTypes.string,
        })
    ),
    className: PropTypes.string,
};