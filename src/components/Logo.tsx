import Image from "next/image";

interface LogoProps {
  className?: string;
  src?: string | null; // URL from Sanity
  color?: "black" | "white"; // Controls the CSS filter
}

export default function Logo({ className, src, color = "black" }: LogoProps) {
  // CSS Filter to turn a Black logo into White
  const invertClass = color === "white" ? "invert brightness-0" : "";

  if (!src) {
    // Fallback if no logo is uploaded yet (Text fallback)
    return <span className={`text-[20px] font-medium leading-none tracking-[-0.5px] uppercase ${className}`}>Klimt</span>;
  }

  return (
    <div className={`relative ${className} ${invertClass}`}>
      <Image 
        src={src} 
        alt="Studio Logo" 
        fill 
        className="object-contain object-left"
        priority
      />
    </div>
  );
}