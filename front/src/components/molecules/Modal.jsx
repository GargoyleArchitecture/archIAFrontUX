/**
 * <Modal /> — Contenedor de diálogo superpuesto
 *
 * Overlay fijo con panel centrado. Se cierra al hacer click en el
 * overlay o al presionar Escape. No usa React Portal — el z-50 es
 * suficiente para este contexto de app sin conflictos de z-index.
 *
 * Props:
 *   isOpen    — bool       Controla la visibilidad
 *   onClose   — function   Llamado al cerrar (overlay click o Escape)
 *   title     — string     Título en la cabecera del panel
 *   size      — 'sm' | 'md' | 'lg' | 'xl'
 *   footer    — ReactNode  Slot de acciones en el pie del modal
 *   children  — ReactNode  Contenido del cuerpo
 *   className — string     Clases adicionales para el panel
 */

import { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import HeaderAtom from '../atoms/HeaderAtom'
import ButtonAtom from '../atoms/ButtonAtom'

/* ----------------------------------------------------------------
   Mapeo size → max-width del panel
---------------------------------------------------------------- */
const SIZE_CLASS = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

const PANEL_BASE = [
  'relative bg-white rounded-lg shadow-xl',
  'w-full mx-4',
  'flex flex-col max-h-[90vh]',
].join(' ')

const OVERLAY_BASE = [
  'fixed inset-0 z-50',
  'flex items-center justify-center',
  'bg-gray-900/50 backdrop-blur-sm',
].join(' ')

export default function Modal({
  isOpen,
  onClose,
  title,
  size      = 'md',
  footer,
  children,
  className = '',
  ...props
}) {
  /* Cerrar con tecla Escape */
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const panelClasses = [PANEL_BASE, SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={OVERLAY_BASE}
      /* Click en el overlay (no en el panel) cierra el modal */
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      {...props}
    >
      <div className={panelClasses}>

        {/* Cabecera */}
        {title && (
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <HeaderAtom
              id="modal-title"
              level={4}
              weight="semibold"
              className="text-gray-900"
            >
              {title}
            </HeaderAtom>
            <ButtonAtom
              variant="icon"
              intent="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <CloseIcon />
            </ButtonAtom>
          </div>
        )}

        {/* Cuerpo con scroll interno */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Pie con acciones */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Ejemplos de uso:

   const [open, setOpen] = useState(false)

   // Modal básico con footer
   <ButtonAtom intent="primary" onClick={() => setOpen(true)}>
     Abrir modal
   </ButtonAtom>

   <Modal
     isOpen={open}
     onClose={() => setOpen(false)}
     title="Nuevo proyecto"
     footer={
       <>
         <ButtonAtom intent="ghost"   onClick={() => setOpen(false)}>Cancelar</ButtonAtom>
         <ButtonAtom intent="primary" onClick={handleCreate}>Crear</ButtonAtom>
       </>
     }
   >
     <Form gap="md">
       <InputForm id="proj-name" label="Nombre del proyecto" required />
       <InputForm id="proj-desc" label="Descripción" hint="Opcional" />
     </Form>
   </Modal>

   // Modal grande sin footer
   <Modal isOpen={open} onClose={() => setOpen(false)} title="Vista de diagrama" size="xl">
     <img src={diagram} alt="Diagrama completo" className="w-full rounded-md" />
   </Modal>

   // Modal sin título (sin cabecera)
   <Modal isOpen={open} onClose={() => setOpen(false)} size="sm">
     <div className="flex flex-col items-center gap-4 py-4">
       <TextAtom variant="text-md" className="text-gray-700 text-center">
         ¿Deseas continuar?
       </TextAtom>
     </div>
   </Modal>
---------------------------------------------------------------- */
