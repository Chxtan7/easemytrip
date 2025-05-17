
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#0066FF',
					foreground: '#FFFFFF',
					50: '#E5F0FF',
					100: '#B8D8FF',
					200: '#8ABFFF',
					300: '#5CA6FF',
					400: '#2E8DFF',
					500: '#0066FF',
					600: '#0052CC',
					700: '#003D99',
					800: '#002966',
					900: '#001433'
				},
				secondary: {
					DEFAULT: '#FF5722',
					foreground: '#FFFFFF',
					50: '#FFF0EC',
					100: '#FFD6C9',
					200: '#FFBBA6',
					300: '#FFA183',
					400: '#FF8660',
					500: '#FF5722',
					600: '#CC451B',
					700: '#993415',
					800: '#66230E',
					900: '#331107'
				},
				accent: {
					DEFAULT: '#FFD700',
					foreground: '#000000'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" }
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" }
				},
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				"slide-from-right": {
					"0%": {
						transform: "translateX(100%)"
					},
					"100%": {
						transform: "translateX(0)"
					}
				},
				"slide-from-left": {
					"0%": {
						transform: "translateX(-100%)"
					},
					"100%": {
						transform: "translateX(0)"
					}
				},
				"pulse-subtle": {
					"0%, 100%": {
						opacity: "1"
					},
					"50%": {
						opacity: "0.8"
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out forwards",
				"slide-from-right": "slide-from-right 0.3s ease-out",
				"slide-from-left": "slide-from-left 0.3s ease-out",
				"pulse-subtle": "pulse-subtle 2s ease-in-out infinite"
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
