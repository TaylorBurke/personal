import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import SocialLinks from "@/components/contact/SocialLinks";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Taylor Burke. Let's build something bold together.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="py-24">
        <Container>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-fog text-lg mb-16 max-w-2xl">
            Whether you have a project in mind, a question, or just want to say
            hello — I&apos;d love to hear from you.
          </p>

          <div className="grid gap-16 lg:grid-cols-2">
            <SocialLinks />
            <ContactForm />
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
