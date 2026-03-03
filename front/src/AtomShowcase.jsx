/**
 * AtomShowcase — Storybook de revisión para los @Atoms de ArchIA
 *
 * Cada sección muestra todas las variantes, estados y props de un átomo.
 * Los CheckboxAtom son interactivos (controlados con useState).
 */

import { useState } from 'react'

/* MUI Icons — usados en los demos de ButtonAtom */
import SendIcon         from '@mui/icons-material/Send'
import AddIcon          from '@mui/icons-material/Add'
import SearchIcon       from '@mui/icons-material/Search'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SettingsIcon     from '@mui/icons-material/Settings'
import DownloadIcon     from '@mui/icons-material/Download'
import CloseIcon        from '@mui/icons-material/Close'
import EditIcon         from '@mui/icons-material/Edit'

/* Atoms */
import TextAtom    from './components/atoms/TextAtom'
import HeaderAtom  from './components/atoms/HeaderAtom'
import LabelAtom   from './components/atoms/LabelAtom'
import InputAtom   from './components/atoms/InputAtom'
import ButtonAtom  from './components/atoms/ButtonAtom'
import CheckboxAtom from './components/atoms/CheckboxAtom'

/* ================================================================
   NAV — lista de secciones para el sidebar
================================================================ */
const NAV_ITEMS = [
  { id: 'text-atom',     label: 'TextAtom' },
  { id: 'header-atom',   label: 'HeaderAtom' },
  { id: 'label-atom',    label: 'LabelAtom' },
  { id: 'input-atom',    label: 'InputAtom' },
  { id: 'button-atom',   label: 'ButtonAtom' },
  { id: 'checkbox-atom', label: 'CheckboxAtom' },
]

/* ================================================================
   HELPERS DE PRESENTACIÓN
   Componentes internos del showcase — no forman parte del design
   system, solo sirven para estructurar la pantalla de revisión.
================================================================ */

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="block text-body-sm text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-md px-3 py-2 transition-colors duration-150"
    >
      {children}
    </a>
  )
}

/* Tarjeta contenedora de cada átomo */
function ShowcaseSection({ id, title, description, children }) {
  return (
    <section id={id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
      {/* Cabecera de la sección */}
      <div className="bg-gray-25 border-b border-gray-100 px-6 py-4 flex items-start justify-between gap-4">
        <div>
          <TextAtom variant="display-xs" weight="semibold" className="text-gray-900">
            {title}
          </TextAtom>
          {description && (
            <TextAtom variant="text-sm" className="text-gray-500 mt-1">
              {description}
            </TextAtom>
          )}
        </div>
        <span className="text-xs font-mono bg-brand-50 text-brand-700 rounded-md px-2 py-1 border border-brand-100 flex-shrink-0 mt-1">
          @atom
        </span>
      </div>
      {/* Contenido de la sección */}
      <div className="p-6 flex flex-col gap-8">
        {children}
      </div>
    </section>
  )
}

/* Grupo de variantes con separador con título */
function VariantGroup({ label, children, direction = 'row' }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Divisor con etiqueta centrada */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-100" />
        <TextAtom
          variant="text-xs"
          weight="semibold"
          as="span"
          className="text-gray-400 uppercase"
        >
          {label}
        </TextAtom>
        <div className="h-px flex-1 bg-gray-100" />
      </div>
      {/* Contenedor de items */}
      <div
        className={[
          'flex items-start gap-4',
          direction === 'col' ? 'flex-col' : 'flex-row flex-wrap',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  )
}

/* Item individual con su etiqueta de prop */
function ShowcaseItem({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      {label && (
        <code className="text-xs font-mono text-gray-400 bg-gray-50 border border-gray-200 rounded-sm px-1.5 py-0.5 w-fit">
          {label}
        </code>
      )}
      {children}
    </div>
  )
}

/* ================================================================
   SECCIÓN: TextAtom
================================================================ */
function TextAtomSection() {
  return (
    <ShowcaseSection
      id="text-atom"
      title="TextAtom"
      description="Componente polimórfico base de tipografía. Consume los tokens display-* y body-* de Figma a través de clases Tailwind."
    >
      <VariantGroup label="Escala Display" direction="col">
        {[
          'display-2xl', 'display-xl', 'display-lg',
          'display-md',  'display-sm', 'display-xs',
        ].map((v) => (
          <ShowcaseItem key={v} label={`variant="${v}" weight="semibold"`}>
            <TextAtom variant={v} weight="semibold" className="text-gray-900">
              ArchIA
            </TextAtom>
          </ShowcaseItem>
        ))}
      </VariantGroup>

      <VariantGroup label="Escala Body" direction="col">
        {[
          'text-xl', 'text-lg', 'text-md', 'text-sm', 'text-xs',
        ].map((v) => (
          <ShowcaseItem key={v} label={`variant="${v}"`}>
            <TextAtom variant={v} className="text-gray-700">
              Arquitectura inteligente para proyectos modernos — Generación de diagramas con IA
            </TextAtom>
          </ShowcaseItem>
        ))}
      </VariantGroup>

      <VariantGroup label="Pesos (weight)">
        {['regular', 'medium', 'semibold', 'bold'].map((w) => (
          <ShowcaseItem key={w} label={`weight="${w}"`}>
            <TextAtom variant="text-xl" weight={w} className="text-gray-800">
              Diseña con precisión
            </TextAtom>
          </ShowcaseItem>
        ))}
      </VariantGroup>

      <VariantGroup label="Familias tipográficas (family)" direction="col">
        <ShowcaseItem label='family="serif" → Roboto Serif'>
          <TextAtom variant="text-xl" weight="medium" family="serif" className="text-gray-800">
            El sereno fluir del diseño — The serene flow of design
          </TextAtom>
        </ShowcaseItem>
        <ShowcaseItem label='family="sans" → Roboto Mono'>
          <TextAtom variant="text-xl" weight="medium" family="sans" className="text-gray-800">
            El sereno fluir del diseño — The serene flow of design
          </TextAtom>
        </ShowcaseItem>
        <ShowcaseItem label='family="mono" → JetBrains Mono'>
          <TextAtom variant="text-xl" weight="medium" family="mono" className="text-gray-800">
            El sereno fluir del diseño — The serene flow of design
          </TextAtom>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Paleta de colores con tokens">
        {[
          { cls: 'text-brand-600',     lbl: 'text-brand-600'     },
          { cls: 'text-brand-800',     lbl: 'text-brand-800'     },
          { cls: 'text-secondary-500', lbl: 'text-secondary-500' },
          { cls: 'text-gray-500',      lbl: 'text-gray-500'      },
          { cls: 'text-gray-800',      lbl: 'text-gray-800'      },
          { cls: 'text-error-600',     lbl: 'text-error-600'     },
          { cls: 'text-success-600',   lbl: 'text-success-600'   },
          { cls: 'text-warning-600',   lbl: 'text-warning-600'   },
        ].map(({ cls, lbl }) => (
          <ShowcaseItem key={cls} label={lbl}>
            <TextAtom variant="text-md" weight="medium" className={cls}>
              Texto de ejemplo
            </TextAtom>
          </ShowcaseItem>
        ))}
      </VariantGroup>

      <VariantGroup label="Polimorfismo (as prop)">
        <ShowcaseItem label='as="h3" (explícito)'>
          <TextAtom variant="display-sm" weight="bold" as="h3" className="text-gray-900">
            Título explícito
          </TextAtom>
        </ShowcaseItem>
        <ShowcaseItem label='as="span"'>
          <TextAtom variant="text-sm" as="span" className="text-gray-600">
            Inline span
          </TextAtom>
        </ShowcaseItem>
        <ShowcaseItem label='as="code" + family="mono"'>
          <TextAtom
            variant="text-sm"
            family="mono"
            as="code"
            className="text-brand-700 bg-brand-50 px-2 py-1 rounded-sm"
          >
            npm run dev
          </TextAtom>
        </ShowcaseItem>
        <ShowcaseItem label='as="p" (default para body)'>
          <TextAtom variant="text-md" className="text-gray-700 max-w-xs">
            Párrafo con sangría automática al ser elemento de bloque.
          </TextAtom>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN: HeaderAtom
================================================================ */
function HeaderAtomSection() {
  return (
    <ShowcaseSection
      id="header-atom"
      title="HeaderAtom"
      description="Wrapper sobre TextAtom. Mapea level (1–6) a variant display y tag HTML semántico automáticamente. Sin lógica duplicada."
    >
      <VariantGroup label="Niveles de encabezado (level)" direction="col">
        {[1, 2, 3, 4, 5, 6].map((level) => {
          const variants = ['display-2xl', 'display-xl', 'display-lg', 'display-md', 'display-sm', 'display-xs']
          const tags     = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
          return (
            <ShowcaseItem
              key={level}
              label={`level={${level}} → <${tags[level - 1]}> + ${variants[level - 1]}`}
            >
              <HeaderAtom level={level} className="text-gray-900">
                ArchIA — Nivel {level}
              </HeaderAtom>
            </ShowcaseItem>
          )
        })}
      </VariantGroup>

      <VariantGroup label="Familias y pesos" direction="col">
        <ShowcaseItem label='level={1} weight="bold" family="serif"'>
          <HeaderAtom level={1} weight="bold" family="serif" className="text-gray-900">
            Arquitectura inteligente
          </HeaderAtom>
        </ShowcaseItem>
        <ShowcaseItem label='level={3} weight="medium" family="mono"'>
          <HeaderAtom level={3} weight="medium" family="mono" className="text-brand-700">
            generate_diagram()
          </HeaderAtom>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Colores con tokens">
        <ShowcaseItem label="text-gray-900">
          <HeaderAtom level={4} className="text-gray-900">Análisis de requisitos</HeaderAtom>
        </ShowcaseItem>
        <ShowcaseItem label="text-brand-700">
          <HeaderAtom level={4} className="text-brand-700">Análisis de requisitos</HeaderAtom>
        </ShowcaseItem>
        <ShowcaseItem label="text-secondary-600">
          <HeaderAtom level={4} className="text-secondary-600">Análisis de requisitos</HeaderAtom>
        </ShowcaseItem>
        <ShowcaseItem label="text-gray-500">
          <HeaderAtom level={4} className="text-gray-500">Análisis de requisitos</HeaderAtom>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN: LabelAtom
================================================================ */
function LabelAtomSection() {
  return (
    <ShowcaseSection
      id="label-atom"
      title="LabelAtom"
      description="Etiqueta semántica <label> para formularios. Soporte de asterisco de campo requerido con aria-hidden para accesibilidad."
    >
      <VariantGroup label="Variantes base">
        <ShowcaseItem label="Default">
          <LabelAtom htmlFor="demo-default">Correo electrónico</LabelAtom>
        </ShowcaseItem>
        <ShowcaseItem label='required={true}'>
          <LabelAtom htmlFor="demo-required" required>Nombre completo</LabelAtom>
        </ShowcaseItem>
        <ShowcaseItem label="className personalizado">
          <LabelAtom htmlFor="demo-custom" className="text-brand-700">
            Organización
          </LabelAtom>
        </ShowcaseItem>
        <ShowcaseItem label="required + className">
          <LabelAtom htmlFor="demo-both" required className="text-gray-900">
            Contraseña
          </LabelAtom>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="En contexto — LabelAtom + InputAtom" direction="col">
        <ShowcaseItem label="Campo simple">
          <div className="flex flex-col gap-1.5 w-80">
            <LabelAtom htmlFor="ctx-email" required>Correo electrónico</LabelAtom>
            <InputAtom id="ctx-email" type="email" placeholder="tu@empresa.com" fullWidth />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label="Campo en estado error">
          <div className="flex flex-col gap-1.5 w-80">
            <LabelAtom htmlFor="ctx-err" required>Contraseña</LabelAtom>
            <InputAtom id="ctx-err" type="password" state="error" defaultValue="abc" fullWidth />
            <TextAtom variant="text-xs" className="text-error-600">
              La contraseña debe tener mínimo 8 caracteres.
            </TextAtom>
          </div>
        </ShowcaseItem>
        <ShowcaseItem label="Campo deshabilitado">
          <div className="flex flex-col gap-1.5 w-80">
            <LabelAtom htmlFor="ctx-dis">Nombre de usuario</LabelAtom>
            <InputAtom id="ctx-dis" disabled defaultValue="archia_user_01" fullWidth />
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN: InputAtom
================================================================ */
function InputAtomSection() {
  return (
    <ShowcaseSection
      id="input-atom"
      title="InputAtom"
      description="Campo de texto base. Tres ejes ortogonales: size (sm / md / lg), state (default / error / disabled) y fullWidth."
    >
      <VariantGroup label="Tamaños (size)">
        <ShowcaseItem label='size="sm"'>
          <InputAtom size="sm" placeholder="Small — 14px" />
        </ShowcaseItem>
        <ShowcaseItem label='size="md" (default)'>
          <InputAtom size="md" placeholder="Medium — 16px" />
        </ShowcaseItem>
        <ShowcaseItem label='size="lg"'>
          <InputAtom size="lg" placeholder="Large — 18px" />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Estados (state)">
        <ShowcaseItem label='state="default"'>
          <InputAtom placeholder="Escribe aquí" defaultValue="Valor de ejemplo" />
        </ShowcaseItem>
        <ShowcaseItem label='state="error"'>
          <InputAtom state="error" defaultValue="Dirección inválida" />
        </ShowcaseItem>
        <ShowcaseItem label="disabled (prop nativo)">
          <InputAtom disabled defaultValue="Campo bloqueado" />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Ancho completo (fullWidth)" direction="col">
        <ShowcaseItem label='fullWidth={true} size="md"'>
          <InputAtom fullWidth placeholder="Este input ocupa el 100% del contenedor padre" />
        </ShowcaseItem>
        <ShowcaseItem label='fullWidth size="lg" state="error"'>
          <InputAtom fullWidth size="lg" state="error" defaultValue="URL de repositorio inválida" />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Tipos de input nativos (type)">
        <ShowcaseItem label='type="email"'>
          <InputAtom type="email" placeholder="usuario@email.com" />
        </ShowcaseItem>
        <ShowcaseItem label='type="password"'>
          <InputAtom type="password" defaultValue="contraseña123" />
        </ShowcaseItem>
        <ShowcaseItem label='type="search"'>
          <InputAtom type="search" placeholder="Buscar proyectos…" />
        </ShowcaseItem>
        <ShowcaseItem label='type="number"'>
          <InputAtom type="number" placeholder="0" style={{ width: '100px' }} />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Combinaciones size × state">
        <ShowcaseItem label='sm + error'>
          <InputAtom size="sm" state="error" placeholder="Error pequeño" />
        </ShowcaseItem>
        <ShowcaseItem label='md + default'>
          <InputAtom size="md" placeholder="Mediano default" />
        </ShowcaseItem>
        <ShowcaseItem label='lg + disabled'>
          <InputAtom size="lg" disabled defaultValue="Grande deshabilitado" />
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN: ButtonAtom
================================================================ */
function ButtonAtomSection() {
  return (
    <ShowcaseSection
      id="button-atom"
      title="ButtonAtom"
      description="Botón polimórfico. 3 variantes de layout (text / icon / text-icon) × 4 intents (primary / secondary / ghost / danger) × 3 tamaños (sm / md / lg)."
    >
      {/* ── Intents ── */}
      <VariantGroup label='Intents — variant="text" size="md"'>
        <ShowcaseItem label='intent="primary"'>
          <ButtonAtom intent="primary">Crear proyecto</ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='intent="secondary"'>
          <ButtonAtom intent="secondary">Cancelar</ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='intent="ghost"'>
          <ButtonAtom intent="ghost">Ver más</ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='intent="danger"'>
          <ButtonAtom intent="danger">Eliminar</ButtonAtom>
        </ShowcaseItem>
      </VariantGroup>

      {/* ── Tamaños ── */}
      <VariantGroup label='Tamaños (size) — intent="primary" variant="text"'>
        <ShowcaseItem label='size="sm"'>
          <ButtonAtom intent="primary" size="sm">Acción pequeña</ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='size="md" (default)'>
          <ButtonAtom intent="primary" size="md">Acción mediana</ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='size="lg"'>
          <ButtonAtom intent="primary" size="lg">Acción grande</ButtonAtom>
        </ShowcaseItem>
      </VariantGroup>

      {/* ── Icon only ── */}
      <VariantGroup label='variant="icon" — cuadrado, solo icono'>
        <ShowcaseItem label='intent="primary"'>
          <ButtonAtom variant="icon" intent="primary" aria-label="Agregar">
            <AddIcon />
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='intent="secondary"'>
          <ButtonAtom variant="icon" intent="secondary" aria-label="Buscar">
            <SearchIcon />
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='intent="ghost"'>
          <ButtonAtom variant="icon" intent="ghost" aria-label="Configurar">
            <SettingsIcon />
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='intent="danger"'>
          <ButtonAtom variant="icon" intent="danger" aria-label="Eliminar">
            <DeleteOutlineIcon />
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='size="sm"'>
          <ButtonAtom variant="icon" intent="ghost" size="sm" aria-label="Cerrar">
            <CloseIcon />
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='size="md"'>
          <ButtonAtom variant="icon" intent="primary" size="md" aria-label="Descargar">
            <DownloadIcon />
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='size="lg"'>
          <ButtonAtom variant="icon" intent="secondary" size="lg" aria-label="Editar">
            <EditIcon />
          </ButtonAtom>
        </ShowcaseItem>
      </VariantGroup>

      {/* ── Text + Icon ── */}
      <VariantGroup label='variant="text-icon" — texto con icono'>
        <ShowcaseItem label='iconPosition="leading" intent="primary"'>
          <ButtonAtom variant="text-icon" intent="primary" icon={<SendIcon />}>
            Enviar mensaje
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='iconPosition="trailing" intent="ghost"'>
          <ButtonAtom
            variant="text-icon"
            intent="ghost"
            iconPosition="trailing"
            icon={<ChevronRightIcon />}
          >
            Ver proyectos
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='intent="secondary" + icono'>
          <ButtonAtom variant="text-icon" intent="secondary" icon={<EditIcon />}>
            Editar
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='intent="danger" + icono'>
          <ButtonAtom variant="text-icon" intent="danger" icon={<DeleteOutlineIcon />}>
            Eliminar proyecto
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='size="sm" intent="primary"'>
          <ButtonAtom variant="text-icon" intent="primary" size="sm" icon={<AddIcon />}>
            Agregar
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='size="lg" intent="secondary"'>
          <ButtonAtom variant="text-icon" intent="secondary" size="lg" icon={<DownloadIcon />}>
            Descargar reporte
          </ButtonAtom>
        </ShowcaseItem>
      </VariantGroup>

      {/* ── Disabled ── */}
      <VariantGroup label="Estado disabled — todas las variantes">
        <ShowcaseItem label='text + primary + disabled'>
          <ButtonAtom intent="primary" disabled>Procesando…</ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='text + secondary + disabled'>
          <ButtonAtom intent="secondary" disabled>No disponible</ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='text + ghost + disabled'>
          <ButtonAtom intent="ghost" disabled>Sin acceso</ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='icon + primary + disabled'>
          <ButtonAtom variant="icon" intent="primary" disabled aria-label="Agregar">
            <AddIcon />
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='text-icon + primary + disabled'>
          <ButtonAtom variant="text-icon" intent="primary" icon={<SendIcon />} disabled>
            Enviando…
          </ButtonAtom>
        </ShowcaseItem>
      </VariantGroup>

      {/* ── Polimorfismo ── */}
      <VariantGroup label='Polimorfismo (as) — renderizado como otro elemento HTML'>
        <ShowcaseItem label='as="a" intent="ghost" → enlace de navegación'>
          <ButtonAtom
            as="a"
            href="#top"
            intent="ghost"
            variant="text-icon"
            iconPosition="trailing"
            icon={<ChevronRightIcon />}
          >
            Volver al inicio
          </ButtonAtom>
        </ShowcaseItem>
        <ShowcaseItem label='as="a" intent="primary" → CTA tipo enlace'>
          <ButtonAtom as="a" href="#button-atom" intent="primary">
            Ancla interna
          </ButtonAtom>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN: CheckboxAtom
================================================================ */
function CheckboxAtomSection() {
  /* Estados individuales */
  const [basic,  setBasic]  = useState(false)
  const [terms,  setTerms]  = useState(true)

  /* Patrón Select All */
  const [items, setItems] = useState([false, true, false])
  const allChecked  = items.every(Boolean)
  const someChecked = items.some(Boolean)

  const toggleAll  = () => setItems(items.map(() => !allChecked))
  const toggleItem = (i) => {
    const next = [...items]
    next[i] = !next[i]
    setItems(next)
  }

  return (
    <ShowcaseSection
      id="checkbox-atom"
      title="CheckboxAtom"
      description="Checkbox con overlay Tailwind peer. Input nativo opacity-0 pero completamente interactivo. Soporta checked, indeterminate y disabled. Recomendado: siempre controlado."
    >
      <VariantGroup label="Estados base (interactivos — haz click)">
        <ShowcaseItem label="unchecked → checked al hacer click">
          <CheckboxAtom
            checked={basic}
            onChange={(e) => setBasic(e.target.checked)}
            label="Opción desmarcada"
          />
        </ShowcaseItem>
        <ShowcaseItem label="checked → unchecked al hacer click">
          <CheckboxAtom
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            label="Acepto los términos"
          />
        </ShowcaseItem>
        <ShowcaseItem label="disabled + unchecked">
          <CheckboxAtom
            checked={false}
            onChange={() => {}}
            disabled
            label="No disponible"
          />
        </ShowcaseItem>
        <ShowcaseItem label="disabled + checked">
          <CheckboxAtom
            checked={true}
            onChange={() => {}}
            disabled
            label="Opción bloqueada activa"
          />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Estado indeterminate — patrón Select All" direction="col">
        <ShowcaseItem label="Seleccionar todos / algunos (interactivo)">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col gap-3 w-72">
            {/* Master checkbox */}
            <CheckboxAtom
              checked={allChecked}
              indeterminate={someChecked && !allChecked}
              onChange={toggleAll}
              label="Seleccionar todos los proyectos"
            />
            {/* Divider */}
            <div className="border-t border-gray-200" />
            {/* Child checkboxes */}
            <div className="flex flex-col gap-2 pl-2">
              {['Proyecto Alpha', 'Proyecto Beta', 'Proyecto Gamma'].map((name, i) => (
                <CheckboxAtom
                  key={name}
                  checked={items[i]}
                  onChange={() => toggleItem(i)}
                  label={name}
                />
              ))}
            </div>
          </div>
        </ShowcaseItem>

        {/* Estado forzado para ver el visual estático */}
        <ShowcaseItem label="indeterminate={true} — visual estático (no interactivo)">
          <CheckboxAtom
            checked={false}
            indeterminate={true}
            onChange={() => {}}
            label="Algunos seleccionados (forzado)"
          />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Con contenido rico (children en lugar de label)">
        <ShowcaseItem label="children con enlace">
          <CheckboxAtom
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          >
            Acepto la{' '}
            <a href="#checkbox-atom" className="text-brand-600 underline hover:text-brand-700">
              política de privacidad
            </a>
            {' '}y los{' '}
            <a href="#checkbox-atom" className="text-brand-600 underline hover:text-brand-700">
              términos de servicio
            </a>
          </CheckboxAtom>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Sin etiqueta — solo el control visual">
        <ShowcaseItem label="aria-label para accesibilidad del lector de pantalla">
          <CheckboxAtom
            checked={basic}
            onChange={(e) => setBasic(e.target.checked)}
            aria-label="Seleccionar fila"
          />
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   COMPONENTE PRINCIPAL: AtomShowcase
================================================================ */
export default function AtomShowcase({ onNavigate }) {
  return (
    <div id="top" className="min-h-screen bg-gray-50">

      {/* ── Barra superior ── */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-xs h-16 flex items-center px-8 gap-4">
        <div className="flex items-baseline gap-2">
          <TextAtom variant="display-xs" weight="bold" family="serif" className="text-brand-700">
            ArchIA
          </TextAtom>
          <TextAtom variant="text-xs" weight="medium" as="span" className="text-gray-400">
            Design System
          </TextAtom>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <TextAtom variant="text-xs" as="span" className="text-gray-500">
          @Atoms — Storybook de revisión
        </TextAtom>
        <div className="ml-auto flex items-center gap-3">
          <ButtonAtom
            as="button"
            intent="ghost"
            size="sm"
            onClick={() => onNavigate?.('molecules')}
          >
            Ver Moléculas →
          </ButtonAtom>
          <span className="text-xs font-mono text-gray-400">v0.1 · Atomic Design + Tailwind CSS v4</span>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto flex">

        {/* ── Sidebar nav ── */}
        <aside className="w-56 flex-shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 bg-white">
          <nav className="p-4 flex flex-col gap-1">
            <TextAtom
              variant="text-xs"
              weight="semibold"
              as="p"
              className="text-gray-400 uppercase px-3 pt-2 pb-3"
            >
              Átomos
            </TextAtom>
            {NAV_ITEMS.map(({ id, label }) => (
              <NavLink key={id} href={`#${id}`}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Info de tokens al pie del sidebar */}
          <div className="border-t border-gray-100 p-4">
            <TextAtom variant="text-xs" className="text-gray-400 mb-2" weight="semibold">
              Tokens disponibles
            </TextAtom>
            {[
              'gray · 25–900',
              'brand · 25–900',
              'secondary · 25–900',
              'error / warning / success',
              'display-{2xl…xs}',
              'body-{xl…xs}',
              'shadow-{xs…3xl}',
              'rounded-{sm|md|lg|full}',
            ].map((t) => (
              <div key={t} className="flex items-start gap-1.5 mb-1">
                <div className="w-1 h-1 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                <TextAtom variant="text-xs" as="span" className="text-gray-400 font-sans">
                  {t}
                </TextAtom>
              </div>
            ))}
            <div className="mt-3">
              <ButtonAtom
                intent="ghost"
                size="sm"
                onClick={() => onNavigate?.('molecules')}
                className="w-full justify-center text-xs"
              >
                Ver Moléculas →
              </ButtonAtom>
            </div>
          </div>
        </aside>

        {/* ── Contenido principal ── */}
        <main className="flex-1 p-8 flex flex-col gap-8 min-w-0">
          <TextAtomSection />
          <HeaderAtomSection />
          <LabelAtomSection />
          <InputAtomSection />
          <ButtonAtomSection />
          <CheckboxAtomSection />

          {/* Footer */}
          <footer className="border-t border-gray-200 pt-6 pb-10 text-center">
            <TextAtom variant="text-xs" className="text-gray-400">
              ArchIA Design System — @Atoms · Atomic Design + Tailwind CSS v4 + React 19
            </TextAtom>
          </footer>
        </main>

      </div>
    </div>
  )
}
