import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				/* ── shadcn semantic aliases (mapped onto M3 in index.css) ── */
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},

				/* ── Material Design 3 named tokens ── */
				surface: 'hsl(var(--surface))',
				'surface-dim': 'hsl(var(--surface-dim))',
				'surface-bright': 'hsl(var(--surface-bright))',
				'surface-container-lowest': 'hsl(var(--surface-container-lowest))',
				'surface-container-low': 'hsl(var(--surface-container-low))',
				'surface-container': 'hsl(var(--surface-container))',
				'surface-container-high': 'hsl(var(--surface-container-high))',
				'surface-container-highest': 'hsl(var(--surface-container-highest))',
				'surface-variant': 'hsl(var(--surface-variant))',
				'on-surface': 'hsl(var(--on-surface))',
				'on-surface-variant': 'hsl(var(--on-surface-variant))',
				'inverse-surface': 'hsl(var(--inverse-surface))',
				'inverse-on-surface': 'hsl(var(--inverse-on-surface))',
				outline: 'hsl(var(--outline))',
				'outline-variant': 'hsl(var(--outline-variant))',
				'surface-tint': 'hsl(var(--surface-tint))',

				'on-primary': 'hsl(var(--on-primary))',
				'primary-container': 'hsl(var(--primary-container))',
				'on-primary-container': 'hsl(var(--on-primary-container))',
				'inverse-primary': 'hsl(var(--inverse-primary))',
				'primary-fixed': 'hsl(var(--primary-fixed))',
				'primary-fixed-dim': 'hsl(var(--primary-fixed-dim))',
				'on-primary-fixed': 'hsl(var(--on-primary-fixed))',
				'on-primary-fixed-variant': 'hsl(var(--on-primary-fixed-variant))',

				'on-secondary': 'hsl(var(--on-secondary))',
				'secondary-container': 'hsl(var(--secondary-container))',
				'on-secondary-container': 'hsl(var(--on-secondary-container))',
				'secondary-fixed': 'hsl(var(--secondary-fixed))',
				'secondary-fixed-dim': 'hsl(var(--secondary-fixed-dim))',
				'on-secondary-fixed': 'hsl(var(--on-secondary-fixed))',
				'on-secondary-fixed-variant': 'hsl(var(--on-secondary-fixed-variant))',

				tertiary: 'hsl(var(--tertiary))',
				'on-tertiary': 'hsl(var(--on-tertiary))',
				'tertiary-container': 'hsl(var(--tertiary-container))',
				'on-tertiary-container': 'hsl(var(--on-tertiary-container))',
				'tertiary-fixed': 'hsl(var(--tertiary-fixed))',
				'tertiary-fixed-dim': 'hsl(var(--tertiary-fixed-dim))',
				'on-tertiary-fixed': 'hsl(var(--on-tertiary-fixed))',
				'on-tertiary-fixed-variant': 'hsl(var(--on-tertiary-fixed-variant))',

				error: 'hsl(var(--error))',
				'on-error': 'hsl(var(--on-error))',
				'error-container': 'hsl(var(--error-container))',
				'on-error-container': 'hsl(var(--on-error-container))',

				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				diary: {
					paper: 'hsl(var(--diary-paper))',
					rule: 'hsl(var(--diary-rule))',
					'rule-margin': 'hsl(var(--diary-rule-margin))',
					ink: 'hsl(var(--diary-ink))',
					'ink-muted': 'hsl(var(--diary-ink-muted))',
					accent: 'hsl(var(--diary-accent))',
				},
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				serif: ['"Source Serif 4"', 'Georgia', 'serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
				diary: ['Patrick Hand', 'cursive'],
				/* M3 family aliases — Inter for structure, Source Serif 4 for narrative */
				'headline-lg': ['Inter', 'sans-serif'],
				'headline-md': ['Inter', 'sans-serif'],
				'headline-sm': ['Inter', 'sans-serif'],
				'headline-lg-mobile': ['Inter', 'sans-serif'],
				'label-md': ['Inter', 'sans-serif'],
				'body-lg': ['"Source Serif 4"', 'serif'],
				'body-md': ['"Source Serif 4"', 'serif'],
			},
			fontSize: {
				'headline-lg': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '700' }],
				'headline-md': ['28px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '600' }],
				'headline-sm': ['20px', { lineHeight: '28px', fontWeight: '600' }],
				'headline-lg-mobile': ['34px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '800' }],
				'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
				'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
				'label-md': ['14px', { lineHeight: '20px', letterSpacing: '0.05em', fontWeight: '500' }],
			},
			spacing: {
				unit: '8px',
				gutter: '24px',
				'margin-mobile': '24px',
				'margin-desktop': '64px',
			},
			maxWidth: {
				'max-width': '1200px',
				content: '1200px',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				card: 'var(--shadow-card)',
				'card-hover': 'var(--shadow-card-hover)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(16px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				/* Route/tab change — content fades and rises into place */
				'page-enter': {
					'0%': { opacity: '0', transform: 'translateY(12px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				/* Multi-bounce settling at the lifted rest (-6px) — for the active bottom tab */
				'tab-bounce': {
					'0%':   { transform: 'translateY(0)' },
					'28%':  { transform: 'translateY(-13px)' },
					'45%':  { transform: 'translateY(-2px)' },
					'62%':  { transform: 'translateY(-9px)' },
					'78%':  { transform: 'translateY(-4px)' },
					'90%':  { transform: 'translateY(-7px)' },
					'100%': { transform: 'translateY(-6px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'fade-in-up': 'fade-in-up 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
				'page-enter': 'page-enter 1s cubic-bezier(0.22, 1, 0.36, 1)',
				'tab-bounce': 'tab-bounce 0.7s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
