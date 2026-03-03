/**
 * MoleculeShowcase — Storybook de revisión para las @Molecules de ArchIA
 *
 * Cada sección muestra todas las variantes, estados y props de una molécula.
 * Los componentes interactivos (Table, Modal, AlertDialog, Chips, ChatHistory,
 * Sidebar) usan useState local para demos funcionales.
 *
 * Props:
 *   onNavigate — function('atoms')   Callback para volver al storybook de átomos
 */

import { useState } from 'react'

/* MUI Icons */
import AddIcon          from '@mui/icons-material/Add'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import ChatIcon         from '@mui/icons-material/Chat'
import FolderOpenIcon   from '@mui/icons-material/FolderOpen'
import HomeIcon         from '@mui/icons-material/Home'
import SettingsIcon     from '@mui/icons-material/Settings'
import LogoutIcon       from '@mui/icons-material/Logout'
import SmartToyIcon     from '@mui/icons-material/SmartToy'
import StarIcon         from '@mui/icons-material/Star'
import EditIcon         from '@mui/icons-material/Edit'
import CodeIcon         from '@mui/icons-material/Code'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SendIcon         from '@mui/icons-material/Send'
import StorageIcon      from '@mui/icons-material/Storage'

/* Atoms */
import TextAtom    from './components/atoms/TextAtom'
import ButtonAtom  from './components/atoms/ButtonAtom'

/* Molecules */
import SectionHeader from './components/molecules/SectionHeader'
import InputForm     from './components/molecules/InputForm'
import Form          from './components/molecules/Form'
import Chips         from './components/molecules/Chips'
import Column        from './components/molecules/Column'
import Cards         from './components/molecules/Cards'
import ChatHistory   from './components/molecules/ChatHistory'
import BubbleMessage from './components/molecules/BubbleMessage'
import DropzoneFile  from './components/molecules/DropzoneFile'
import MessageInput  from './components/molecules/MessageInput'
import Sidebar       from './components/molecules/Sidebar'
import RowTable      from './components/molecules/RowTable'
import Table         from './components/molecules/Table'
import Modal         from './components/molecules/Modal'
import AlertDialog   from './components/molecules/AlertDialog'

/* ================================================================
   NAV — lista de secciones para el sidebar
================================================================ */
const NAV_ITEMS = [
  { id: 'section-header', label: 'SectionHeader' },
  { id: 'input-form',     label: 'InputForm'     },
  { id: 'form',           label: 'Form'          },
  { id: 'chips',          label: 'Chips'         },
  { id: 'column',         label: 'Column'        },
  { id: 'cards',          label: 'Cards'         },
  { id: 'chat-history',   label: 'ChatHistory'   },
  { id: 'bubble-message', label: 'BubbleMessage' },
  { id: 'dropzone-file',  label: 'DropzoneFile'  },
  { id: 'message-input',  label: 'MessageInput'  },
  { id: 'sidebar',        label: 'Sidebar'       },
  { id: 'row-table',      label: 'RowTable'      },
  { id: 'table',          label: 'Table'         },
  { id: 'modal',          label: 'Modal'         },
  { id: 'alert-dialog',   label: 'AlertDialog'   },
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

/* Tarjeta contenedora de cada molécula */
function ShowcaseSection({ id, title, description, children }) {
  return (
    <section id={id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden scroll-mt-20">
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
        <span className="text-xs font-mono bg-secondary-50 text-secondary-700 rounded-md px-2 py-1 border border-secondary-100 flex-shrink-0 mt-1">
          @molecule
        </span>
      </div>
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
   SECCIÓN 1: SectionHeader
================================================================ */
function SectionHeaderSection() {
  return (
    <ShowcaseSection
      id="section-header"
      title="SectionHeader"
      description="Cabecera de sección: título + subtítulo opcional + slot de acción alineado a la derecha. Compone HeaderAtom + TextAtom."
    >
      <VariantGroup label="Variantes base" direction="col">
        <ShowcaseItem label='title solo'>
          <div className="w-full max-w-2xl p-4 bg-gray-50 rounded-lg">
            <SectionHeader title="Proyectos recientes" />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='title + subtitle'>
          <div className="w-full max-w-2xl p-4 bg-gray-50 rounded-lg">
            <SectionHeader
              title="Proyectos recientes"
              subtitle="Tus últimos 10 proyectos de arquitectura"
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='title + subtitle + action'>
          <div className="w-full max-w-2xl p-4 bg-gray-50 rounded-lg">
            <SectionHeader
              title="Proyectos recientes"
              subtitle="Tus últimos 10 proyectos de arquitectura"
              action={
                <ButtonAtom variant="text-icon" intent="primary" size="sm" icon={<AddIcon />}>
                  Nuevo proyecto
                </ButtonAtom>
              }
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Niveles de heading (level)" direction="col">
        <ShowcaseItem label='level={1} → h1 + display-2xl'>
          <div className="max-w-2xl p-4 bg-gray-50 rounded-lg">
            <SectionHeader level={1} title="Panel de control" subtitle="Gestiona tus proyectos y conversaciones" />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='level={3} → h3 + display-lg'>
          <div className="max-w-2xl p-4 bg-gray-50 rounded-lg">
            <SectionHeader level={3} title="Microservicios" subtitle="Vista de componentes del sistema" />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='level={4} (default=2) → h4 + display-md'>
          <div className="max-w-2xl p-4 bg-gray-50 rounded-lg">
            <SectionHeader level={4} title="Configuración del proyecto" />
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Acciones en slot derecho">
        <ShowcaseItem label='action con ButtonAtom ghost'>
          <div className="w-80 p-4 bg-gray-50 rounded-lg">
            <SectionHeader
              level={3}
              title="Historial"
              action={<ButtonAtom intent="ghost" size="sm">Ver todo</ButtonAtom>}
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='action con botón icon'>
          <div className="w-80 p-4 bg-gray-50 rounded-lg">
            <SectionHeader
              level={3}
              title="Diagrama"
              action={
                <ButtonAtom variant="icon" intent="ghost" size="sm" aria-label="Editar">
                  <EditIcon />
                </ButtonAtom>
              }
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 2: InputForm
================================================================ */
function InputFormSection() {
  return (
    <ShowcaseSection
      id="input-form"
      title="InputForm"
      description="Unidad mínima de formulario: LabelAtom + InputAtom + mensaje de error o hint. Estado derivado automáticamente del prop error/disabled."
    >
      <VariantGroup label="Variantes base" direction="col">
        <ShowcaseItem label="Default (label + input)">
          <div className="w-80">
            <InputForm id="if-default" label="Nombre del proyecto" placeholder="Ej: Microservicios Alpha" />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='required={true} — asterisco en la etiqueta'>
          <div className="w-80">
            <InputForm id="if-req" label="Correo electrónico" type="email" placeholder="tu@empresa.com" required />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='hint — texto de ayuda bajo el campo'>
          <div className="w-80">
            <InputForm
              id="if-hint"
              label="URL del repositorio"
              type="url"
              placeholder="https://github.com/..."
              hint="Solo repositorios públicos son compatibles."
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='error — fuerza state="error" en el input'>
          <div className="w-80">
            <InputForm
              id="if-err"
              label="URL del repositorio"
              type="url"
              defaultValue="http://github.com/..."
              error="La URL debe comenzar con https://"
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='disabled={true}'>
          <div className="w-80">
            <InputForm
              id="if-dis"
              label="Usuario"
              disabled
              defaultValue="archia_user_01"
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Tamaños (size)">
        <ShowcaseItem label='size="sm"'>
          <InputForm id="if-sm" label="Pequeño" size="sm" placeholder="Small input" className="w-64" />
        </ShowcaseItem>
        <ShowcaseItem label='size="md" (default)'>
          <InputForm id="if-md" label="Mediano" size="md" placeholder="Medium input" className="w-64" />
        </ShowcaseItem>
        <ShowcaseItem label='size="lg"'>
          <InputForm id="if-lg" label="Grande" size="lg" placeholder="Large input" className="w-64" />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Sin label (aria-label para accesibilidad)" direction="col">
        <ShowcaseItem label="Buscador sin label visible">
          <div className="w-80">
            <InputForm
              id="if-search"
              placeholder="Buscar proyectos…"
              aria-label="Buscador de proyectos"
              size="sm"
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 3: Form
================================================================ */
function FormSection() {
  return (
    <ShowcaseSection
      id="form"
      title="Form"
      description="Contenedor semántico <form>. Gestiona e.preventDefault() + prop onSubmit. El espaciado entre campos se controla con gap (sm/md/lg)."
    >
      <VariantGroup label="Espaciado entre campos (gap)">
        <ShowcaseItem label='gap="sm" — gap-3 (12px)'>
          <div className="w-72 p-4 bg-gray-50 rounded-lg">
            <Form gap="sm">
              <InputForm id="fsm-name" label="Nombre" placeholder="Juan" />
              <InputForm id="fsm-mail" label="Correo" type="email" placeholder="juan@..." />
            </Form>
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='gap="md" (default) — gap-4 (16px)'>
          <div className="w-72 p-4 bg-gray-50 rounded-lg">
            <Form gap="md">
              <InputForm id="fmd-name" label="Nombre" placeholder="Juan" />
              <InputForm id="fmd-mail" label="Correo" type="email" placeholder="juan@..." />
            </Form>
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='gap="lg" — gap-6 (24px)'>
          <div className="w-72 p-4 bg-gray-50 rounded-lg">
            <Form gap="lg">
              <InputForm id="flg-name" label="Nombre" placeholder="Juan" />
              <InputForm id="flg-mail" label="Correo" type="email" placeholder="juan@..." />
            </Form>
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Formulario completo con submit" direction="col">
        <ShowcaseItem label="Formulario de login — gap=md + botón submit">
          <div className="w-80 p-5 bg-gray-50 rounded-lg border border-gray-200">
            <Form gap="md" onSubmit={() => {}}>
              <InputForm id="flog-email" label="Correo electrónico" type="email" placeholder="tu@empresa.com" required />
              <InputForm id="flog-pass" label="Contraseña" type="password" placeholder="••••••••" required />
              <ButtonAtom intent="primary" type="submit" className="w-full justify-center">
                Iniciar sesión
              </ButtonAtom>
            </Form>
          </div>
        </ShowcaseItem>
        <ShowcaseItem label="Formulario de proyecto — gap=lg + 3 campos">
          <div className="w-80 p-5 bg-gray-50 rounded-lg border border-gray-200">
            <Form gap="lg">
              <InputForm id="fproj-name" label="Nombre del proyecto" placeholder="Alpha v2" required />
              <InputForm
                id="fproj-url"
                label="URL del repositorio"
                type="url"
                placeholder="https://github.com/..."
                hint="Solo repositorios públicos."
              />
              <InputForm
                id="fproj-err"
                label="Token de acceso"
                type="password"
                error="Token inválido o expirado"
                defaultValue="tok_abc..."
              />
            </Form>
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 4: Chips
================================================================ */
function ChipsSection() {
  /* Demo de filtros seleccionables */
  const FILTER_OPTIONS = ['Todos', 'React', 'Node.js', 'Docker', 'PostgreSQL', 'TypeScript']
  const [activeFilters, setActiveFilters] = useState(new Set(['React']))
  const toggleFilter = (f) =>
    setActiveFilters((prev) => {
      const next = new Set(prev)
      next.has(f) ? next.delete(f) : next.add(f)
      return next
    })

  /* Demo de chips removibles */
  const [tags, setTags] = useState(['arquia-v2', 'microservicios', 'diagrama', 'DDD'])
  const removeTag = (tag) => setTags((prev) => prev.filter((t) => t !== tag))

  return (
    <ShowcaseSection
      id="chips"
      title="Chips"
      description="Badge / tag versátil. Funciona como etiqueta estática, chip de filtro seleccionable o chip removible. 6 variantes semánticas × 2 tamaños."
    >
      <VariantGroup label="Variantes (variant) — estáticas">
        {['default', 'brand', 'success', 'warning', 'error', 'secondary'].map((v) => (
          <ShowcaseItem key={v} label={`variant="${v}"`}>
            <Chips label={v.charAt(0).toUpperCase() + v.slice(1)} variant={v} />
          </ShowcaseItem>
        ))}
      </VariantGroup>

      <VariantGroup label="Tamaños (size)">
        <ShowcaseItem label='size="sm"'>
          <div className="flex gap-2 flex-wrap">
            {['default', 'brand', 'success', 'warning', 'error', 'secondary'].map((v) => (
              <Chips key={v} label={v} variant={v} size="sm" />
            ))}
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='size="md" (default)'>
          <div className="flex gap-2 flex-wrap">
            {['default', 'brand', 'success', 'warning', 'error', 'secondary'].map((v) => (
              <Chips key={v} label={v} variant={v} size="md" />
            ))}
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Chip con icono (icon prop)">
        <ShowcaseItem label='icon={<StarIcon />} variant="warning"'>
          <Chips label="Favorito" variant="warning" icon={<StarIcon />} />
        </ShowcaseItem>
        <ShowcaseItem label='icon={<CodeIcon />} variant="brand" size="sm"'>
          <Chips label="TypeScript" variant="brand" icon={<CodeIcon />} size="sm" />
        </ShowcaseItem>
        <ShowcaseItem label='icon + size="sm" — stack de tecnologías'>
          <div className="flex gap-1.5 flex-wrap">
            <Chips label="React"      variant="brand"     icon={<CodeIcon />} size="sm" />
            <Chips label="Node.js"    variant="success"   icon={<StorageIcon />} size="sm" />
            <Chips label="Docker"     variant="secondary" size="sm" />
            <Chips label="AWS"        variant="warning"   size="sm" />
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Estado selected (visual)">
        <ShowcaseItem label='selected={false} — normal'>
          <Chips label="Microservicios" variant="brand" />
        </ShowcaseItem>
        <ShowcaseItem label='selected={true} — fondo más oscuro'>
          <Chips label="Microservicios" variant="brand" selected />
        </ShowcaseItem>
        <ShowcaseItem label='disabled={true}'>
          <Chips label="No disponible" variant="default" disabled />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Chips de filtro — interactivos (haz click)" direction="col">
        <ShowcaseItem label="onClick + selected → patrón multi-filtro">
          <div className="flex gap-2 flex-wrap">
            {FILTER_OPTIONS.map((f) => (
              <Chips
                key={f}
                label={f}
                variant="brand"
                size="sm"
                selected={activeFilters.has(f)}
                onClick={() => toggleFilter(f)}
              />
            ))}
          </div>
          <TextAtom variant="text-xs" className="text-gray-400 mt-1">
            Activos: {activeFilters.size === 0 ? 'ninguno' : [...activeFilters].join(', ')}
          </TextAtom>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Chips removibles — interactivos (haz click en ×)" direction="col">
        <ShowcaseItem label="removable + onRemove → tags añadidos">
          <div className="flex gap-2 flex-wrap min-h-[32px]">
            {tags.length === 0 ? (
              <TextAtom variant="text-xs" className="text-gray-400">Sin tags</TextAtom>
            ) : (
              tags.map((tag) => (
                <Chips
                  key={tag}
                  label={tag}
                  variant="secondary"
                  removable
                  onRemove={() => removeTag(tag)}
                />
              ))
            )}
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 5: Column
================================================================ */
function ColumnSection() {
  const [sortDir, setSortDir] = useState('asc')
  const cycleSort = () => setSortDir((d) => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc')

  return (
    <ShowcaseSection
      id="column"
      title="Column"
      description="Celda de encabezado de tabla (<th>). Sortable con indicadores Unicode ↑↓↕. Soporta align y width. Debe usarse dentro de <thead><tr>."
    >
      <VariantGroup label="Columnas no sortables (variantes de align)" direction="col">
        <ShowcaseItem label='align="left" (default) / align="center" / align="right"'>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Column label="Nombre del proyecto" />
                  <Column label="Estado" align="center" width="120px" />
                  <Column label="Fecha" align="right" width="110px" />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-body-sm text-gray-400 border-b border-gray-100">
                    (datos de RowTable van aquí)
                  </td>
                  <td className="px-4 py-3 text-center text-body-sm text-gray-400 border-b border-gray-100">—</td>
                  <td className="px-4 py-3 text-right text-body-sm text-gray-400 border-b border-gray-100">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Columnas sortables (sortDirection + onSort)" direction="col">
        <ShowcaseItem label='sortable — haz click en "Nombre" para ciclar asc → desc → null'>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Column label="Nombre" sortable sortDirection={sortDir} onSort={cycleSort} />
                  <Column label="Proyecto" sortable sortDirection={null} />
                  <Column label="Estado" align="center" width="120px" />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-body-sm text-gray-400 border-b border-gray-100">
                    sortDirection actual: <code className="font-mono">{sortDir ?? 'null'}</code>
                  </td>
                  <td className="px-4 py-3 text-body-sm text-gray-400 border-b border-gray-100">↕ inactivo</td>
                  <td className="px-4 py-3 text-center text-body-sm text-gray-400 border-b border-gray-100">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ShowcaseItem>

        <ShowcaseItem label='sortDirection="asc" — ↑ en azul | sortDirection="desc" — ↓ en azul'>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Column label='Asc (↑)'  sortable sortDirection="asc"  />
                  <Column label='Desc (↓)' sortable sortDirection="desc" />
                  <Column label='Null (↕)' sortable sortDirection={null} />
                </tr>
              </thead>
            </table>
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 6: Cards
================================================================ */
function CardsSection() {
  return (
    <ShowcaseSection
      id="cards"
      title="Cards"
      description="Tarjeta de contenido con 3 sub-layouts: titled (banda de gradiente), text (solo contenido) e image (imagen aspect-video + fallback). Prop onClick hace la tarjeta clicable."
    >
      <VariantGroup label='variant="titled" — banda de gradiente brand + icono'>
        <ShowcaseItem label="Con icono + tag + description + actions">
          <div className="w-64">
            <Cards
              variant="titled"
              title="Microservicios"
              description="Patrón de arquitectura distribuida basado en servicios independientes."
              icon={<ArchitectureIcon />}
              tag="Patrón"
              actions={
                <ButtonAtom intent="secondary" size="sm">Ver más</ButtonAtom>
              }
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label="Con icono, sin tag — clicable">
          <div className="w-56">
            <Cards
              variant="titled"
              title="Generación de código"
              description="Exporta tu diagrama como boilerplate de microservicio."
              icon={<CodeIcon />}
              onClick={() => {}}
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label="Solo tag, sin icono">
          <div className="w-56">
            <Cards
              variant="titled"
              title="Event Sourcing"
              tag="Avanzado"
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label='variant="text" — solo contenido textual'>
        <ShowcaseItem label="Con tag + title + description + actions">
          <div className="w-64">
            <Cards
              variant="text"
              tag="Tutorial"
              title="Introducción a Domain-Driven Design"
              description="Aprende los principios fundamentales del DDD y cómo aplicarlos a proyectos reales."
              actions={<ButtonAtom intent="ghost" size="sm">Leer →</ButtonAtom>}
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label="Sin tag, clicable">
          <div className="w-56">
            <Cards
              variant="text"
              title="Arquitectura hexagonal"
              description="Aísla el núcleo de negocio de los detalles de infraestructura."
              onClick={() => {}}
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label="Solo título">
          <div className="w-48">
            <Cards variant="text" title="CQRS Pattern" />
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label='variant="image" — imagen aspect-video + fallback letra'>
        <ShowcaseItem label="Sin image → fallback gradiente con inicial">
          <div className="w-64">
            <Cards
              variant="image"
              title="Proyecto E-commerce"
              description="Arquitectura de microservicios con API Gateway y servicio de autenticación."
              tag="En progreso"
              actions={<ButtonAtom intent="ghost" size="sm">Abrir</ButtonAtom>}
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label="Sin image, clicable — hover:shadow-md">
          <div className="w-56">
            <Cards
              variant="image"
              title="API Gateway"
              description="Enrutamiento centralizado y autenticación."
              onClick={() => {}}
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 7: ChatHistory
================================================================ */
const DEMO_CHATS = [
  { id: 'c1', title: 'Diagrama de microservicios', projectName: 'Proyecto Alpha', timestamp: 'Hace 2h' },
  { id: 'c2', title: 'Análisis de requisitos del módulo de pagos', projectName: 'Proyecto Beta', timestamp: 'Ayer', unread: true },
  { id: 'c3', title: 'Arquitectura hexagonal', projectName: 'Proyecto Gamma', timestamp: 'Lun' },
  { id: 'c4', title: 'Event sourcing con CQRS — patrones de diseño avanzados', timestamp: '12 feb' },
]

function ChatHistorySection() {
  const [activeChat, setActiveChat] = useState('c1')

  return (
    <ShowcaseSection
      id="chat-history"
      title="ChatHistory"
      description="Fila de lista de conversaciones. Estados: activo (border-l brand), sin leer (negrita + punto azul) e inactivo. Interactivo: click + teclado."
    >
      <VariantGroup label="Estados individuales" direction="col">
        <ShowcaseItem label='isActive={true} — borde izquierdo brand, texto brand-700'>
          <div className="w-80 bg-gray-50 rounded-lg overflow-hidden">
            <ChatHistory
              title="Diagrama de microservicios"
              projectName="Proyecto Alpha"
              timestamp="Hace 2h"
              isActive
              onClick={() => {}}
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='unread={true} — título en bold + punto azul'>
          <div className="w-80 bg-gray-50 rounded-lg overflow-hidden">
            <ChatHistory
              title="Análisis de requisitos del módulo de pagos"
              projectName="Proyecto Beta"
              timestamp="Ayer"
              unread
              onClick={() => {}}
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label="Inactivo normal — sin project, sin timestamp">
          <div className="w-80 bg-gray-50 rounded-lg overflow-hidden">
            <ChatHistory title="Arquitectura hexagonal" onClick={() => {}} />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label="Título largo truncado — max-w del contenedor">
          <div className="w-64 bg-gray-50 rounded-lg overflow-hidden">
            <ChatHistory
              title="Event sourcing con CQRS — patrones de diseño avanzados en sistemas distribuidos"
              projectName="Proyecto Gamma"
              timestamp="12 feb"
              onClick={() => {}}
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Lista interactiva — haz click para activar" direction="col">
        <ShowcaseItem label="Lista de 4 chats con estado activo controlado">
          <div className="w-80 bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden divide-y divide-gray-100">
            {DEMO_CHATS.map((chat) => (
              <ChatHistory
                key={chat.id}
                title={chat.title}
                projectName={chat.projectName}
                timestamp={chat.timestamp}
                isActive={activeChat === chat.id}
                unread={chat.unread}
                onClick={() => setActiveChat(chat.id)}
              />
            ))}
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 8: BubbleMessage
================================================================ */
function BubbleMessageSection() {
  return (
    <ShowcaseSection
      id="bubble-message"
      title="BubbleMessage"
      description="Burbuja de mensaje de chat. Dos variantes: user (derecha, brand-100) y ai (izquierda, blanco + borde). Soporta isLoading (TypingDots), avatar y timestamp."
    >
      <VariantGroup label='Variantes (variant)' direction="col">
        <ShowcaseItem label='variant="user" + timestamp'>
          <div className="flex justify-end w-full max-w-md">
            <BubbleMessage variant="user" timestamp="14:23">
              Genera un diagrama de microservicios para un e-commerce con API Gateway.
            </BubbleMessage>
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='variant="ai" + timestamp'>
          <div className="w-full max-w-md">
            <BubbleMessage variant="ai" timestamp="14:23">
              Aquí tienes una arquitectura de microservicios con API Gateway, servicio de autenticación y catálogo de productos.
            </BubbleMessage>
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Estado de carga (isLoading)">
        <ShowcaseItem label='variant="ai" isLoading={true} — TypingDots animados'>
          <BubbleMessage variant="ai" isLoading />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label='Avatar (solo variant="ai")' direction="col">
        <ShowcaseItem label='avatar={<SmartToyIcon />} — icono de IA en círculo brand'>
          <div className="w-full max-w-md">
            <BubbleMessage
              variant="ai"
              timestamp="14:24"
              avatar={
                <div className="w-full h-full bg-brand-600 flex items-center justify-center">
                  <SmartToyIcon style={{ fontSize: 16, color: 'white' }} />
                </div>
              }
            >
              Claro, voy a analizar la arquitectura actual y proponer mejoras de escalabilidad.
            </BubbleMessage>
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Conversación completa simulada" direction="col">
        <ShowcaseItem label="User → AI → isLoading — flujo real del chat">
          <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg w-full max-w-lg">
            <BubbleMessage variant="user" timestamp="14:20">
              ¿Qué es Domain-Driven Design?
            </BubbleMessage>
            <BubbleMessage variant="ai" timestamp="14:20">
              Domain-Driven Design (DDD) es una metodología de desarrollo de software que centra el diseño en el dominio del negocio y su lógica, promoviendo una colaboración profunda entre expertos del dominio y desarrolladores.
            </BubbleMessage>
            <BubbleMessage variant="user" timestamp="14:21">
              ¿Cómo se aplica en microservicios?
            </BubbleMessage>
            <BubbleMessage variant="ai" isLoading />
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 9: DropzoneFile
================================================================ */
function DropzoneFileSection() {
  return (
    <ShowcaseSection
      id="dropzone-file"
      title="DropzoneFile"
      description="Área de carga de archivos con drag & drop. Estados visuales: idle (hover brand), dragging (border sólido brand), error (border error) y disabled. Input nativo oculto activable con click."
    >
      <VariantGroup label="Estado idle — sin restricciones" direction="col">
        <ShowcaseItem label="Dropzone básico — todos los formatos">
          <div className="max-w-sm">
            <DropzoneFile
              onDrop={(files) => console.log('dropped:', files)}
              onFileSelect={(files) => console.log('selected:', files)}
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Con accept y maxSizeMB" direction="col">
        <ShowcaseItem label='accept=".pdf" maxSizeMB={10}'>
          <div className="max-w-sm">
            <DropzoneFile accept=".pdf" maxSizeMB={10} />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='accept="image/*" multiple'>
          <div className="max-w-sm">
            <DropzoneFile accept="image/*" multiple maxSizeMB={5} />
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Estado error" direction="col">
        <ShowcaseItem label='error="El archivo supera el tamaño máximo permitido."'>
          <div className="max-w-sm">
            <DropzoneFile
              accept="image/*"
              error="El archivo supera el tamaño máximo permitido (10 MB)."
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Estado disabled" direction="col">
        <ShowcaseItem label='disabled={true} — sin interacción, opacidad reducida'>
          <div className="max-w-sm">
            <DropzoneFile disabled accept=".zip,.tar.gz" />
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 10: MessageInput
================================================================ */
function MessageInputSection() {
  return (
    <ShowcaseSection
      id="message-input"
      title="MessageInput"
      description="Textarea auto-resize con botón de envío integrado. Enter envía, Shift+Enter añade línea. Estado interno uncontrolled. onSend recibe el string."
    >
      <VariantGroup label="Variantes base" direction="col">
        <ShowcaseItem label='Default — placeholder + hint por defecto'>
          <div className="max-w-lg">
            <MessageInput onSend={(msg) => console.log('send:', msg)} />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='placeholder y hint personalizados'>
          <div className="max-w-lg">
            <MessageInput
              placeholder="Describe tu diagrama de arquitectura…"
              hint="Sé específico sobre los componentes y sus relaciones."
              onSend={(msg) => console.log('send:', msg)}
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='maxRows={3} — limita la altura antes de scroll'>
          <div className="max-w-lg">
            <MessageInput
              maxRows={3}
              placeholder="Máximo 3 líneas visibles antes de scroll…"
              onSend={(msg) => console.log('send:', msg)}
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='disabled={true} — campo y botón bloqueados'>
          <div className="max-w-lg">
            <MessageInput
              disabled
              placeholder="La IA está respondiendo…"
              onSend={() => {}}
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 11: Sidebar
================================================================ */
function SidebarSection() {
  const [activeId, setActiveId] = useState('chats')

  const mainItems = [
    { id: 'home',     label: 'Inicio',    icon: <HomeIcon />,     href: '#sidebar', isActive: activeId === 'home' },
    { id: 'chats',    label: 'Chats',     icon: <ChatIcon />,     href: '#sidebar', isActive: activeId === 'chats' },
    { id: 'projects', label: 'Proyectos', icon: <FolderOpenIcon />,href: '#sidebar', isActive: activeId === 'projects' },
  ]
  const bottomItems = [
    { id: 'settings', label: 'Configuración', icon: <SettingsIcon />, onClick: () => setActiveId('settings'), isActive: activeId === 'settings' },
    { id: 'logout',   label: 'Cerrar sesión',  icon: <LogoutIcon />,  onClick: () => {} },
  ]

  return (
    <ShowcaseSection
      id="sidebar"
      title="Sidebar"
      description="Menú lateral vertical. Items principales con <a href> o <button>. Items inferiores en zona separada. Item activo: borde izquierdo brand + fondo brand-50."
    >
      <VariantGroup label="Demo interactiva — haz click para cambiar item activo" direction="col">
        <ShowcaseItem label="Sidebar completo (h-96) — main items + bottom items + footer">
          <div className="h-96 w-64 rounded-lg overflow-hidden border border-gray-200 shadow-xs">
            <Sidebar
              items={mainItems.map((item) => ({ ...item, onClick: () => setActiveId(item.id) }))}
              bottomItems={bottomItems}
              footer={
                <TextAtom variant="text-xs" className="text-gray-400 px-3">
                  ArchIA v0.1 · Atomic Design
                </TextAtom>
              }
            />
          </div>
          <TextAtom variant="text-xs" className="text-gray-400 mt-1">
            Item activo: <code className="font-mono">{activeId}</code>
          </TextAtom>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Sidebar mínimo — sin bottom items">
        <ShowcaseItem label="Solo main items, sin footer">
          <div className="h-48 w-56 rounded-lg overflow-hidden border border-gray-200 shadow-xs">
            <Sidebar
              items={[
                { id: 'a', label: 'Inicio',    icon: <HomeIcon />,     isActive: true },
                { id: 'b', label: 'Proyectos', icon: <FolderOpenIcon />, isActive: false },
              ]}
            />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label="Sin iconos — solo labels">
          <div className="h-40 w-48 rounded-lg overflow-hidden border border-gray-200 shadow-xs">
            <Sidebar
              items={[
                { id: 'x', label: 'Documentación', isActive: false },
                { id: 'y', label: 'API Reference',  isActive: true },
                { id: 'z', label: 'Ejemplos',        isActive: false },
              ]}
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 12: RowTable
================================================================ */
function RowTableSection() {
  const [selected, setSelected] = useState(false)

  return (
    <ShowcaseSection
      id="row-table"
      title="RowTable"
      description="Fila de cuerpo de tabla (<tr>). Soporta selección con CheckboxAtom, striped alternado y click en fila completa. Jerarquía de fondo: selected > striped > default."
    >
      <VariantGroup label="Estados de fondo" direction="col">
        <ShowcaseItem label="Estado normal (bg-white)">
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
            <table className="w-full border-collapse">
              <tbody>
                <RowTable cells={['Microservices API', 'Proyecto Alpha', '12 feb 2026']} />
              </tbody>
            </table>
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='selected={true} — bg-brand-25'>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
            <table className="w-full border-collapse">
              <tbody>
                <RowTable cells={['Auth Service', 'Proyecto Beta', '10 feb 2026']} selected />
              </tbody>
            </table>
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='striped={true} isOdd={true} — bg-gray-50'>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
            <table className="w-full border-collapse">
              <tbody>
                <RowTable cells={['Fila par', 'normal', '—']} striped isOdd={false} />
                <RowTable cells={['Fila impar', 'bg-gray-50', '—']} striped isOdd={true} />
                <RowTable cells={['Fila par', 'normal', '—']} striped isOdd={false} />
              </tbody>
            </table>
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Fila seleccionable (checkbox) — interactiva" direction="col">
        <ShowcaseItem label='selectable={true} — haz click en el checkbox'>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
            <table className="w-full border-collapse">
              <tbody>
                <RowTable
                  selectable
                  selected={selected}
                  onSelect={(e) => setSelected(e.target.checked)}
                  cells={['Diagrama hexagonal', 'Proyecto Gamma', '8 feb 2026']}
                />
              </tbody>
            </table>
          </div>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Fila clicable (onClick)" direction="col">
        <ShowcaseItem label='onClick — cursor-pointer + hover:bg-gray-50'>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xs">
            <table className="w-full border-collapse">
              <tbody>
                <RowTable
                  cells={['Event Sourcing', 'Proyecto Delta', '5 feb 2026']}
                  onClick={() => alert('Fila clicada')}
                />
              </tbody>
            </table>
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 13: Table
================================================================ */
const TABLE_COLUMNS = [
  { id: 'name',    label: 'Nombre',    sortable: true },
  { id: 'project', label: 'Proyecto',  sortable: false },
  { id: 'status',  label: 'Estado',    sortable: false, align: 'center', width: '120px' },
  { id: 'date',    label: 'Fecha',     sortable: true,  align: 'right',  width: '110px' },
]

const TABLE_ROWS = [
  {
    id: 1,
    cells: [
      'Microservices API',
      'Proyecto Alpha',
      <Chips key="s1" label="Activo"    variant="success" size="sm" />,
      '12 feb 2026',
    ],
  },
  {
    id: 2,
    cells: [
      'Auth Service',
      'Proyecto Beta',
      <Chips key="s2" label="Pendiente" variant="warning" size="sm" />,
      '10 feb 2026',
    ],
  },
  {
    id: 3,
    cells: [
      'API Gateway',
      'Proyecto Alpha',
      <Chips key="s3" label="Activo"    variant="success" size="sm" />,
      '8 feb 2026',
    ],
  },
  {
    id: 4,
    cells: [
      'Event Bus',
      'Proyecto Gamma',
      <Chips key="s4" label="Error"     variant="error"   size="sm" />,
      '5 feb 2026',
    ],
  },
]

function TableSection() {
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)

  const toggleRow = (id) =>
    setSelectedRows((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const toggleAll = (all) =>
    setSelectedRows(all ? new Set(TABLE_ROWS.map((r) => r.id)) : new Set())

  const handleSort = (col) => {
    if (sortCol !== col) { setSortCol(col); setSortDir('asc'); return }
    if (sortDir === 'asc')  { setSortDir('desc'); return }
    setSortCol(null); setSortDir(null)
  }

  const columnsWithSort = TABLE_COLUMNS.map((col) => ({
    ...col,
    sortDirection: sortCol === col.id ? sortDir : null,
    onSort:        col.sortable ? () => handleSort(col.id) : undefined,
  }))

  return (
    <ShowcaseSection
      id="table"
      title="Table"
      description="Tabla de datos completa. Compone Column (thead) + RowTable (tbody). Soporta selección global/por fila, ordenamiento, striped, estado de carga y estado vacío."
    >
      <VariantGroup label="Tabla básica — sin selección" direction="col">
        <ShowcaseItem label="columns + rows — layout estático">
          <Table columns={TABLE_COLUMNS} rows={TABLE_ROWS} />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Tabla interactiva — selectable + sortable" direction="col">
        <ShowcaseItem label="selectable + selectedRows (useState) + onSort — haz click">
          <Table
            columns={columnsWithSort}
            rows={TABLE_ROWS}
            selectable
            selectedRows={selectedRows}
            onSelectRow={toggleRow}
            onSelectAll={toggleAll}
          />
          {selectedRows.size > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <TextAtom variant="text-xs" className="text-gray-500">
                {selectedRows.size} fila{selectedRows.size > 1 ? 's' : ''} seleccionada{selectedRows.size > 1 ? 's' : ''}
              </TextAtom>
              <ButtonAtom
                variant="text-icon"
                intent="danger"
                size="sm"
                icon={<DeleteOutlineIcon />}
                onClick={() => setSelectedRows(new Set())}
              >
                Eliminar selección
              </ButtonAtom>
            </div>
          )}
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Tabla con striped" direction="col">
        <ShowcaseItem label="striped={true} — filas alternas bg-gray-50">
          <Table columns={TABLE_COLUMNS} rows={TABLE_ROWS} striped />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Estados especiales">
        <ShowcaseItem label='loading={true} — "Cargando datos…"'>
          <div className="w-80">
            <Table columns={TABLE_COLUMNS} rows={[]} loading />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='rows=[] — estado vacío por defecto'>
          <div className="w-80">
            <Table columns={TABLE_COLUMNS} rows={[]} />
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='emptyState personalizado'>
          <div className="w-96">
            <Table
              columns={TABLE_COLUMNS}
              rows={[]}
              emptyState={
                <div className="flex flex-col items-center gap-3 py-4">
                  <TextAtom variant="text-sm" weight="medium" className="text-gray-500">
                    No hay proyectos todavía
                  </TextAtom>
                  <ButtonAtom variant="text-icon" intent="primary" size="sm" icon={<AddIcon />}>
                    Crear primer proyecto
                  </ButtonAtom>
                </div>
              }
            />
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 14: Modal
================================================================ */
function ModalSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState('md')

  const SIZES = ['sm', 'md', 'lg', 'xl']

  return (
    <ShowcaseSection
      id="modal"
      title="Modal"
      description="Overlay fijo con panel centrado. Se cierra con Escape o click fuera del panel. Prop title activa la cabecera con botón X. Prop footer para acciones. Sin React Portal."
    >
      <VariantGroup label="Demo interactiva — elige tamaño y abre el modal" direction="col">
        <ShowcaseItem label="size selector + botón de apertura">
          <div className="flex flex-col gap-4">
            {/* Selector de tamaño */}
            <div className="flex items-center gap-2 flex-wrap">
              <TextAtom variant="text-sm" weight="medium" className="text-gray-700">
                Tamaño:
              </TextAtom>
              {SIZES.map((s) => (
                <ButtonAtom
                  key={s}
                  intent={modalSize === s ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setModalSize(s)}
                >
                  {s}
                </ButtonAtom>
              ))}
            </div>
            {/* Botón para abrir */}
            <div>
              <ButtonAtom intent="primary" onClick={() => setModalOpen(true)}>
                Abrir modal ({modalSize})
              </ButtonAtom>
            </div>
          </div>

          {/* Modal */}
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Nuevo proyecto"
            size={modalSize}
            footer={
              <>
                <ButtonAtom intent="ghost"   onClick={() => setModalOpen(false)}>Cancelar</ButtonAtom>
                <ButtonAtom intent="primary" onClick={() => setModalOpen(false)}>Crear proyecto</ButtonAtom>
              </>
            }
          >
            <Form gap="md">
              <InputForm
                id="modal-name"
                label="Nombre del proyecto"
                placeholder="Ej: Microservicios Alpha"
                required
              />
              <InputForm
                id="modal-url"
                label="URL del repositorio"
                type="url"
                placeholder="https://github.com/..."
                hint="Solo repositorios públicos."
              />
              <InputForm
                id="modal-desc"
                label="Descripción"
                placeholder="Describe brevemente el proyecto…"
              />
            </Form>
          </Modal>
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Variantes de size (max-width del panel)" direction="col">
        <ShowcaseItem label='size="sm" → max-w-sm | "md" → max-w-lg | "lg" → max-w-2xl | "xl" → max-w-4xl'>
          <div className="flex items-center gap-2 flex-wrap">
            {SIZES.map((s) => (
              <ButtonAtom
                key={s}
                intent="secondary"
                size="sm"
                onClick={() => { setModalSize(s); setModalOpen(true) }}
              >
                Abrir {s}
              </ButtonAtom>
            ))}
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   SECCIÓN 15: AlertDialog
================================================================ */
function AlertDialogSection() {
  const [alertOpen,   setAlertOpen]   = useState(false)
  const [alertIntent, setAlertIntent] = useState('warning')
  const [isLoading,   setIsLoading]   = useState(false)

  const INTENTS = ['warning', 'danger', 'info', 'success']

  const DEMO_CONTENT = {
    warning: { title: '¿Descartar cambios?', description: 'Perderás todos los cambios no guardados. Esta acción no se puede deshacer.', confirm: 'Descartar' },
    danger:  { title: 'Eliminar proyecto',   description: '¿Estás seguro de que deseas eliminar este proyecto? Esta acción es irreversible.', confirm: 'Eliminar' },
    info:    { title: 'Nueva actualización', description: 'La versión 2.0 incluye mejoras de rendimiento y nuevas funciones de generación.', confirm: 'Ver novedades' },
    success: { title: '¡Exportación lista!', description: 'Tu diagrama fue exportado correctamente en formato PNG y SVG.', confirm: 'Abrir archivo' },
  }

  const handleConfirm = () => {
    if (alertIntent === 'danger') {
      /* Simula una operación async */
      setIsLoading(true)
      setTimeout(() => { setIsLoading(false); setAlertOpen(false) }, 1500)
    } else {
      setAlertOpen(false)
    }
  }

  const demo = DEMO_CONTENT[alertIntent]

  return (
    <ShowcaseSection
      id="alert-dialog"
      title="AlertDialog"
      description="Diálogo de confirmación que compone Modal (size=sm). Intent controla el ícono MUI, colores del círculo y estilo del botón de confirmación (primary o danger)."
    >
      <VariantGroup label="Demo interactiva — elige un intent y abre el diálogo" direction="col">
        <ShowcaseItem label="intent selector + botón de apertura">
          <div className="flex flex-col gap-4">
            {/* Selector de intent */}
            <div className="flex items-center gap-2 flex-wrap">
              <TextAtom variant="text-sm" weight="medium" className="text-gray-700">
                Intent:
              </TextAtom>
              {INTENTS.map((i) => (
                <ButtonAtom
                  key={i}
                  intent={alertIntent === i ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setAlertIntent(i)}
                >
                  {i}
                </ButtonAtom>
              ))}
            </div>
            {/* Botón para abrir */}
            <div>
              <ButtonAtom intent="secondary" onClick={() => setAlertOpen(true)}>
                Abrir AlertDialog ({alertIntent})
              </ButtonAtom>
            </div>
          </div>

          <AlertDialog
            isOpen={alertOpen}
            onClose={() => { setAlertOpen(false); setIsLoading(false) }}
            onConfirm={handleConfirm}
            intent={alertIntent}
            title={demo.title}
            description={demo.description}
            confirmLabel={demo.confirm}
            cancelLabel="Cancelar"
            isLoading={isLoading}
          />
        </ShowcaseItem>
      </VariantGroup>

      <VariantGroup label="Los 4 intents (visuales estáticos)" direction="col">
        <ShowcaseItem label='intent="warning" — WarningAmberIcon amarillo, btn primary'>
          <div className="flex items-center gap-3 p-4 bg-warning-50 rounded-lg border border-warning-200">
            <div className="w-10 h-10 rounded-full bg-warning-100 flex items-center justify-center flex-shrink-0">
              <TextAtom variant="text-lg" as="span">⚠️</TextAtom>
            </div>
            <div>
              <TextAtom variant="text-sm" weight="semibold" className="text-warning-800">warning</TextAtom>
              <TextAtom variant="text-xs" className="text-warning-600">WarningAmberIcon · btn intent="primary"</TextAtom>
            </div>
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='intent="danger" — ErrorOutlineIcon rojo, btn intent="danger"'>
          <div className="flex items-center gap-3 p-4 bg-error-50 rounded-lg border border-error-200">
            <div className="w-10 h-10 rounded-full bg-error-100 flex items-center justify-center flex-shrink-0">
              <TextAtom variant="text-lg" as="span">🚨</TextAtom>
            </div>
            <div>
              <TextAtom variant="text-sm" weight="semibold" className="text-error-800">danger</TextAtom>
              <TextAtom variant="text-xs" className="text-error-600">ErrorOutlineIcon · btn intent="danger"</TextAtom>
            </div>
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='intent="info" — InfoOutlinedIcon azul, btn intent="primary"'>
          <div className="flex items-center gap-3 p-4 bg-brand-50 rounded-lg border border-brand-200">
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
              <TextAtom variant="text-lg" as="span">ℹ️</TextAtom>
            </div>
            <div>
              <TextAtom variant="text-sm" weight="semibold" className="text-brand-800">info</TextAtom>
              <TextAtom variant="text-xs" className="text-brand-600">InfoOutlinedIcon · btn intent="primary"</TextAtom>
            </div>
          </div>
        </ShowcaseItem>
        <ShowcaseItem label='intent="success" — CheckCircleOutlineIcon verde, btn intent="primary"'>
          <div className="flex items-center gap-3 p-4 bg-success-50 rounded-lg border border-success-200">
            <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center flex-shrink-0">
              <TextAtom variant="text-lg" as="span">✅</TextAtom>
            </div>
            <div>
              <TextAtom variant="text-sm" weight="semibold" className="text-success-800">success</TextAtom>
              <TextAtom variant="text-xs" className="text-success-600">CheckCircleOutlineIcon · btn intent="primary"</TextAtom>
            </div>
          </div>
        </ShowcaseItem>
      </VariantGroup>
    </ShowcaseSection>
  )
}

/* ================================================================
   COMPONENTE PRINCIPAL: MoleculeShowcase
================================================================ */
export default function MoleculeShowcase({ onNavigate }) {
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
          @Molecules — Storybook de revisión
        </TextAtom>
        <div className="ml-auto flex items-center gap-3">
          <ButtonAtom
            as="button"
            intent="ghost"
            size="sm"
            onClick={() => onNavigate?.('atoms')}
          >
            ← Ver Átomos
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
              Moléculas (15)
            </TextAtom>
            {NAV_ITEMS.map(({ id, label }) => (
              <NavLink key={id} href={`#${id}`}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Info al pie del sidebar */}
          <div className="border-t border-gray-100 p-4">
            <TextAtom variant="text-xs" className="text-gray-400 mb-2" weight="semibold">
              Átomos usados
            </TextAtom>
            {['TextAtom', 'HeaderAtom', 'LabelAtom', 'InputAtom', 'ButtonAtom', 'CheckboxAtom'].map((t) => (
              <div key={t} className="flex items-start gap-1.5 mb-1">
                <div className="w-1 h-1 rounded-full bg-secondary-400 mt-1.5 flex-shrink-0" />
                <TextAtom variant="text-xs" as="span" className="text-gray-400 font-sans">
                  {t}
                </TextAtom>
              </div>
            ))}
            <div className="mt-3">
              <ButtonAtom
                intent="ghost"
                size="sm"
                onClick={() => onNavigate?.('atoms')}
                className="w-full justify-center text-xs"
              >
                ← Ver Átomos
              </ButtonAtom>
            </div>
          </div>
        </aside>

        {/* ── Contenido principal ── */}
        <main className="flex-1 p-8 flex flex-col gap-8 min-w-0">
          <SectionHeaderSection />
          <InputFormSection />
          <FormSection />
          <ChipsSection />
          <ColumnSection />
          <CardsSection />
          <ChatHistorySection />
          <BubbleMessageSection />
          <DropzoneFileSection />
          <MessageInputSection />
          <SidebarSection />
          <RowTableSection />
          <TableSection />
          <ModalSection />
          <AlertDialogSection />

          {/* Footer */}
          <footer className="border-t border-gray-200 pt-6 pb-10 text-center">
            <TextAtom variant="text-xs" className="text-gray-400">
              ArchIA Design System — @Molecules (15) · Atomic Design + Tailwind CSS v4 + React 19
            </TextAtom>
          </footer>
        </main>

      </div>
    </div>
  )
}
