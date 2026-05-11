import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { CredentialsSection } from "@/components/credentials/CredentialsSection";
import { WorkSection } from "@/components/work/WorkSection";
import { HackathonsSection } from "@/components/hackathons/HackathonsSection";
import { StackSection } from "@/components/stack/StackSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <CredentialsSection />
      <WorkSection />
      <HackathonsSection />
      <StackSection />
      <ContactSection />
    </main>
  );
}
