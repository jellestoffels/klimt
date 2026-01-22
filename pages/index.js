import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-200px)]">
      <Head>
        <title>Studio Klimt</title>
      </Head>

      <div className="max-w-[720px] w-full">
        {/* Logo Block */}
        <div className="mb-s6 tablet:mb-s7 w-[clamp(180px,22vw,340px)]">
             <svg viewBox="0 0 100 24" className="w-full fill-ink"><text y="20" fontSize="20" fontWeight="bold">KLIMT</text></svg>
        </div>

        {/* Description */}
        {/* CRITICAL FIX: This p tag must close before the next div starts */}
        <p className="text-body tablet:text-bodyLarge max-w-[58ch] mb-s7">
          Studio Klimt is a design practice focused on digital products and brand systems. 
          We build coherent visual languages for forward-thinking companies.
        </p> 

        {/* Links Row */}
        <div className="flex flex-col tablet:flex-row gap-s3 tablet:gap-[20px] mt-s3">
          <Link href="/projects" className="text-nav font-medium hover:underline">View Projects</Link>
          <Link href="/contact" className="text-nav font-medium hover:underline">Contact</Link>
        </div>
      </div>
    </div>
  );
}