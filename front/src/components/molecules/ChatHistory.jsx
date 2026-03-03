/**
 * <ChatHistory /> — Fila de historial de conversaciones
 *
 * Elemento interactivo de lista para el panel lateral de chats.
 * Muestra el título de la conversación, el proyecto al que pertenece,
 * la marca de tiempo y un indicador de mensajes sin leer.
 *
 * Props:
 *   title       — string   Título o preview de la conversación
 *   projectName — string   Nombre del proyecto asociado
 *   timestamp   — string   Tiempo relativo legible (ej: "Hace 2h")
 *   isActive    — bool     Conversación actualmente seleccionada
 *   onClick     — function Handler de selección
 *   unread      — bool     Indica mensajes sin leer (punto + título en negrita)
 *   className   — string   Clases adicionales
 */

import TextAtom from '../atoms/TextAtom'

/* ----------------------------------------------------------------
   Estado activo vs inactivo
---------------------------------------------------------------- */
const ACTIVE_CLASSES   = 'bg-brand-50 border-l-2 border-brand-500'
const INACTIVE_CLASSES = 'hover:bg-gray-50 border-l-2 border-transparent'

const BASE_CLASSES = [
  'flex items-start gap-3 rounded-md cursor-pointer',
  'transition-colors duration-150 outline-none',
  'focus:shadow-focus-primary',
].join(' ')

export default function ChatHistory({
  title,
  projectName,
  timestamp,
  isActive  = false,
  onClick,
  unread    = false,
  className = '',
  ...props
}) {
  const classes = [
    BASE_CLASSES,
    isActive ? ACTIVE_CLASSES : INACTIVE_CLASSES,
    /* Ajuste de padding izquierdo para compensar el borde-l-2 sin layout shift */
    'px-3 py-2.5',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className={classes}
      {...props}
    >
      {/* Contenido principal */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">

        {/* Fila superior: título + timestamp + punto unread */}
        <div className="flex items-center justify-between gap-2">
          <TextAtom
            variant="text-sm"
            weight={unread ? 'semibold' : 'medium'}
            as="span"
            className={[
              'truncate',
              isActive ? 'text-brand-700' : 'text-gray-800',
            ].join(' ')}
          >
            {title}
          </TextAtom>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {unread && (
              <span className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" aria-label="Sin leer" />
            )}
            {timestamp && (
              <TextAtom variant="text-xs" as="span" className="text-gray-400">
                {timestamp}
              </TextAtom>
            )}
          </div>
        </div>

        {/* Proyecto asociado */}
        {projectName && (
          <TextAtom variant="text-xs" as="span" className="text-gray-400 truncate">
            {projectName}
          </TextAtom>
        )}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Ejemplos de uso:

   // Fila activa
   <ChatHistory
     title="Diagrama de microservicios"
     projectName="Proyecto Alpha"
     timestamp="Hace 2h"
     isActive
     onClick={() => selectChat(id)}
   />

   // Con mensaje sin leer
   <ChatHistory
     title="Análisis de requisitos del módulo de pagos"
     projectName="Proyecto Beta"
     timestamp="Ayer"
     unread
     onClick={() => selectChat(id)}
   />

   // Lista completa
   {chats.map(chat => (
     <ChatHistory
       key={chat.id}
       title={chat.title}
       projectName={chat.project}
       timestamp={chat.time}
       isActive={activeChat === chat.id}
       unread={chat.unread}
       onClick={() => setActiveChat(chat.id)}
     />
   ))}
---------------------------------------------------------------- */
