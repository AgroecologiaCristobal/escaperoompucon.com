import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Users, Clock, Star, ChevronDown, ChevronUp, Play, Pause, Volume2, VolumeX, MessageCircle, Calendar, Navigation, TowerControl as GameController, Trophy, Sparkles, MapPinned } from 'lucide-react';

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible] as const;
};

// Temuco Banner Component
const TemucoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-[#8B0000] via-[#A00000] to-[#8B0000] py-4 overflow-hidden border-t-2 border-b-2 border-[#D4AF37]">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="animate-pulse absolute top-2 left-10 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
          <div className="animate-pulse absolute top-6 right-20 w-1 h-1 bg-[#D4AF37] rounded-full" style={{ animationDelay: '0.5s' }}></div>
          <div className="animate-pulse absolute bottom-3 left-1/3 w-1.5 h-1.5 bg-[#D4AF37] rounded-full" style={{ animationDelay: '1s' }}></div>
          <div className="animate-pulse absolute bottom-5 right-10 w-2 h-2 bg-[#D4AF37] rounded-full" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div 
          className={`flex items-center justify-center gap-4 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <MapPinned className="text-[#D4AF37] animate-bounce" size={28} />
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-wide">
              ¡PRÓXIMAMENTE ESTAREMOS EN TEMUCO!
            </h3>
            <p className="text-[#D4AF37] font-semibold text-lg">
              Una nueva aventura de misterio llegará pronto...
            </p>
          </div>
          <MapPinned className="text-[#D4AF37] animate-bounce" size={28} style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-5 animate-pulse"></div>
    </div>
  );
};

// Section Divider Component
const SectionDivider: React.FC = () => {
  return (
    <div className="flex justify-center py-8">
      <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
    </div>
  );
};

// Hero Section Component
const HeroSection: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <section className="relative min-h-screen h-[120vh] overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0">
        <iframe
          src="https://www.youtube.com/embed/AIo9RV-m1wA?autoplay=1&mute=1&loop=1&playlist=AIo9RV-m1wA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          className="w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.7)',
            transform: 'scale(1.1)',
            pointerEvents: 'none'
          }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      {/* Logo en esquina superior derecha */}
      <div className="absolute top-6 right-6 z-20">
        <img
          src="/logoescaperoom.jpg"
          alt="Logo Los Misterios de la Casona - Escape Room Pucón"
          className="h-32 w-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end text-center px-4">
        <div className="pb-16 pt-8">
          <div className="max-w-5xl mx-auto">
          <h1 
            className={`text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 transition-all duration-1000 ease-out ${
              isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Escape Room Pucón – Los Misterios de la Casona
          </h1>
          
          <p 
            className={`text-base md:text-lg text-white max-w-4xl mx-auto leading-tight mb-6 transition-all duration-1000 ease-out ${
              isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            ¿Buscas una experiencia distinta en Pucón? ¡Bienvenido al primer Escape Room de la zona! Sumérgete en una aventura única donde tendrás que resolver acertijos, descubrir pistas ocultas y trabajar en equipo para escapar antes de que el tiempo se agote!
          </p>
          
          <a
            href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20un%20escape%20room%20en%20Los%20Misterios%20de%20la%20Casona."
            className={`inline-block bg-[#D4AF37] text-black px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300 ease-out ${
              isTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '900ms' }}
          >
            Reserva Ahora
          </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <>
      <SectionDivider />
      <section ref={ref} className="py-20 bg-[#363636]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 
              className={`text-4xl md:text-5xl font-bold text-[#D4AF37] mb-8 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Tu próxima aventura comienza en Los Misterios de la Casona
            </h2>
            
            <div 
              className={`text-xl text-white max-w-4xl mx-auto leading-relaxed space-y-6 transition-all duration-1000 ease-out delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p>
                Ubicados en una antigua casona en el corazón de Pucón, nuestras salas temáticas están diseñadas para hacerte vivir una historia emocionante, llena de misterio y adrenalina. Ideal para grupos de amigos, parejas, familias o actividades corporativas. Modalidad indoor perfecta para cualquier temporada.
              </p>
              <p>
                En Los Misterios de la Casona, transformamos el entretenimiento en una experiencia inmersiva. Diseñamos desafíos únicos que ponen a prueba tu lógica, creatividad y trabajo en equipo. ¿Estás listo para el reto?
              </p>
            </div>

            <div className={`mt-8 transition-all duration-1000 ease-out delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <a
                href="https://wa.me/56996543715?text=Hola%2C%20quiero%20contactarlos%20y%20reservar%20mi%20próxima%20aventura."
                className="inline-block bg-[#8B0000] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:scale-105 transition-all duration-300"
              >
                Contáctanos ya y reserva tu próxima aventura
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Room Card Component
const RoomCard: React.FC<{
  title: string;
  description: string;
  difficulty: string;
  players: string;
  image: string;
  alt: string;
  delay: number;
  cardType: 'pirate' | 'zombie';
}> = ({ title, description, difficulty, players, image, alt, delay, cardType }) => {
  const [ref, isVisible] = useIntersectionObserver();

  const getCardColors = () => {
    if (cardType === 'pirate') {
      return {
        initial: '#D4AF37',
        hover: '#F4CF47',
        shadow: 'rgba(212,175,55,0.6)'
      };
    } else {
      return {
        initial: '#8B0000',
        hover: '#2D5016',
        shadow: 'rgba(45,80,22,0.6)'
      };
    }
  };

  const colors = getCardColors();

  return (
    <div 
      ref={ref}
      className={`bg-black bg-opacity-50 rounded-lg overflow-hidden transform hover:scale-102 transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        borderTop: `4px solid ${colors.initial}`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 20px ${colors.shadow}`;
        e.currentTarget.style.borderTopColor = colors.hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderTopColor = colors.initial;
      }}
    >
      <img 
        src={image} 
        alt={alt}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#D4AF37] mb-3">{title}</h3>
        <p className="text-white mb-4 leading-relaxed">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="text-[#D4AF37]" size={18} />
            <span className="text-[#A9A9A9]">{players}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-[#D4AF37]" size={18} />
            <span className="text-[#A9A9A9]">{difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Rooms Section Component
const RoomsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <>
      <SectionDivider />
      <section ref={ref} id="rooms" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 
            className={`text-4xl md:text-5xl font-bold text-[#D4AF37] text-center mb-12 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Explora Nuestros Mundos de Misterio
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <RoomCard
              title="Sala El Pirata Pinwine"
              description="¿De qué trata la Sala del pirata Pinwine? Es una aventura de misterio pirata llena de puzzles de lógica. Deberán desentrañar los secretos del Capitán Pinwine para cumplir su misión. Es ideal para grupos de amigos, parejas y familias. Tiene una dificultad media. Disponible en español y en inglés."
              difficulty="Media"
              players="2-8"
              image="/pirata.png"
              alt="Imagen de la Sala del Pirata Pinwine, un escape room temático de piratas."
              delay={300}
              cardType="pirate"
            />
            
            <RoomCard
              title="Sala El Elixir Zombie"
              description="¿De qué trata la Sala El Elixir Zombie? Es una aventura post-apocalíptica donde deben encontrar la cura para un virus zombie. Deberán investigar un laboratorio y colaborar bajo presión antes de que los zombies regresen. Es ideal para grupos de amigos y equipos valientes. Tiene una dificultad difícil. Disponible en inglés y español."
              difficulty="Alta"
              players="2-8"
              image="/zombie.png"
              alt="Imagen de la Sala El Elixir Zombi, un escape room de terror y ciencia ficción."
              delay={600}
              cardType="zombie"
            />
          </div>
        </div>
      </section>
    </>
  );
};

// How It Works Step Component
const StepCard: React.FC<{
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  linkTo?: string;
}> = ({ step, title, description, icon, delay, linkTo }) => {
  const [ref, isVisible] = useIntersectionObserver();

  const content = (
    <div 
      ref={ref}
      className={`text-center transform transition-all duration-600 ease-out bg-[#363636] p-6 rounded-lg hover:bg-[#404040] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-[#D4AF37] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#D4AF37] mb-3">{title}</h3>
      <p className="text-white leading-relaxed mb-4">{description}</p>
      {step === 1 && (
        <a
          href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20un%20escape%20room."
          className="inline-block text-[#D4AF37] hover:text-white transition-colors duration-300 text-sm font-semibold"
        >
          +56 9 9654 3715
        </a>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <a href={linkTo} className="block">
        {content}
      </a>
    );
  }

  return content;
};

// How It Works Section Component
const HowItWorksSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <>
      <SectionDivider />
      <section ref={ref} className="py-20 bg-[#363636]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 
            className={`text-4xl md:text-5xl font-bold text-[#D4AF37] text-center mb-12 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            4 Pasos Para Que Estés Disfrutando Nuestro Escape Room
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepCard
              step={1}
              title="Reserva"
              description="Contáctanos directamente por WhatsApp para asegurar tu aventura."
              icon={<MessageCircle className="text-[#363636]" size={24} />}
              delay={200}
            />
            
            <StepCard
              step={2}
              title="Dirígete a Nuestra Ubicación"
              description="Llega con 15 minutos de anticipación a tu horario de inicio para la respectiva introducción."
              icon={<Navigation className="text-[#363636]" size={24} />}
              delay={400}
              linkTo="#contact"
            />
            
            <StepCard
              step={3}
              title="Juega"
              description="Sumérgete completamente en la historia y resuelve los enigmas para escapar."
              icon={<GameController className="text-[#363636]" size={24} />}
              delay={600}
              linkTo="#rooms"
            />
            
            <StepCard
              step={4}
             title="Escapa"
             description="¿Lograste escapar? ¡Tu historia merece ser contada!"
              icon={<Trophy className="text-[#363636]" size={24} />}
              delay={800}
              linkTo="#testimonials"
            />
          </div>
        </div>
      </section>
    </>
  );
};

// Testimonials Section Component
const TestimonialsSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      text: "¡Una experiencia increíble! Logramos completar la aventura en 50:46. Los puzzles son desafiantes y la ambientación es de 10.",
      author: "Los Jabalíes",
      image: "/jabaliesytablas.jpeg"
    },
    {
      text: "¡Qué experiencia tan divertida! Somos un equipo pequeño pero poderoso. Definitivamente volveremos con más amigos.",
      author: "Pichitos",
      image: "/pichitos.jpeg"
    },
    {
      text: "La atención fue fantástica y la sala del pirata es genial. Nuestro tiempo fue 51:50. ¡Volveremos!",
      author: "16 Ojos",
      image: "/16ojos.jpeg"
    },
    {
      text: "Fuimos con amigos y nos reímos muchísimo. ¡Totalmente recomendado para cualquier grupo!",
      author: "Los Pifiados",
      image: "/lospifiados.jpeg"
    },
    {
      text: "El mejor escape room que hemos hecho. ¡Ya queremos probar otra sala! Una experiencia única.",
      author: "Ganya Team",
      image: "/ganyateam.jpeg"
    },
    {
      text: "¡Las Indomitas conquistamos el escape room en 58:33! Una experiencia llena de adrenalina y diversión. ¡Totalmente recomendado!",
      author: "Las Indomitas",
      image: "/lasindomitas.jpeg"
    },
    {
      text: "Las Rafitas vivimos una aventura increíble. El trabajo en equipo fue clave para resolver todos los misterios. ¡Volveremos!",
      author: "Las Rafitas",
      image: "/lasrafitas.jpeg"
    },
    {
      text: "El Club de Checho logró escapar en 54:47! Una experiencia que combina diversión, desafío y mucha emoción. ¡Imperdible!",
      author: "Club de Checho",
      image: "/clubdechecho.jpeg"
    }
  ];

  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <>
      <SectionDivider />
      <section ref={ref} id="testimonials" className="py-20 bg-white overflow-hidden border-t-4 border-b-4 border-[#D4AF37]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-3 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Sparkles className="text-[#D4AF37] animate-pulse" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold text-[#363636]">
                Lo que Dicen Nuestros Aventureros
              </h2>
              <Sparkles className="text-[#D4AF37] animate-pulse" size={32} />
            </div>
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className={`flex gap-6 ${isPaused ? '' : 'animate-scroll'}`}
              style={{
                width: `${doubledTestimonials.length * 320}px`,
                animation: isPaused ? 'none' : 'scroll 30s linear infinite'
              }}
            >
              {doubledTestimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-[#363636] p-6 rounded-lg min-w-[320px] border-l-4 border-[#D4AF37] shadow-lg"
                >
                  <div className="mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={`Foto del equipo ${testimonial.author}`}
                      className="w-full h-32 object-cover rounded-lg"
                      style={{ 
                        objectPosition: testimonial.author === "Los Pifiados" ? 'center 40%' : 
                                      testimonial.author === "Las Rafitas" ? 'center 35%' : 'center 20%'
                      }}
                    />
                  </div>
                  <p className="text-white mb-4 italic">"{testimonial.text}"</p>
                  <p className="text-[#D4AF37] font-semibold">- {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// FAQ Section Component
const FAQSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Qué es un Escape Room?",
      answer: "Es una experiencia de juego en vivo donde tú y tu equipo son \"encerrados\" temáticamente en una sala y tienen 60 minutos para resolver acertijos, encontrar pistas y completar una misión para \"escapar\" o lograr el objetivo antes de que se acabe el tiempo. ¡Es una aventura de ingenio y trabajo en equipo!"
    },
    {
      question: "¿Estamos realmente encerrados?",
      answer: "¡No! Por seguridad, nunca estás realmente encerrado. Siempre habrá una salida de emergencia accesible en caso de necesidad. Nuestro Game Master te explicará cómo funciona antes de empezar."
    },
    {
      question: "¿Necesitamos alguna habilidad o conocimiento especial?",
      answer: "¡Absolutamente no! Nuestros juegos están diseñados para poner a prueba tu lógica, observación, creatividad y capacidad de trabajo en equipo. No necesitas fuerza física ni conocimientos previos. Solo ganas de divertirte y pensar."
    },
    {
      question: "¿Qué pasa si no logramos escapar a tiempo?",
      answer: "No te preocupes, el Game Master entrará a la sala para explicarte las soluciones de los puzzles restantes y celebrar tu esfuerzo. Lo importante es la diversión y la experiencia, no siempre el escape."
    },
    {
      question: "¿Se puede jugar en silla de ruedas o con movilidad reducida?",
      answer: "Sí, en general nuestras salas están diseñadas para ser accesibles. Sin embargo, te recomendamos contactarnos por WhatsApp antes de reservar para que podamos confirmarte la adaptabilidad de la sala específica (Capitán Pinwine o Zombie) a tus necesidades y asegurar la mejor experiencia."
    },
    {
      question: "¿Pueden jugar mujeres embarazadas?",
      answer: "Sí, nuestras salas son seguras para mujeres embarazadas. No requieren esfuerzo físico intenso. Si hay alguna parte que no deseen hacer, otro miembro del equipo puede realizarla."
    },
    {
      question: "¿Cuántas personas pueden jugar?",
      answer: "Nuestras salas están diseñadas para grupos de 2 hasta 8 personas por sesión. Para grupos más grandes, les recomendamos reservar sesiones consecutivas y dividir al equipo para competir entre ustedes."
    },
    {
      question: "¿Hay una edad mínima para participar?",
      answer: "Sala del Capitán Pinwine: Recomendada para mayores de 8 años. Los menores de 14 años deben ir acompañados por un adulto responsable que participe en el juego. Sala Zombie: Próximamente (Invierno 2025). Por su temática y nivel de tensión, la edad mínima recomendada será de 12-14 años, y los menores deberán estar acompañados por un adulto."
    },
    {
      question: "¿Cómo puedo reservar una sesión?",
      answer: "Actualmente, las reservas se realizan vía WhatsApp al +56 9 9654 3715. Simplemente envíanos un mensaje con la fecha, hora y sala que te interesa, ¡y te confirmaremos la disponibilidad!"
    },
    {
      question: "¿Con cuánta anticipación debo llegar?",
      answer: "Les pedimos llegar 10-15 minutos antes de la hora de su reserva. Esto nos permite hacer una breve introducción, explicar las reglas y asegurar que su juego comience a tiempo, ya que tenemos otras sesiones programadas."
    },
    {
      question: "¿Qué sucede si llego tarde?",
      answer: "La puntualidad es muy importante. Si llegan tarde, lamentablemente su tiempo de juego podría verse reducido para no afectar a los grupos siguientes. Si el retraso es excesivo, podríamos tener que cancelar la sesión sin reembolso. Por favor, avísenos lo antes posible si se presenta un imprevisto."
    },
    {
      question: "¿Cuánto dura la experiencia total?",
      answer: "El juego en sí dura 60 minutos. Además, deben considerar 10-15 minutos antes para la introducción y 5-10 minutos después para la foto de grupo y comentarios. En total, estarán con nosotros alrededor de 80-90 minutos."
    },
    {
      question: "¿Cuál es el precio por persona?",
      answer: "El precio es de $10.000 CLP por persona."
    },
    {
      question: "¿Cómo funciona la reserva, modificación o cancelación?",
      answer: "Para reservar y asegurar tu horario, es necesario cancelar el 50% del valor total de la sesión al momento de la reserva. Puedes modificar tu reserva con previo aviso (idealmente 24-48 horas de anticipación) o en casos excepcionales, contactándonos por WhatsApp al +56 9 9654 3715. En caso de cancelación de la reserva, el 50% abonado al momento de reservar no será reembolsado. Te animamos a comunicarte con nosotros ante cualquier imprevisto para explorar las mejores opciones."
    },
    {
      question: "¿Qué debo llevar o cómo debo ir vestido?",
      answer: "Recomendamos venir con ropa y calzado cómodos. No se requiere ropa especial, pero asegúrate de poder moverte con libertad."
    },
    {
      question: "¿Puedo usar mi teléfono celular dentro de la sala?",
      answer: "Para una inmersión completa y por la confidencialidad de los puzzles, no se permite el uso de teléfonos celulares ni otros dispositivos electrónicos dentro de la sala de juego. Habrá un lugar seguro donde podrán guardarlos."
    },
    {
      question: "¿La Sala Zombie da miedo?",
      answer: "La Sala Zombie está diseñada para generar tensión y adrenalina con su ambientación y narrativa. Habrá elementos de sorpresa y una atmósfera inmersiva. Si bien no es un \"juego de terror\" con sobresaltos constantes, sí tendrá momentos que elevarán la emoción."
    },
    {
      question: "¿Tienen estacionamiento disponible?",
      answer: "Estamos ubicados en Ramón Quezada 0470, La Casona Pucón. Contamos con estacionamiento en el lugar o en las cercanías. Te daremos indicaciones más precisas al momento de tu reserva."
    },
    {
      question: "¿Qué otros servicios o planes tienen para el futuro?",
      answer: "Somos el primero y único Escape Room en Pucón, estamos en la casona Pucón, lugar que alberga cafetería con vista al lago (café calma), tiendas de ropa estilo concept store y donde constantemente se ofrecen diferentes actividades."
    }
  ];

  return (
    <>
      <SectionDivider />
      <section ref={ref} className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 
            className={`text-4xl md:text-5xl font-bold text-[#D4AF37] text-center mb-12 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            ¿Tienes Preguntas?<br />Tenemos Respuestas
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#363636]">
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full py-4 px-6 text-left flex justify-between items-center hover:bg-[#363636] transition-colors duration-300"
                >
                  <span className="text-white font-semibold">{faq.question}</span>
                  {activeIndex === index ? (
                    <ChevronUp className="text-[#D4AF37] transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="text-[#D4AF37] transition-transform duration-300" />
                  )}
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className="text-[#A9A9A9] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Instagram Section Component
const GallerySection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const galleryImages = [
    {
      src: "/jabaliesytablas.jpeg",
      alt: "Equipo Los Jabalíes celebrando su escape exitoso"
    },
    {
      src: "/pichitos.jpeg",
      alt: "Equipo Pichitos después de completar la aventura"
    },
    {
      src: "/16ojos.jpeg",
      alt: "Grupo 16 Ojos después de completar la aventura"
    },
    {
      src: "/lospifiados.jpeg",
      alt: "Los Pifiados disfrutando su experiencia en el escape room"
    },
    {
      src: "/ganyateam.jpeg",
      alt: "Ganya Team celebrando su victoria en Los Misterios de la Casona"
    },
    {
      src: "/lasindomitas.jpeg",
      alt: "Las Indomitas después de completar su aventura en 58:33"
    },
    {
      src: "/lasrafitas.jpeg",
      alt: "Las Rafitas celebrando su experiencia en el escape room"
    },
    {
      src: "/clubdechecho.jpeg",
      alt: "Club de Checho después de escapar en 54:47"
    }
  ];

  return (
    <>
      <SectionDivider />
      <section ref={ref} className="py-20 bg-[#363636]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 
            className={`text-4xl md:text-5xl font-bold text-[#D4AF37] text-center mb-12 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Galería de Aventureros
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`aspect-square overflow-hidden rounded-lg hover:scale-103 transition-all duration-300 hover:shadow-lg relative group cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-2">
                    <p className="text-sm font-semibold">Ver más</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a
              href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20un%20escape%20room%20y%20ser%20parte%20de%20esta%20galería."
              className="inline-block bg-[#8B0000] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:scale-105 transition-all duration-300"
            >
              ¡Reserva y Sé Parte de Nuestra Galería!
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

// La Casona Section Component
const LaCasonaSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [currentConceptImageIndex, setCurrentConceptImageIndex] = useState(0);
  const [currentCafeteriaImageIndex, setCurrentCafeteriaImageIndex] = useState(0);

  const conceptStoreImages = [
    '/TIENDACONCEPT1.jpeg',
    '/TIENDACONCEPT.jpeg'
  ];

  const cafeteriaImages = [
    '/CAFETERIA1.jpeg',
    '/CAFETERIA.jpeg',
    '/CAFETERIA2.jpeg'
  ];

  useEffect(() => {
    const conceptInterval = setInterval(() => {
      setCurrentConceptImageIndex((prev) => (prev + 1) % conceptStoreImages.length);
    }, 4000); // Cambia cada 4 segundos

    const cafeteriaInterval = setInterval(() => {
      setCurrentCafeteriaImageIndex((prev) => (prev + 1) % cafeteriaImages.length);
    }, 4000); // Cambia cada 4 segundos

    return () => {
      clearInterval(conceptInterval);
      clearInterval(cafeteriaInterval);
    };
  }, []);

  const modules = [
    {
      title: 'Tienda Concept Store:\nLa Casona Pucón, Un Mundo de Descubrimientos',
      description: 'Sumérgete en un espacio lleno de encanto y originalidad en Concept Store "La Casona". Aquí podrás descubrir una variada selección de productos y marcas, ideales para encontrar ese detalle especial, un regalo único o simplemente algo que te encante. Desde artículos de diseño y decoración hasta moda y artesanía local, cada visita es una oportunidad para encontrar algo diferente y llevarte un pedacito de Pucón.',
      images: conceptStoreImages,
      currentIndex: currentConceptImageIndex,
      setCurrentIndex: setCurrentConceptImageIndex,
      isCarousel: true,
      alt: 'Interior de tienda concept store con productos únicos y artesanía local'
    },
    {
      title: 'Cafetería de Especialidad:\nVistas Inolvidables al Lago',
      description: 'Después de la adrenalina de tu escape, o simplemente para disfrutar de un momento único, relájate en la cafetería de especialidad Calma. Situada estratégicamente a la orilla del lago, la cual ofrece no solo el mejor café y una deliciosa selección de pastelería y snacks, sino también una vista espectacular que te dejará sin aliento. Es el spot ideal para recargar energías, conversar con amigos o simplemente contemplar la belleza de Pucón.',
      images: cafeteriaImages,
      currentIndex: currentCafeteriaImageIndex,
      setCurrentIndex: setCurrentCafeteriaImageIndex,
      isCarousel: true,
      alt: 'Cafetería con vista al lago, ambiente acogedor con café de especialidad'
    },
    {
      title: 'Actividades y Talleres:\nUn Espacio Siempre Vivo',
      description: 'En La Casona Pucón, la experiencia nunca se detiene. Regularmente, somos anfitriones de una variedad de actividades y talleres diseñados para enriquecer tu visita. Desde exposiciones de arte y charlas culturales hasta workshops creativos y eventos comunitarios, siempre hay algo nuevo y emocionante sucediendo. ¡Mantente atento a nuestras redes sociales o consulta en el lugar para conocer la programación de este mes y sumarte a la acción!',
      image: '/ACTIVIDADES1.jpeg',
      isCarousel: false,
      alt: 'Espacio de actividades y talleres en La Casona Pucón'
    },
    {
      title: 'Paseo a Orilla del Lago:\nUn Agradable Recorrido Peatonal',
      description: 'Aprovecha nuestra ubicación privilegiada para disfrutar de un relajante paseo peatonal por la hermosa orilla del lago Villarrica, justo al salir de La Casona. Conecta con la naturaleza y disfruta de las vistas panorámicas, el complemento perfecto para tu día de aventura y diversión en Pucón.',
      image: '/CAFETERIA.jpeg',
      isCarousel: false,
      alt: 'Vista de la cafetería al atardecer con ambiente cálido y acogedor'
    }
  ];

  return (
    <>
      <SectionDivider />
      <section ref={ref} className="py-20 bg-[#363636]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className={`text-4xl md:text-5xl font-bold text-[#D4AF37] mb-8 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Más Allá del Escape Room:<br />Descubre La Casona Pucón
            </h2>
            
            <p 
              className={`text-xl text-white max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Tu aventura en Escape Room Pucón es solo el comienzo. Ubicados en la histórica La Casona Pucón, te invitamos a explorar un espacio vibrante que complementa tu experiencia de juego con opciones únicas para relajarte, comprar y disfrutar. En nuestro mismo lugar, encontrarás:
            </p>
          </div>
          
          <div className="space-y-12">
            {modules.map((module, index) => (
              <div 
                key={index}
                className={`grid md:grid-cols-2 gap-8 items-center transition-all duration-1000 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                {module.isCarousel ? (
                  <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''} relative`}>
                    <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
                      {module.images?.map((img, imgIndex) => (
                        <img 
                          key={imgIndex}
                          src={img} 
                          alt={`${module.alt} - Imagen ${imgIndex + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1500 ease-in-out ${
                            imgIndex === module.currentIndex 
                              ? 'opacity-100 scale-100 blur-0' 
                              : 'opacity-0 scale-110 blur-sm'
                          }`}
                        />
                      ))}
                      
                      {/* Indicadores del carrusel */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {module.images?.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={() => module.setCurrentIndex?.(imgIndex)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              imgIndex === module.currentIndex 
                                ? 'bg-[#D4AF37] scale-110' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Overlay con efecto hover */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 cursor-pointer"
                           onClick={() => module.setCurrentIndex?.((prev) => (prev + 1) % (module.images?.length || 1))}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                    <img 
                      src={module.image} 
                      alt={module.alt}
                      className="w-full h-80 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className={`${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-6">
                    {module.title.split('\n').map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex < module.title.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h3>
                  <p className="text-white leading-relaxed text-lg">
                    {module.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`text-center mt-12 transition-all duration-1000 ease-out delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <a
              href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20conocer%20más%20sobre%20La%20Casona%20Pucón%20y%20sus%20servicios."
              className="inline-block bg-[#8B0000] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:scale-105 transition-all duration-300"
            >
              Descubre Todo Lo Que Tenemos Para Ti
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

// Contact Section Component
const ContactSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <>
      <TemucoBanner />
      <SectionDivider />
      <section ref={ref} id="contact" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 
            className={`text-4xl md:text-5xl font-bold text-[#D4AF37] text-center mb-12 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Encuéntranos y Contáctanos
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`space-y-6 transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="flex items-start gap-4">
                <MapPin className="text-[#D4AF37] mt-1" size={24} />
                <div>
                  <h3 className="text-white font-semibold mb-1">Dirección</h3>
                  <p className="text-[#A9A9A9]">Ramón Quezada 0470, Pucón</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="text-[#D4AF37] mt-1" size={24} />
                <div>
                  <h3 className="text-white font-semibold mb-1">Teléfono</h3>
                  <a 
                    href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20un%20escape%20room%20en%20Los%20Misterios%20de%20la%20Casona."
                    className="text-[#A9A9A9] hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    +56 9 9654 3715
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="text-[#D4AF37] mt-1" size={24} />
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <a 
                    href="mailto:escaperoompucon@gmail.com"
                    className="text-[#A9A9A9] hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    escaperoompucon@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <h3 className="text-white font-semibold">Síguenos:</h3>
                <div className="flex gap-3">
                  <a 
                    href="https://www.instagram.com/escaperoom_pucon/?hl=es" 
                    className="text-[#A9A9A9] hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              
              <div className="pt-4">
                <a
                  href="https://wa.me/56996543715?text=Hola%2C%20me%20interesa%20reservar%20un%20escape%20room%20en%20Los%20Misterios%20de%20la%20Casona."
                  className="inline-block bg-[#8B0000] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:scale-105 transition-all duration-300"
                >
                  Reserva Ahora por WhatsApp
                </a>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 ease-out delay-600 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="rounded-lg overflow-hidden">
                <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.234567890123!2d-71.9762225!3d-39.2666282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96147f4838ebcf1d:0x5f6543199a9b5c15!2sEscape+room+pucon!5e0!3m2!1ses!2scl!4v1678901234567!5m2!1ses!2scl"
                  width="100%" 
                  height="350" 
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                 title="Ubicación de Escape Room Pucón - Los Misterios de la Casona"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#363636] py-8 border-t border-[#A9A9A9]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <p className="text-[#A9A9A9] mb-4">
            © 2025 Los Misterios de la Casona. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="#" 
              className="text-[#A9A9A9] hover:text-[#D4AF37] hover:underline transition-all duration-200"
            >
              Política de Privacidad
            </a>
            <a 
              href="#" 
              className="text-[#A9A9A9] hover:text-[#D4AF37] hover:underline transition-all duration-200"
            >
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <TemucoBanner />
      <AboutSection />
      <RoomsSection />
      <HowItWorksSection />
      <ContactSection />
      <TestimonialsSection />
      <FAQSection />
      <GallerySection />
      <LaCasonaSection />
      <Footer />
    </div>
  );
};

export default App;