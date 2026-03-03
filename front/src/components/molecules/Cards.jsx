/**
 * <Cards /> — Tarjeta de contenido con 3 variantes de layout
 *
 * Props:
 *   variant     — 'titled' | 'text' | 'image'
 *   title       — string    Título de la tarjeta
 *   description — string    Texto descriptivo
 *   image       — string    URL de imagen (solo variant="image")
 *   imageAlt    — string    Alt text de la imagen
 *   icon        — ReactNode Icono en la banda de cabecera (solo "titled")
 *   tag         — string    Etiqueta pequeña sobre el título
 *   actions     — ReactNode Slot de acciones en el pie de la tarjeta
 *   onClick     — function  Hace la tarjeta clicable (sombra en hover)
 *   className   — string    Clases adicionales
 *
 * Variantes:
 *   titled — Banda de gradiente con icono + contenido + acciones
 *   text   — Solo contenido textual, sin cabecera visual
 *   image  — Imagen aspect-video en la parte superior
 */

import HeaderAtom from '../atoms/HeaderAtom'
import TextAtom   from '../atoms/TextAtom'

/* ----------------------------------------------------------------
   Clases base compartidas por las 3 variantes
---------------------------------------------------------------- */
const BASE_CARD   = 'bg-white rounded-lg border border-gray-100 overflow-hidden flex flex-col shadow-sm transition-shadow duration-150'
const INTERACTIVE = 'cursor-pointer hover:shadow-md'

/* ================================================================
   Sub-componentes internos (no exportados)
================================================================ */

function TitledCard({ title, description, icon, tag, actions, onClick, className }) {
  return (
    <div
      className={[BASE_CARD, onClick ? INTERACTIVE : '', className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {/* Banda de cabecera con gradiente brand */}
      <div className="bg-gradient-linear-90-600-500 px-6 py-5 flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center text-white [&_svg]:w-5 [&_svg]:h-5 flex-shrink-0">
            {icon}
          </div>
        )}
        {tag && (
          <span className="text-body-xs font-medium text-white/80 bg-white/15 rounded-full px-2.5 py-0.5">
            {tag}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col gap-2 flex-1">
        {title && (
          <HeaderAtom level={4} weight="semibold" className="text-gray-900">
            {title}
          </HeaderAtom>
        )}
        {description && (
          <TextAtom variant="text-sm" className="text-gray-500">
            {description}
          </TextAtom>
        )}
      </div>

      {/* Footer de acciones */}
      {actions && (
        <div className="px-6 pb-6 pt-0 border-t border-gray-100 mt-auto flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  )
}

function TextCard({ title, description, tag, actions, onClick, className }) {
  return (
    <div
      className={[BASE_CARD, onClick ? INTERACTIVE : '', className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <div className="p-6 flex flex-col gap-2 flex-1">
        {tag && (
          <span className="text-body-xs font-semibold text-brand-600 uppercase">
            {tag}
          </span>
        )}
        {title && (
          <HeaderAtom level={4} weight="semibold" className="text-gray-900">
            {title}
          </HeaderAtom>
        )}
        {description && (
          <TextAtom variant="text-sm" className="text-gray-500">
            {description}
          </TextAtom>
        )}
      </div>

      {actions && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4 flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  )
}

function ImageCard({ title, description, image, imageAlt = '', tag, actions, onClick, className }) {
  return (
    <div
      className={[BASE_CARD, onClick ? INTERACTIVE : '', className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {/* Imagen con fallback de gradiente */}
      <div className="aspect-video w-full overflow-hidden bg-gray-100 flex-shrink-0">
        {image
          ? <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
          : (
            <div className="w-full h-full bg-gradient-linear-90-600-500 flex items-center justify-center">
              <TextAtom variant="display-md" weight="bold" className="text-white opacity-40 select-none">
                {title?.[0]?.toUpperCase() ?? '?'}
              </TextAtom>
            </div>
          )
        }
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        {tag && (
          <TextAtom variant="text-xs" weight="semibold" className="text-brand-600 uppercase">
            {tag}
          </TextAtom>
        )}
        {title && (
          <HeaderAtom level={4} weight="semibold" className="text-gray-900">
            {title}
          </HeaderAtom>
        )}
        {description && (
          <TextAtom variant="text-sm" className="text-gray-500">
            {description}
          </TextAtom>
        )}
      </div>

      {actions && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-3 flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  )
}

/* ================================================================
   Componente principal — despacha al sub-componente correcto
================================================================ */
export default function Cards({ variant = 'text', ...props }) {
  if (variant === 'titled') return <TitledCard {...props} />
  if (variant === 'image')  return <ImageCard  {...props} />
  return <TextCard {...props} />
}

/* ----------------------------------------------------------------
   Ejemplos de uso:

   // Tarjeta titled con icono
   import ArchitectureIcon from '@mui/icons-material/Architecture'
   <Cards
     variant="titled"
     title="Microservicios"
     description="Patrón de arquitectura distribuida basado en servicios independientes."
     icon={<ArchitectureIcon />}
     tag="Patrón"
     actions={<ButtonAtom intent="secondary" size="sm">Ver más</ButtonAtom>}
     onClick={() => navigate('/patterns/microservices')}
   />

   // Tarjeta de texto con acción
   <Cards
     variant="text"
     tag="Tutorial"
     title="Introducción a Domain-Driven Design"
     description="Aprende los principios fundamentales del DDD y cómo aplicarlos."
     actions={<ButtonAtom intent="ghost" size="sm">Leer</ButtonAtom>}
   />

   // Tarjeta de imagen
   <Cards
     variant="image"
     title="Proyecto E-commerce"
     description="Arquitectura basada en microservicios con API Gateway."
     image="https://example.com/diagram.png"
     tag="En progreso"
     onClick={() => openProject(id)}
   />
---------------------------------------------------------------- */
