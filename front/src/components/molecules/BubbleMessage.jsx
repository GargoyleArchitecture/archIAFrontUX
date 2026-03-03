/**
 * <BubbleMessage /> — Burbuja de mensaje de chat
 *
 * Dos variantes según el emisor:
 *   user — Derecha, fondo brand-100 cálido, esquina redondeada inferior-derecha pequeña
 *   ai   — Izquierda, fondo blanco con borde y sombra, esquina inferior-izquierda pequeña
 *          + slot opcional de avatar al lado de la burbuja
 *
 * Props:
 *   variant   — 'user' | 'ai'
 *   children  — ReactNode   Contenido del mensaje
 *   isLoading — bool        Muestra indicador de escritura en lugar del contenido
 *   avatar    — ReactNode   Elemento de avatar (solo variante 'ai')
 *   timestamp — string      Hora del mensaje, debajo de la burbuja
 *   className — string      Clases adicionales para el wrapper
 */

import TextAtom from '../atoms/TextAtom'

/* ----------------------------------------------------------------
   Indicador de escritura animado (uso interno)
---------------------------------------------------------------- */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------
   Mapeo variant → clases del wrapper y de la burbuja
---------------------------------------------------------------- */
const WRAPPER_CLASS = {
  user: 'flex flex-col items-end gap-1',
  ai:   'flex flex-col items-start gap-1',
}

const BUBBLE_CLASS = {
  user: 'bg-brand-100 text-gray-900 rounded-lg rounded-br-sm shadow-xs max-w-[75%] px-4 py-2.5',
  ai:   'bg-white border border-gray-100 text-gray-800 rounded-lg rounded-bl-sm shadow-sm max-w-[75%] px-4 py-2.5',
}

const TIMESTAMP_CLASS = {
  user: 'text-right',
  ai:   'text-left',
}

export default function BubbleMessage({
  variant   = 'ai',
  children,
  isLoading = false,
  avatar,
  timestamp,
  className = '',
  ...props
}) {
  const classes = [WRAPPER_CLASS[variant], className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>

      {/* Fila con avatar (AI) + burbuja */}
      <div className="flex items-end gap-2">

        {/* Avatar — solo para variante AI */}
        {variant === 'ai' && avatar && (
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 self-end">
            {avatar}
          </div>
        )}

        {/* Burbuja de mensaje */}
        <div className={BUBBLE_CLASS[variant]}>
          {isLoading ? (
            <TypingDots />
          ) : (
            <TextAtom variant="text-sm" className="text-inherit leading-relaxed">
              {children}
            </TextAtom>
          )}
        </div>
      </div>

      {/* Timestamp debajo de la burbuja */}
      {timestamp && !isLoading && (
        <TextAtom
          variant="text-xs"
          as="span"
          className={['text-gray-400 px-1', TIMESTAMP_CLASS[variant]].join(' ')}
        >
          {timestamp}
        </TextAtom>
      )}
    </div>
  )
}

/* ----------------------------------------------------------------
   Ejemplos de uso:

   // Mensaje del usuario
   <BubbleMessage variant="user" timestamp="14:23">
     Genera un diagrama de microservicios para un e-commerce.
   </BubbleMessage>

   // Respuesta de la IA
   <BubbleMessage variant="ai" timestamp="14:23">
     Aquí tienes una arquitectura de microservicios con API Gateway,
     servicio de autenticación y catálogo de productos.
   </BubbleMessage>

   // Indicador de escritura (IA procesando)
   <BubbleMessage variant="ai" isLoading />

   // Con avatar personalizado
   import SmartToyIcon from '@mui/icons-material/SmartToy'
   <BubbleMessage
     variant="ai"
     avatar={
       <div className="w-full h-full bg-brand-600 flex items-center justify-center">
         <SmartToyIcon style={{ fontSize: 16, color: 'white' }} />
       </div>
     }
   >
     Claro, voy a analizar la arquitectura actual...
   </BubbleMessage>

   // Conversación completa
   <div className="flex flex-col gap-4 p-4">
     <BubbleMessage variant="user">¿Qué es DDD?</BubbleMessage>
     <BubbleMessage variant="ai">
       Domain-Driven Design es una metodología de desarrollo de software...
     </BubbleMessage>
     <BubbleMessage variant="ai" isLoading />
   </div>
---------------------------------------------------------------- */
