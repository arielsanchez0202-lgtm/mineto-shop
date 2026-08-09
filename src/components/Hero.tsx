export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-[#0a2540] to-[#1a3a5c] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl max-w-2xl">
            Tus compras más seguras desde tu celular
          </h2>
          <p className="text-lg text-white/80 md:text-xl max-w-xl">
            Descubre la mejor tecnología con envíos seguros y pagos protegidos
          </p>
          <button className="mt-4 rounded-full bg-[#ff5500] px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-[#e64d00]">
            Ver Catálogo
          </button>
        </div>
      </div>
    </div>
  );
}