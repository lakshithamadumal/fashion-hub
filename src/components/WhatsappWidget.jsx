import React from 'react';

export default function WhatsappWidget({ phoneNumber = "+94771234567", message = "Hi! I am interested in your fashion collections." }) {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[\s+]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25d366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_25px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300 group cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      {/* Outer pulsing ring */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25d366] opacity-75 animate-ping -z-10 group-hover:animate-none"></span>

      {/* WhatsApp SVG Icon */}
      <svg
        className="w-8 h-8 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.233-1.371a9.936 9.936 0 0 0 4.779 1.21h.005c5.505 0 9.99-4.478 9.99-9.985C22.007 6.478 17.518 2 12.012 2zm6.135 14.258c-.273.771-1.398 1.405-1.928 1.453-.478.043-.984.058-1.57-.123-.377-.116-.867-.282-1.479-.548-2.613-1.139-4.302-3.8-4.432-3.974-.131-.174-1.062-1.412-1.062-2.694 0-1.282.668-1.916.907-2.18.239-.263.523-.329.697-.329.174 0 .348.002.501.009.158.007.37-.06.579.462.215.539.734 1.785.798 1.916.064.13.107.282.02.457-.087.174-.131.283-.261.435-.131.152-.275.339-.392.456-.131.13-.268.272-.116.533.152.261.678 1.119 1.453 1.81.999.89 1.838 1.167 2.099 1.298.261.13.413.109.565-.065.152-.174.652-.761.826-1.022.174-.261.348-.217.587-.13.239.087 1.522.718 1.783.848.261.13.435.196.499.304.065.109.065.631-.208 1.402z" />
      </svg>
      
      {/* Tooltip */}
      <span className="absolute right-16 scale-0 group-hover:scale-100 bg-theme-card text-theme-text text-xs font-medium px-3.5 py-2 rounded-xl shadow-lg border border-theme-border transition-all duration-300 origin-right whitespace-nowrap">
        Need Help? Chat with us!
      </span>
    </a>
  );
}
