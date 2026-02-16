"use client";

import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl sm:text-9xl font-heading font-bold bg-gradient-to-r from-violet to-coral bg-clip-text text-transparent mb-6">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
            Page not found
          </h2>
          <p className="text-fog text-lg mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Button href="/" variant="primary" size="lg">
            Back to Home
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
