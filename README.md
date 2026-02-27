# �‍☠️ Tactical Portfolio & Blog 

An immersive, terminal-themed portfolio and blog designed for Offensive Security professionals, Red Team operators, and cybersecurity enthusiasts. Built with **Astro**, **Tailwind CSS**, and **Vanilla JS**, prioritizing extreme performance and an authentic Linux-like user experience.

## ✨ Features

- **Global Interactive Terminal (`Ctrl + K`)**: A custom JavaScript terminal simulation allowing users to navigate pages (`cd /projects`), check system info (`neofetch`), and change themes (`/theme emerald`).
- **Linux Boot Sequence**: A one-time session boot animation simulating a kernel loading process and an offensive toolkit initialization.
- **SecOps CheatSheet**: A real-time filtered dashboard for payloads, reverse shells, and scripts with instant `Copy to Clipboard`.
- **Operator Profile**: A classified "About" page featuring animated skill bars, interactive HTB/THM platform badges, and a "Decrypt Resume" payload simulator.
- **Kernel Panic (404)**: A thematic 404 error page throwing a `CONNECTION_REFUSED` fatal exception with memory dump animations.
- **CTF & Easter Eggs**: Hidden flags, `sudo` incidents, and secret terminal commands for visitors to discover.
- **Cinematic Transitions**: Seamless, low-latency page transitions using Swup with custom glitch and blur effects.
- **Responsive Design**: Fully optimized for mobile, featuring a floating CMD button and dynamic viewport height handling to prevent UI jittering.

## 🚀 Getting Started

1. Clone your repository and install dependencies:
   ```sh
   git clone https://github.com/felinux0x/felinux0x.github.io.git
   cd felinux0x.github.io
   pnpm install
   ```
2. Run the local development server:
   ```sh
   pnpm dev
   ```
3. Open `http://localhost:4321` in your browser.

## ⚡ Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                              |
|:---------------------------|:----------------------------------------------------|
| `pnpm install`             | Installs dependencies                               |
| `pnpm dev`                 | Starts local dev server at `localhost:4321`         |
| `pnpm build`               | Build your production site to `./dist/`             |
| `pnpm preview`             | Preview your build locally, before deploying        |
| `pnpm check`               | Run checks for TypeScript and formatting errors     |
| `pnpm format`              | Format your code using Biome                        |
| `pnpm new-post <filename>` | Create a new blog post                              |

## 🛠️ Built With
- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Swup](https://swup.js.org/)

## 📄 License
This project is licensed under the MIT License. Based on the [Fuwari](https://github.com/saicaca/fuwari) template.
