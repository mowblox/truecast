import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	colors: {
  		primary: '#1D57C2',
  		secondary: '#4C9FE4',
  		text: '#F5F5F5',
  		'subtle-text': '#939393',
  		dark: '#070707',
  		gray: '#0B0F12'
  	},
  	fontFamily: {
  		sans: ["var(--font-roboto-flex)"],
  		'space-grotesk': ["var(--font-space-grotesk)"],
  		'roboto-flex': ["var(--font-roboto-flex)"],
      "afacad": ["var(--font-afacad)"],
  	},
  	extend: {
      screens: {
        'xs': "320px",
        'sm': "640px",
        'md': "768px",
        'lg': "1280px",
        'xl': '1440px',
        '2xl': '1920px',
        '3xl': '3840px',
      },
  		keyframes: {
  			l24: {
  				'100%': {
  					transform: 'rotate(1turn)'
  				}
  			}
  		},
  		animation: {
  			l24: 'l24 1s linear infinite',
  			l24Slow: 'l24 2s linear infinite',
  			l24Slower: 'l24 4s linear infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  		}
  	}
  },
  plugins: [
    function addVariablesForColors({
      addBase,
      theme,
    }: {
      addBase: (base: any) => void;
      theme: (path: string) => any;
    }) {
      const colors = theme("colors");
      const cssVariables = Object.entries(colors).reduce(
        (vars, [name, value]) => {
          if (typeof value === "string") {
            vars[`--${name}`] = value;
          }
          return vars;
        },
        {} as Record<string, string>
      );

      addBase({ ":root": cssVariables });
    },
    require("tailwindcss-animate"),
  ],
};

export default config;
