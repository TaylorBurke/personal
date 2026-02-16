"use client";

import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CallToAction() {
  return (
    <section className="py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet/10 blur-[100px]" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-violet to-coral bg-clip-text text-transparent">
              bold
            </span>{" "}
            together.
          </h2>
          <p className="text-fog text-lg mb-10 max-w-xl mx-auto">
            Whether you have a project in mind or just want to say hello, I'd
            love to hear from you.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Get in Touch
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
