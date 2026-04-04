import { NgoForm } from "@/components/forms/ngo-form";
import DarkVeil from "@/components/DarkVeil";

export default function CreateNgoPage() {
  return (
    <>
      <div className="fixed inset-0 w-full h-screen -z-10 opacity-50">
        <DarkVeil
          hueShift={180}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
      
      <main className="flex-grow pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 min-h-screen flex items-start justify-center">
        <div className="w-full animate-fade-in-up flex justify-center">
            <NgoForm />
        </div>
      </main>
    </>
  );
}
