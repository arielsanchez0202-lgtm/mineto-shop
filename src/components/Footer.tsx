export default function Footer() {
  return (
    <footer className="bg-[#0a2540] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          {/* Copyright */}
          <div className="text-white/80">
            <p className="text-sm">
              © {new Date().getFullYear()} Mi Neto Shop. Todos los derechos reservados.
            </p>
          </div>

          {/* Contacto WhatsApp */}
          <div className="flex flex-wrap justify-center gap-6 md:justify-end">
            <a
              href="https://wa.me/51989090122"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}