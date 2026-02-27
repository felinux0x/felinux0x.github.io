import type {
	ExpressiveCodeConfig,
	GiscusConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "OffSec",
	subtitle: "Security Enthusiast",
	lang: "pt-BR", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "assets/images/banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [],
	giscus: {
		repo: "felinux0x/felps",
		repoId: "R_kgDN0A5X2g", // Need to be updated with real IDs
		category: "Announcements",
		categoryId: "DIC_kwDN0A5X2s4Cmsm1", // Need to be updated with real IDs
		mapping: "pathname",
		reactionsEnabled: "1",
		emitMetadata: "0",
		inputPosition: "top",
		theme: "preferred_color_scheme",
		lang: "pt",
		loading: "lazy",
	},
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "Projetos",
			url: "/projetos/",
		},
		{
			name: "CheatSheet",
			url: "/cheatsheet/",
		},
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/felinux0x", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/profile.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "Felps",
	bio: "Aspirante a Pentester| CTF Player | Bypassadores",
	links: [
		{
			name: "LinkedIn",
			icon: "fa6-brands:linkedin", // Visit https://icones.js.org/ for icon codes
			url: "https://www.linkedin.com/in/felipe0x01/",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/felinux0x",
		},
		{
			name: "HackTheBox",
			icon: "simple-icons:hackthebox",
			url: "https://app.hackthebox.com/users/2483868",
		},
		{
			name: "TryHackMe",
			icon: "simple-icons:tryhackme",
			url: "https://tryhackme.com/p/Fe1ps",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
