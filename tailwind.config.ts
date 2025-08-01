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
				// Game Show Theme Colors
				'team-red': 'hsl(var(--team-red))',
				'team-blue': 'hsl(var(--team-blue))',
				'team-green': 'hsl(var(--team-green))',
				'team-orange': 'hsl(var(--team-orange))',
				'correct': 'hsl(var(--correct))',
				'incorrect': 'hsl(var(--incorrect))',
				'gold': 'hsl(var(--gold))',
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
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						transform: 'scale(1)', 
						opacity: '1',
						boxShadow: '0 0 20px hsl(var(--primary) / 0.5)'
					},
					'50%': { 
						transform: 'scale(1.05)', 
						opacity: '0.8',
						boxShadow: '0 0 40px hsl(var(--primary) / 0.8)'
					}
				},
				'score-bounce': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.3) rotate(5deg)' },
					'100%': { transform: 'scale(1)' }
				},
				'reveal': {
					'0%': { 
						opacity: '0', 
						transform: 'scale(0.8) rotateY(90deg)',
						filter: 'blur(10px)'
					},
					'100%': { 
						opacity: '1', 
						transform: 'scale(1) rotateY(0deg)',
						filter: 'blur(0px)'
					}
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(50px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'celebration': {
					'0%, 100%': { transform: 'scale(1) rotate(0deg)' },
					'25%': { transform: 'scale(1.1) rotate(2deg)' },
					'75%': { transform: 'scale(1.1) rotate(-2deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'score-bounce': 'score-bounce 0.6s ease-in-out',
				'reveal': 'reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-up': 'slide-up 0.5s ease-out',
				'celebration': 'celebration 0.8s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
