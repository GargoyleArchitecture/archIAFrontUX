/**
 * <Sidebar /> — Menú lateral de navegación
 *
 * Sidebar vertical con items de navegación, grupo de items inferiores
 * (configuración, perfil, etc.) y un slot de footer opcional.
 *
 * Props:
 *   items       — SidebarItemDef[]  Items del nav principal
 *   bottomItems — SidebarItemDef[]  Items fijos al fondo (settings, logout…)
 *   footer      — ReactNode         Slot debajo de los bottom items
 *   className   — string            Clases adicionales para el <aside>
 *
 * SidebarItemDef shape:
 *   { id: string, label: string, icon?: ReactNode, href?: string, isActive?: bool }
 *
 * Comportamiento:
 *   - Si `href` está definido, el item se renderiza como <a>
 *   - Si no, como <button>
 *   - Item activo: fondo brand-50, borde izquierdo brand-500, texto brand-700
 */

import TextAtom from '../atoms/TextAtom'

/* ================================================================
   Componente interno: item individual del sidebar
================================================================ */
function SidebarItem({ item }) {
  const { label, icon, href, isActive, onClick } = item
  const Tag = href ? 'a' : 'button'

  const classes = [
    'flex items-center gap-3 w-full rounded-md px-3 py-2',
    'text-body-sm font-sans transition-colors duration-150 outline-none',
    'border-l-2',
    isActive
      ? 'bg-brand-50 text-brand-700 border-brand-500 font-semibold'
      : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900 font-medium',
    'focus:shadow-focus-gray',
  ].join(' ')

  return (
    <Tag
      href={href}
      type={!href ? 'button' : undefined}
      onClick={onClick}
      className={classes}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && (
        <span
          className={[
            'flex-shrink-0 [&_svg]:w-5 [&_svg]:h-5',
            isActive ? 'text-brand-600' : 'text-gray-400',
          ].join(' ')}
        >
          {icon}
        </span>
      )}
      <span className="truncate">{label}</span>
    </Tag>
  )
}

/* ================================================================
   Componente principal: Sidebar
================================================================ */
export default function Sidebar({
  items       = [],
  bottomItems = [],
  footer,
  className   = '',
  ...props
}) {
  const classes = [
    'flex flex-col h-full bg-white border-r border-gray-200',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <aside className={classes} {...props}>

      {/* Navegación principal — ocupa el espacio restante */}
      <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </nav>

      {/* Items inferiores + footer */}
      {(bottomItems.length > 0 || footer) && (
        <div className="border-t border-gray-100 p-4 flex flex-col gap-1">
          {bottomItems.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
          {footer && (
            <div className="mt-2">
              {footer}
            </div>
          )}
        </div>
      )}
    </aside>
  )
}

/* ----------------------------------------------------------------
   Ejemplos de uso:

   import ChatIcon      from '@mui/icons-material/Chat'
   import FolderIcon    from '@mui/icons-material/FolderOpen'
   import HomeIcon      from '@mui/icons-material/Home'
   import SettingsIcon  from '@mui/icons-material/Settings'
   import LogoutIcon    from '@mui/icons-material/Logout'

   const [activeId, setActiveId] = useState('chats')

   <Sidebar
     items={[
       { id: 'home',     label: 'Inicio',     icon: <HomeIcon />,   href: '/',        isActive: activeId === 'home' },
       { id: 'chats',    label: 'Chats',      icon: <ChatIcon />,   href: '/chats',   isActive: activeId === 'chats' },
       { id: 'projects', label: 'Proyectos',  icon: <FolderIcon />, href: '/projects',isActive: activeId === 'projects' },
     ]}
     bottomItems={[
       { id: 'settings', label: 'Configuración', icon: <SettingsIcon />, href: '/settings' },
       { id: 'logout',   label: 'Cerrar sesión',  icon: <LogoutIcon />,  onClick: handleLogout },
     ]}
     footer={
       <TextAtom variant="text-xs" className="text-gray-400 px-3">
         ArchIA v0.1
       </TextAtom>
     }
     className="w-64"
   />
---------------------------------------------------------------- */
