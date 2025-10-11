import React from 'react';
import PropTypes from 'prop-types';

/**
 * Simple, accessible footer component.
 * File: src/pages/components/Footer.js
 */
const styles = {
    footer: {
        borderTop: '1px solid rgba(0,0,0,0.08)',
        padding: '1rem 0.75rem',
        fontSize: '0.9rem',
        color: '#444',
        background: 'transparent',
    },
    container: {
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
        opacity: 0.9,
    },
    small: {
        color: '#666',
    },
};

export default function Footer({
    company = 'PHY-TECH',
    year = new Date().getFullYear(),
    links = [
        { href: '/about', label: 'About' },
        { href: '/privacy', label: 'Privacy' },
        { href: '/terms', label: 'Terms' },
    ],
}) {
    return (
        <footer style={styles.footer} role="contentinfo">
            <div style={styles.container}>
                <div style={styles.small}>
                    © {year} {company}
                </div>

                <nav aria-label="Footer">
                    <ul style={styles.navList}>
                        {links.map((l, i) => (
                            <li key={i}>
                                <a
                                    href={l.href}
                                    style={styles.link}
                                    target={l.external ? '_blank' : undefined}
                                    rel={l.external ? 'noopener noreferrer' : undefined}
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    company: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    links: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            external: PropTypes.bool,
        })
    ),
};