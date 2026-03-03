/**
 * ChatView.jsx — Capa de vista: interfaz del chat de ArchIA
 *
 * Responsabilidades:
 *   - Renderizar la UI usando únicamente componentes de Atomic Design + Tailwind
 *   - Delegar toda la lógica de estado al hook useChatManager
 *   - Gestionar el estado puramente visual (sidebar, modales, imágenes adjuntas)
 *
 * Sin MUI, sin hojas de estilo externas, sin lógica de negocio ni fetch.
 */

import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm    from 'remark-gfm'

/* MUI Icons — solo iconos SVG, cero componentes de MUI */
import SmartToyIcon      from '@mui/icons-material/SmartToy'
import AddIcon           from '@mui/icons-material/Add'
import MenuIcon          from '@mui/icons-material/Menu'
import EditOutlinedIcon  from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ThumbUpIcon       from '@mui/icons-material/ThumbUp'
import ThumbDownIcon     from '@mui/icons-material/ThumbDown'
import MoreHorizIcon     from '@mui/icons-material/MoreHoriz'
import ScienceIcon       from '@mui/icons-material/Science'
import AttachFileIcon    from '@mui/icons-material/AttachFile'
import ImageIcon         from '@mui/icons-material/Image'
import CloseIcon         from '@mui/icons-material/Close'

/* Atoms */
import TextAtom    from '../components/atoms/TextAtom'
import HeaderAtom  from '../components/atoms/HeaderAtom'
import ButtonAtom  from '../components/atoms/ButtonAtom'
import TooltipAtom from '../components/atoms/TooltipAtom'

/* Molecules */
import BubbleMessage from '../components/molecules/BubbleMessage'
import ChatContainer from '../components/molecules/ChatContainer'
import ChatHistory   from '../components/molecules/ChatHistory'
import MessageInput  from '../components/molecules/MessageInput'
import Modal         from '../components/molecules/Modal'

/* Capa de lógica */
import {
  useChatManager,
  summarizeRoles,
  extractRagSources,
} from '../hooks/useChatManager'

/* ----------------------------------------------------------------
   Constantes de vista
---------------------------------------------------------------- */
const DISCLAIMER =
  'ArquIA es un asistente para arquitectas y arquitectos de software: acelera análisis, tácticas y diagramas. Puede cometer errores; verifica siempre la información importante.'

const AVATAR_AI = (
  <div className="w-full h-full bg-brand-600 flex items-center justify-center">
    <SmartToyIcon style={{ fontSize: 14, color: 'white' }} />
  </div>
)

/* ================================================================
   Helpers de presentación (locales a la vista)
================================================================ */

/** Tiempo relativo legible */
function relativeTime(ts) {
  const mins = Math.floor((Date.now() - ts) / 60000)
  if (mins < 1)  return 'Ahora'
  if (mins < 60) return `Hace ${mins} min`
  const h = Math.floor(mins / 60)
  if (h < 24)    return `Hace ${h}h`
  return `Hace ${Math.floor(h / 24)}d`
}

/**
 * Contenido markdown de las respuestas del asistente.
 * Renderiza un <div> con prosa accesible.
 *
 * NOTA ARQUITECTÓNICA: BubbleMessage envuelve children en <TextAtom>
 * (renderiza como <p>). Pasarle un <div> genera HTML inválido
 * (div-inside-p). La solución limpia es añadir `contentTag="div"` a
 * BubbleMessage. Por ahora, la vista renderiza correctamente aunque
 * React emita un warning en desarrollo.
 * TODO: añadir prop contentTag a BubbleMessage en una próxima iteración.
 */
function AssistantContent({ text }) {
  const cleaned = (text || '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/!\[[^\]]*]/g, '')

  return (
    <div className={[
      '[&_p]:mb-2 [&_p:last-child]:mb-0',
      '[&_ul]:pl-5 [&_ul]:list-disc [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:mb-0.5',
      '[&_strong]:font-semibold [&_em]:italic',
      '[&_blockquote]:border-l-2 [&_blockquote]:border-brand-300 [&_blockquote]:pl-3 [&_blockquote]:text-gray-600',
      '[&_code]:font-mono [&_code]:text-brand-700 [&_code]:bg-brand-50 [&_code]:px-1 [&_code]:rounded [&_code]:text-body-xs',
      '[&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre]:bg-gray-900 [&_pre]:p-3 [&_pre]:my-2',
      '[&_pre_code]:bg-transparent [&_pre_code]:text-gray-100 [&_pre_code]:p-0',
      '[&_h1]:text-display-xs [&_h1]:font-semibold [&_h1]:mt-3 [&_h1]:mb-1',
      '[&_h2]:text-body-xl [&_h2]:font-semibold [&_h2]:mt-2 [&_h2]:mb-1',
      '[&_h3]:text-body-lg [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-0.5',
      '[&_hr]:border-gray-200 [&_hr]:my-3',
    ].join(' ')}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {cleaned}
      </ReactMarkdown>
    </div>
  )
}

/**
 * Indicador de agentes internos que procesaron el mensaje.
 * Renderiza pill badges ligeros (no son interactivos).
 */
function AgentRoleBadges({ internalMessages }) {
  const roles = summarizeRoles(internalMessages)
  if (roles.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {roles.map(([name, count]) => (
        <span
          key={name}
          className="inline-flex items-center px-2 py-0.5 rounded-full text-body-xs font-medium font-mono bg-gray-100 text-gray-600 border border-gray-200"
        >
          {name}{count > 1 ? ` ×${count}` : ''}
        </span>
      ))}
    </div>
  )
}

/**
 * Botones de sugerencia bajo la respuesta del asistente.
 * Al hacer clic, envían el texto de la sugerencia como nuevo mensaje.
 */
function SuggestionChips({ suggestions, onSelect, disabled }) {
  if (suggestions.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => !disabled && onSelect(s)}
          disabled={disabled}
          className={[
            'inline-flex items-center px-2.5 py-1 rounded-full',
            'text-body-xs font-medium font-sans',
            'border border-brand-200 bg-brand-25 text-brand-700',
            'hover:bg-brand-50 hover:border-brand-300',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-colors duration-150',
          ].join(' ')}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

/**
 * Botones de feedback (pulgar arriba / abajo) bajo la respuesta.
 */
function FeedbackButtons({ sessionId, messageId, rated, onRate }) {
  if (!sessionId || !messageId) return null

  return (
    <div className="flex items-center gap-1 mt-2">
      <TextAtom variant="text-xs" as="span" className="text-gray-400 mr-1">
        ¿Fue útil?
      </TextAtom>
      <TooltipAtom content="Útil" position="top">
        <ButtonAtom
          variant="icon" intent="ghost" size="xs"
          disabled={rated}
          onClick={() => onRate(sessionId, messageId, true)}
          aria-label="Útil"
          className={rated ? 'opacity-50' : 'hover:text-success-600'}
        >
          <ThumbUpIcon />
        </ButtonAtom>
      </TooltipAtom>
      <TooltipAtom content="No útil" position="top">
        <ButtonAtom
          variant="icon" intent="ghost" size="xs"
          disabled={rated}
          onClick={() => onRate(sessionId, messageId, false)}
          aria-label="No útil"
          className={rated ? 'opacity-50' : 'hover:text-error-600'}
        >
          <ThumbDownIcon />
        </ButtonAtom>
      </TooltipAtom>
    </div>
  )
}

/* ================================================================
   COMPONENTE PRINCIPAL
================================================================ */
export default function ChatView({onNavigate }) {
  /* ── Lógica del chat (hook) ── */
  const {
    sessions,
    sessionId,
    messages,
    isBusy,
    ratedMessages,
    setSessionId,
    createSession,
    renameSession,
    deleteSession,
    send,
    rateMessage,
  } = useChatManager()

  /* ── Estado puramente visual ── */
  const [sidebarOpen,              setSidebarOpen]              = useState(true)
  const [showOnboarding,           setShowOnboarding]           = useState(true)
  const [openInternalDialog,       setOpenInternalDialog]       = useState(false)
  const [selectedInternalMessages, setSelectedInternalMessages] = useState([])
  const [selectedRagSources,       setSelectedRagSources]       = useState([])
  const [attachedImages,           setAttachedImages]           = useState([])

  const fileInputRef  = useRef(null)
  const messagesEndRef = useRef(null)

  /* ── Escucha evento externo para toggle del sidebar ── */
  useEffect(() => {
    const handler = () => setSidebarOpen((prev) => !prev)
    window.addEventListener('arquia-toggle-drawer', handler)
    return () => window.removeEventListener('arquia-toggle-drawer', handler)
  }, [])

  /* ── Auto-scroll al último mensaje ── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /* ── Gestión de imágenes adjuntas ── */
  const handleFileChange = (e) => {
    if (isBusy) return
    const files = Array.from(e.target.files)
    if (files.length + attachedImages.length > 2) {
      files.splice(0, files.length - (2 - attachedImages.length))
    }
    const picks = files.map((f) => ({
      file:    f,
      preview: URL.createObjectURL(f),
      name:    f.name,
    }))
    setAttachedImages((prev) => [...prev, ...picks].slice(0, 2))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeImage = (i) => {
    if (isBusy) return
    setAttachedImages((prev) => prev.filter((_, idx) => idx !== i))
  }

  /* ── Envío de mensaje (conecta view con hook) ── */
  const handleSend = (text) => {
    send(text, attachedImages)
    setAttachedImages([])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  /* ── Sugerencia seleccionada ── */
  const handleSuggestionClick = (text) => {
    if (!isBusy) send(text, [])
  }

  /* ── Abrir modal de mensajes internos ── */
  const openInternalMessages = (internalMessages, ragSources) => {
    setSelectedInternalMessages(internalMessages)
    setSelectedRagSources(ragSources)
    setOpenInternalDialog(true)
  }

  /* ── Sesión activa (para mostrar su título en el topbar) ── */
  const activeSession = sessions.find((s) => s.id === sessionId)

  /* ── Sesión: renombrar con prompt nativo (reemplazable por modal) ── */
  const handleRename = (id, currentTitle) => {
    const t = prompt('Renombrar conversación', currentTitle || 'Nuevo chat')
    if (t !== null) renameSession(id, t.trim() || 'Nuevo chat')
  }

  /* ================================================================
     RENDER
  ================================================================ */
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* ============================================================
          SIDEBAR: Panel de sesiones/conversaciones
      ============================================================ */}
      <aside
        className={[
          'flex flex-col bg-white border-r border-gray-200',
          'transition-all duration-200 overflow-x-hidden flex-shrink-0',
          sidebarOpen ? 'w-72' : 'w-0',
        ].join(' ')}
        aria-hidden={!sidebarOpen}
      >
        {/* Cabecera del sidebar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <TextAtom variant="text-sm" weight="semibold" className="text-gray-700">
            Conversaciones
          </TextAtom>
          <TooltipAtom content="Nueva conversación" position="bottom">
            <ButtonAtom
              variant="icon" intent="ghost" size="xs"
              onClick={createSession}
              disabled={isBusy}
              aria-label="Nueva conversación"
            >
              <AddIcon />
            </ButtonAtom>
          </TooltipAtom>
        </div>

        {/* Lista de sesiones */}
        <nav className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">
          {sessions.map((s) => (
            <div key={s.id} className="relative group">
              <ChatHistory
                title={s.title || 'Nuevo chat'}
                timestamp={relativeTime(s.createdAt)}
                isActive={s.id === sessionId}
                onClick={() => { if (!isBusy) { setSessionId(s.id) } }}
              />

              {/* Acciones de sesión — visibles al hacer hover */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 bg-white pl-1">
                <TooltipAtom content="Renombrar" position="top">
                  <ButtonAtom
                    variant="icon" intent="ghost" size="xs"
                    onClick={(e) => { e.stopPropagation(); handleRename(s.id, s.title) }}
                    aria-label="Renombrar conversación"
                  >
                    <EditOutlinedIcon />
                  </ButtonAtom>
                </TooltipAtom>
                <TooltipAtom content="Eliminar" position="top">
                  <ButtonAtom
                    variant="icon" intent="danger" size="xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (confirm('¿Eliminar esta conversación?')) deleteSession(s.id)
                    }}
                    disabled={isBusy}
                    aria-label="Eliminar conversación"
                  >
                    <DeleteOutlineIcon />
                  </ButtonAtom>
                </TooltipAtom>
              </div>
            </div>
          ))}
        </nav>

        {/* Botón nuevo chat al pie del sidebar */}
        <div className="p-3 border-t border-gray-100 flex-shrink-0">
          <ButtonAtom
            intent="primary" size="sm"
            onClick={createSession}
            disabled={isBusy}
            className="w-full justify-center"
          >
            + Nuevo chat
          </ButtonAtom>
        </div>
      </aside>

      {/* ============================================================
          ÁREA PRINCIPAL DE CHAT
      ============================================================ */}
      <div className="flex flex-col flex-1 min-h-0 min-w-0">

        {/* ── Topbar ── */}
        <header className="flex items-center gap-3 px-4 h-14 border-b border-gray-200 bg-white flex-shrink-0">
          <TooltipAtom content={sidebarOpen ? 'Ocultar sidebar' : 'Mostrar sidebar'} position="bottom">
            <ButtonAtom
              variant="icon" intent="ghost" size="sm"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle sidebar"
            >
              <MenuIcon />
            </ButtonAtom>
          </TooltipAtom>

          <TextAtom variant="text-sm" weight="semibold" className="text-gray-700 truncate">
            {activeSession?.title || 'Nuevo chat'}
          </TextAtom>

          {isBusy && (
            <span className="ml-auto flex items-center gap-1.5 text-body-xs text-brand-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              Generando respuesta…
            </span>
          )}
        </header>

        {/* ── Mensajes ── */}
        <ChatContainer className="flex-1">
          {messages.map((msg) => {
            const isUser = msg.sender === 'usuario'

            /* ── Mensaje del usuario ── */
            if (isUser) {
              return (
                <div key={msg.id}>
                  <BubbleMessage variant="user">
                    {msg.text}
                  </BubbleMessage>

                  {/* Imágenes adjuntadas por el usuario */}
                  {msg.images?.length > 0 && (
                    <div className="flex justify-end gap-2 mt-1">
                      {msg.images.map((src, i) => (
                        <img
                          key={`${msg.id}-img-${i}`}
                          src={src}
                          alt={`Imagen adjunta ${i + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-xs"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            /* ── Mensaje del asistente ── */
            const ragSources       = extractRagSources(msg.internalMessages)
            const ratedKey         = `${msg.sessionId}-${msg.messageId}`
            const isRated          = ratedMessages.has(ratedKey)

            /* Filtrado y selección de sugerencias */
            const rawSuggestions = Array.isArray(msg.suggestions) ? msg.suggestions : []
            const filteredSuggs  = rawSuggestions.filter(
              (s) => typeof s === 'string' && !/^[a-z0-9_]+$/i.test(s.trim())
            )
            const isDiagram = (msg.mermaidCode || msg.diagram) &&
              /diagram|diagrama/.test((msg.text || '').toLowerCase())
            const uiSuggestions = isDiagram
              ? [
                  'Genera un diagrama de componentes de este sistema.',
                  'Genera un diagrama de despliegue para el mismo sistema.',
                  'Define un nuevo ASR basado en este sistema.',
                ]
              : filteredSuggs

            return (
              <div key={msg.id} className="flex flex-col items-start gap-2">

                {/* Burbuja del asistente */}
                <div className="flex items-start gap-2 w-full">
                  {/* Indicador RAG Sources */}
                  {ragSources.length > 0 && (
                    <TooltipAtom
                      content={`${ragSources.length} fuente(s) RAG local`}
                      position="right"
                    >
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-body-xs font-medium bg-brand-25 border border-brand-100 text-brand-600 self-start mt-1 flex-shrink-0">
                        <ScienceIcon style={{ fontSize: 12 }} />
                        RAG {ragSources.length}
                      </span>
                    </TooltipAtom>
                  )}

                  {/* Botón para ver mensajes internos */}
                  {Array.isArray(msg.internalMessages) && msg.internalMessages.length > 0 && (
                    <TooltipAtom content="Ver mensajes internos" position="top">
                      <ButtonAtom
                        variant="icon" intent="ghost" size="xs"
                        onClick={() => openInternalMessages(msg.internalMessages, ragSources)}
                        aria-label="Ver mensajes internos"
                        className="self-start mt-0.5 flex-shrink-0"
                      >
                        <MoreHorizIcon />
                      </ButtonAtom>
                    </TooltipAtom>
                  )}
                </div>

                {/* Burbuja con contenido */}
                <BubbleMessage
                  variant="ai"
                  isLoading={msg.pending}
                  avatar={AVATAR_AI}
                >
                  {/* AssistantContent renderiza markdown en un <div>.
                      BubbleMessage lo envuelve en <TextAtom> (<p>).
                      TODO: añadir prop contentTag="div" a BubbleMessage. */}
                  <AssistantContent text={msg.text} />
                </BubbleMessage>

                {/* Metadatos (solo cuando no está cargando) */}
                {!msg.pending && (
                  <>
                    <SuggestionChips
                      suggestions={uiSuggestions}
                      onSelect={handleSuggestionClick}
                      disabled={isBusy}
                    />
                    <AgentRoleBadges internalMessages={msg.internalMessages || []} />
                    <FeedbackButtons
                      sessionId={msg.sessionId}
                      messageId={msg.messageId}
                      rated={isRated}
                      onRate={rateMessage}
                    />
                  </>
                )}
              </div>
            )
          })}

          {/* Anchor de scroll */}
          <div ref={messagesEndRef} />
        </ChatContainer>

        {/* ── Previsualización de imágenes adjuntas ── */}
        {attachedImages.length > 0 && (
          <div className="flex gap-2 px-4 pt-3 border-t border-gray-100 bg-white flex-shrink-0">
            {attachedImages.map((img, i) => (
              <div key={`attach-${i}`} className="relative group flex-shrink-0">
                <img
                  src={img.preview}
                  alt={img.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-xs"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Eliminar imagen ${img.name}`}
                >
                  <CloseIcon style={{ fontSize: 12 }} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Área de input ── */}
        <div className="border-t border-gray-200 bg-white px-4 pt-3 pb-4 flex-shrink-0">
          <div className="flex items-end gap-2">

            {/* Botón adjuntar imagen */}
            <TooltipAtom content={attachedImages.length >= 2 ? 'Máximo 2 imágenes' : 'Adjuntar imagen'} position="top">
              <ButtonAtom
                variant="icon" intent="ghost" size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={attachedImages.length >= 2 || isBusy}
                aria-label="Adjuntar imagen"
                className="flex-shrink-0 self-end mb-0.5"
              >
                <AttachFileIcon />
              </ButtonAtom>
            </TooltipAtom>

            {/* Input de texto */}
            <MessageInput
              onSend={handleSend}
              placeholder={isBusy ? 'Esperando respuesta…' : 'Escribe un mensaje…'}
              disabled={isBusy}
              className="flex-1"
            />
          </div>

          {/* Input de archivo oculto */}
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* ── Footer disclaimer ── */}
        <div className="px-4 py-2 border-t border-gray-100 bg-white flex-shrink-0">
          <TextAtom variant="text-xs" className="text-gray-400 text-center leading-relaxed">
            {DISCLAIMER}
          </TextAtom>
        </div>
      </div>

      {/* ============================================================
          MODAL: Onboarding
      ============================================================ */}
      <Modal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        title="Bienvenida/o a ArchIA (ADD 3.0)"
        size="sm"
        footer={
          <ButtonAtom intent="primary" size="sm" onClick={() => setShowOnboarding(false)}>
            Entendido
          </ButtonAtom>
        }
      >
        <div className="flex flex-col gap-3">
          <TextAtom variant="text-sm" className="text-gray-600">
            ArchIA te guía con el método{' '}
            <strong className="text-gray-800">Attribute-Driven Design 3.0</strong>:
          </TextAtom>

          <ul className="flex flex-col gap-2 pl-1">
            {[
              ['ASR',      'Formula el escenario de atributo de calidad.'],
              ['Estilo',   'Pide estilos arquitectónicos adecuados para ese ASR.'],
              ['Tácticas', 'Selecciona tácticas que satisfacen ese ASR y estilo.'],
              ['Diagrama', 'Genera diagramas a partir del ASR + estilo + tácticas.'],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-2">
                <span className="inline-flex items-center justify-center w-14 h-5 rounded-full bg-brand-100 text-brand-700 text-body-xs font-semibold flex-shrink-0 mt-0.5">
                  {title}
                </span>
                <TextAtom variant="text-sm" className="text-gray-600 leading-snug">
                  {desc}
                </TextAtom>
              </li>
            ))}
          </ul>

          <TextAtom variant="text-sm" className="text-gray-500">
            Usa los botones de sugerencias bajo cada respuesta para seguir este flujo paso a paso.
          </TextAtom>
        </div>
      </Modal>

      {/* ============================================================
          MODAL: Mensajes internos del agente
      ============================================================ */}
      <Modal
        isOpen={openInternalDialog}
        onClose={() => setOpenInternalDialog(false)}
        title="Mensajes internos del turno"
        size="lg"
      >
        <div className="flex flex-col gap-4">

          {/* Fuentes RAG si existen */}
          {selectedRagSources.length > 0 && (
            <div className="rounded-lg border border-brand-100 bg-brand-25 p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <ScienceIcon style={{ fontSize: 16, color: 'var(--color-brand-600)' }} />
                <TextAtom variant="text-sm" weight="semibold" className="text-brand-700">
                  Fuentes RAG locales
                </TextAtom>
              </div>
              <ul className="flex flex-col gap-0.5 pl-2">
                {selectedRagSources.map((s, i) => (
                  <li key={i}>
                    <TextAtom variant="text-xs" className="text-brand-700">
                      • {s}
                    </TextAtom>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Lista de mensajes internos */}
          {selectedInternalMessages.map((m, i) => (
            <div key={i} className="flex flex-col gap-1">
              <TextAtom variant="text-xs" weight="semibold" className="text-brand-600 font-mono uppercase">
                {m.name || m.role || 'system'}
              </TextAtom>
              <div className="rounded-md bg-gray-50 border border-gray-100 px-3 py-2">
                <TextAtom variant="text-xs" className="text-gray-700 font-mono whitespace-pre-wrap break-words">
                  {m.content}
                </TextAtom>
              </div>
            </div>
          ))}
        </div>
      </Modal>

    </div>
  )
}
