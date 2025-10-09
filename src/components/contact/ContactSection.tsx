import Button from "../ui/Button";

export default function ContactSection() {
  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Start Your Journey</h3>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Ready to join our community of local entertainment businesses? Let's make it happen together.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button href="mailto:leasing@zdtsadventureplaza.com">
            Email Us
          </Button>
          <Button href="tel:+15555555555" variant="secondary">
            Call Today
          </Button>
        </div>
      </div>
    </section>
  );
}
