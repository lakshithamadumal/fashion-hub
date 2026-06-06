import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ category, onSelectCategory }) {
  const { name, image, count, desc } = category;

  return (
    <div 
      onClick={() => onSelectCategory(name)}
      className="group relative h-96 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover zoom-effect"
        loading="lazy"
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Card Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        
        {/* Count Pill */}
        <span className="self-start px-3 py-1 text-[9px] font-bold tracking-wider bg-white/10 backdrop-blur-md rounded-full uppercase mb-2">
          {count} Collections
        </span>

        {/* Title */}
        <h3 className="font-serif text-2xl font-bold tracking-wide flex items-center gap-1.5">
          {name}
          <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </h3>

        {/* Short description */}
        <p className="text-xs text-neutral-300 font-light mt-1">
          {desc}
        </p>

        {/* Call to action */}
        <span className="text-[10px] font-bold tracking-widest text-primary uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Discover Now
        </span>
      </div>

    </div>
  );
}
