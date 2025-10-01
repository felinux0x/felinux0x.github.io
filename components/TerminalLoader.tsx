'use client';

import { useState, useEffect, useRef } from 'react'; // Added useRef

const bootMessages = [
  "BIOS: Initializing...",
  "BIOS: Memory test passed.",
  "BIOS: Booting from Hard Disk...",
  "GRUB loading...",
  "Welcome to FelinuxOS 6.0.1 (Kernel 6.0.1-1-ARCH)",
  "System time: Wed Oct 1 10:00:00 UTC 2025",
  "Detecting hardware...",
  "  [OK] CPU: Intel(R) Core(TM) i7-12700K CPU @ 3.60GHz",
  "  [OK] RAM: 32GB DDR4 @ 3200MHz",
  "  [OK] GPU: NVIDIA GeForce RTX 3080",
  "  [OK] Storage: NVMe SSD (512GB)",
  "Initializing random number generator...",
  "Mounting /dev/sda1 on /...",
  "  [OK] Mounted root filesystem.",
  "Starting udev daemon...",
  "  [OK] udevd started.",
  "Loading kernel modules...",
  "  [OK] Module 'ext4' loaded.",
  "  [OK] Module 'nvidia_drm' loaded.",
  "  [OK] Module 'snd_hda_intel' loaded.",
  "Configuring network interfaces...",
  "  [OK] eth0: Link UP 1000 Mbps Full Duplex",
  "  [OK] Assigned IP: 192.168.1.100",
  "Starting system services...",
  "  [OK] systemd-journald.service",
  "  [OK] systemd-logind.service",
  "  [OK] NetworkManager.service",
  "  [OK] sshd.service",
  "  [OK] cron.service",
  "  [OK] apache2.service",
  "  [OK] mysql.service",
  "  [OK] Display Manager (GDM) started.",
  "FelinuxOS login: felinux0x (automatic login)",
  "Last login: Wed Oct 1 09:58:30 from 192.168.1.1",
  "Welcome to FelinuxOS!",
  "Type 'help' for a list of commands, or 'startx' to launch the graphical interface.",
  "Loading graphical environment...",
  "Starting web application...",
  "Accessing secure data streams...",
  "Establishing encrypted connection to server...",
  "Authentication successful.",
  "Redirecting to main interface..."
];

const TerminalLoader = ({ children }: { children: React.ReactNode }) => {
  const [isBooting, setIsBooting] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null); // Added useRef

  useEffect(() => {
    // Check if the user has already booted in this session
    if (sessionStorage.getItem('hasBooted')) {
      setIsBooting(false);
      return;
    }

    let messageIndex = 0;
    const timers: NodeJS.Timeout[] = [];

    const startTyping = () => {
      if (messageIndex < bootMessages.length) {
        timers.push(setTimeout(() => {
          setLines((prev) => {
            const newLines = [...prev, bootMessages[messageIndex]];
            // Auto-scroll logic
            if (terminalRef.current) {
              terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
            return newLines;
          });
          messageIndex++;
          startTyping(); // Call itself recursively
        }, 150)); // Adjust typing speed here
      } else {
        // All messages displayed, wait a bit then hide loader
        timers.push(setTimeout(() => {
          setIsBooting(false);
          sessionStorage.setItem('hasBooted', 'true'); // Mark as booted for this session
        }, 1000)); // Wait 1 second after last message
      }
    };

    // Start typing after a short delay
    timers.push(setTimeout(startTyping, 500));

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Cursor blinks every 500ms

    return () => {
      timers.forEach(clearTimeout); // Cleanup all timeouts
      clearInterval(cursorInterval); // Cleanup interval on unmount
    };
  }, []);

  if (!isBooting) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white font-mono p-4 overflow-hidden">
      <div ref={terminalRef} className="w-full max-w-4xl h-full max-h-[80vh] overflow-y-auto custom-scrollbar">
        {lines.map((line, index) => (
          <p key={index} className="whitespace-pre-wrap text-sm md:text-base">
            {line}
          </p>
        ))}
        {showCursor && (
          <span className="inline-block w-2 h-4 bg-white align-bottom animate-pulse"></span>
        )}
      </div>
    </div>
  );
};

export default TerminalLoader;
