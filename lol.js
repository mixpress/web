// === CONFIGURACIÓN AUTOMÁTICA PARA EL PRÓXIMO SÁBADO ===
const TARGET_DATE = (() => {
  const ahora = new Date();
  const resultado = new Date(ahora);
  
  // El sábado es el día 6 de la semana (Domingo = 0, Lunes = 1, ..., Sábado = 6)
  const diasFaltantes = (6 - ahora.getDay() + 7) % 7;
  
  // Si ya es sábado pero quieres apuntar al próximo, o si quieres la medianoche de este sábado:
  if (diasFaltantes === 0 && ahora.getHours() >= 0) {
    // Si hoy ya es sábado, sumamos 7 días para el siguiente sábado
    resultado.setDate(ahora.getDate() + 7);
  } else {
    resultado.setDate(ahora.getDate() + diasFaltantes);
  }
  
  // Ajustamos la hora a la medianoche exacta (00:00:00) del sábado
  resultado.setHours(0, 0, 0, 0);
  return resultado;
})();

function MixpressLanding() {
  // Estado para guardar el tiempo que falta
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  // Función que calcula la diferencia en días, horas, minutos y segundos
  function calculateTimeLeft() {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft = { dias: "00", horas: "00", minutos: "00", segundos: "00" };

    if (difference > 0) {
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      // Formateamos con dos dígitos (ej: "03" en vez de "3")
      timeLeft = {
        dias: d < 10 ? `0${d}` : `${d}`,
        horas: h < 10 ? `0${h}` : `${h}`,
        minutos: m < 10 ? `0${m}` : `${m}`,
        segundos: s < 10 ? `0${s}` : `${s}`
      };
    }
    return timeLeft;
  }

  // Efecto para actualizar el contador en tiempo real cada segundo
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#2F5B3D] overflow-hidden">
      {/* Top Pattern */}
      <div className="w-full h-5 bg-[linear-gradient(90deg,#2F5B3D_0%,#2F5B3D_20%,#D4B24D_20%,#D4B24D_40%,#A96C43_40%,#A96C43_60%,#8AAA58_60%,#8AAA58_80%,#2F5B3D_80%,#2F5B3D_100%)] bg-[length:120px_100%]" />

      {/* HERO */}
      <section className="relative px-6 lg:px-20 py-10 lg:py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#2F5B3D] text-[#E9D67A] px-5 py-2 rounded-full shadow-md mb-7 tracking-[0.25em] text-xs font-bold uppercase">
              ● Próximamente
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-none uppercase">
              ¿Y si
              <span className="block text-[#A96C43] italic normal-case font-serif mt-2">
                esperar ya no fuera necesario?
              </span>
            </h1>

            <p className="mt-7 text-lg md:text-xl text-[#55735A] max-w-xl leading-relaxed">
              Algo nuevo está por llegar. Más práctico, más rápido y pensado
              para hacerte la vida mucho más sencilla.
            </p>

            {/* EMAIL INPUT */}
            <div className="mt-8 max-w-xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="TU CORREO ELECTRÓNICO AQUÍ"
                  className="flex-1 px-6 py-4 rounded-2xl border-2 border-[#D7C8AF] bg-white text-[#2F5B3D] placeholder:text-[#9B9B9B] outline-none focus:border-[#A96C43] shadow-md uppercase text-sm tracking-wide"
                />

                <button className="bg-[#2F5B3D] text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition whitespace-nowrap">
                  ¡Quiero enterarme ya!
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-10 bg-white/70 backdrop-blur rounded-3xl p-6 shadow-lg border border-[#D7C8AF] max-w-md">
              <div className="flex justify-between text-sm font-semibold text-[#A96C43] uppercase tracking-wide mb-3">
                <span>Preparando todo</span>
                <span>78%</span>
              </div>

              <div className="w-full h-4 bg-[#E8DFD0] rounded-full overflow-hidden">
                <div className="w-[78%] h-full bg-[#8AAA58] rounded-full" />
              </div>

              {/* CONTADOR EN TIEMPO REAL */}
              <div className="mt-5 flex gap-3">
                <div className="flex-1 bg-[#F6F1E7] rounded-2xl py-4 text-center border border-[#D8C9B2]">
                  <p className="text-3xl font-black">{timeLeft.dias}</p>
                  <span className="text-xs uppercase tracking-widest text-[#7A7A7A]">
                    Días
                  </span>
                </div>

                <div className="flex-1 bg-[#F6F1E7] rounded-2xl py-4 text-center border border-[#D8C9B2]">
                  <p className="text-3xl font-black">{timeLeft.horas}</p>
                  <span className="text-xs uppercase tracking-widest text-[#7A7A7A]">
                    Horas
                  </span>
                </div>

                <div className="flex-1 bg-[#F6F1E7] rounded-2xl py-4 text-center border border-[#D8C9B2]">
                  <p className="text-3xl font-black">{timeLeft.minutos}</p>
                  <span className="text-xs uppercase tracking-widest text-[#7A7A7A]">
                    Min
                  </span>
                </div>

                <div className="flex-1 bg-[#F6F1E7] rounded-2xl py-4 text-center border border-[#D8C9B2] bg-white/40">
                  <p className="text-3xl font-black text-[#A96C43]">{timeLeft.segundos}</p>
                  <span className="text-xs uppercase tracking-widest text-[#A96C43]">
                    Seg
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center items-center min-h-[500px]">
            <div className="absolute w-[340px] h-[340px] md:w-[520px] md:h-[520px] bg-[#D4B24D]/20 rounded-full blur-3xl" />
            <div className="absolute w-[240px] h-[240px] bg-[#2F5B3D]/20 rounded-full blur-2xl top-10 right-10" />

            <div className="relative grid grid-cols-2 gap-5 md:gap-7">
              <div className="bg-white/70 backdrop-blur-md border border-[#DCCEB9] rounded-[2rem] p-6 shadow-2xl rotate-[-6deg] w-40 md:w-52 h-48 md:h-60 flex items-center justify-center text-center">
                <p className="text-3xl md:text-4xl font-black leading-tight text-[#2F5B3D] max-w-[160px] md:max-w-[190px] text-center">
                  Menos tiempo.
                </p>
              </div>

              <div className="bg-[#2F5B3D] text-white rounded-[2rem] p-6 shadow-2xl rotate-[8deg] w-40 md:w-52 h-52 md:h-64 flex items-center justify-center text-center mt-10">
                <p className="text-3xl md:text-5xl font-black leading-tight max-w-[170px] text-center">
                  Más simple.
                </p>
              </div>

              <div className="bg-[#A96C43] text-white rounded-[2rem] p-6 shadow-2xl rotate-[5deg] w-40 md:w-52 h-48 md:h-60 flex items-center justify-center text-center -mt-4">
                <p className="text-2xl md:text-3xl font-black leading-tight max-w-[170px] text-center break-words">
                  Sin complicaciones.
                </p>
              </div>

              <div className="bg-[#F1C94A] text-[#2F5B3D] rounded-[2rem] p-6 shadow-2xl rotate-[-4deg] w-40 md:w-52 h-52 md:h-64 flex items-center justify-center text-center">
                <p className="text-3xl md:text-5xl font-black leading-tight max-w-[170px] text-center">
                  Ya casi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPECTATION SECTION */}
      <section className="px-6 lg:px-20 py-8 lg:py-14">
        <div className="max-w-6xl mx-auto bg-white border border-[#DCCEB9] rounded-[2.5rem] shadow-xl overflow-hidden grid lg:grid-cols-2">
          <div className="p-8 md:p-14 bg-[#F7F2E7]">
            <span className="text-[#A96C43] uppercase tracking-[0.3em] text-xs font-black">
              Nuevo
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-black leading-tight">
              ¿Y a ti
              <span className="block italic text-[#A96C43] font-serif normal-case">
                te gusta esperar?
              </span>
            </h2>

            <p className="mt-6 text-lg text-[#55735A] leading-relaxed">
              Estamos preparando una nueva experiencia. Algo rápido,
              diferente y diseñado para cambiar la forma en que haces las cosas.
            </p>
          </div>

          <div className="bg-[#2F5B3D] relative flex items-center justify-center p-10 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:22px_22px]" />

            <div className="relative bg-[#F6F1E7] rounded-[2rem] p-8 max-w-sm shadow-2xl border-4 border-white">
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#2F5B3D]" />
                <div className="w-3 h-3 rounded-full bg-[#D4B24D]" />
                <div className="w-3 h-3 rounded-full bg-[#A96C43]" />
              </div>

              <p className="text-[#486B4F] text-2xl md:text-3xl italic font-serif leading-snug text-center">
                “Próximamente ya no tendrás que esperar mucho.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-[#DCCEB9] px-6 lg:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-5 text-sm text-[#6D756C]">
        <p>© 2026 — Más práctico, más sencillo.</p>
        <div></div>
      </footer>
    </div>
  );
}

// Renderizado directo en el DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MixpressLanding />);