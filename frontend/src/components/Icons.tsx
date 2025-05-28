interface IconProps {
  className?: string;
}

export const HomeIcon = ({ className = "" }: IconProps) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L4 10v11h16V10L12 3z" />
    <path d="M9.5 14.5V21h5v-6.5h-5z" />
  </svg>
);

export const CameraIcon = ({ className = "" }: IconProps) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 16.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
    <path d="M4 8c0-1.1.9-2 2-2h2l1.6-2h4.8L16 6h2c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8z" />
  </svg>
);

export const StatsIcon = ({ className = "" }: IconProps) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4v14c0 1.1.9 2 2 2h14" />
    <path d="M7 14l3.5-7 4 4L19 4" />
  </svg>
);

export const SettingsIcon = ({ className = "" }: IconProps) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" />
  </svg>
);

export const ProteinIcon = ({ className = "" }: IconProps) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    <path d="M19 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z" />
    <path d="M5 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
    <path d="M12 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    <path d="M12 5v14" />
    <path d="M7 12h10" />
  </svg>
);

export const CarbsIcon = ({ className = "" }: IconProps) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M8 12h8" />
    <path d="M12 16V8" />
  </svg>
);

export const FatsIcon = ({ className = "" }: IconProps) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path d="M12 7v8" />
    <path d="M15 11l-3 3-3-3" />
  </svg>
); 