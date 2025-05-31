"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DrawerContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DrawerContext = React.createContext<DrawerContextType | undefined>(undefined)

const useDrawer = () => {
  const context = React.useContext(DrawerContext)
  if (!context) {
    throw new Error("useDrawer must be used within a Drawer")
  }
  return context
}

interface DrawerProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  shouldScaleBackground?: boolean
}

const Drawer = ({ children, open: controlledOpen, onOpenChange, shouldScaleBackground = true }: DrawerProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const handleOpenChange = onOpenChange || setInternalOpen

  return <DrawerContext.Provider value={{ open, onOpenChange: handleOpenChange }}>{children}</DrawerContext.Provider>
}

const DrawerTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { onOpenChange } = useDrawer()

    return (
      <button ref={ref} className={className} onClick={() => onOpenChange(true)} {...props}>
        {children}
      </button>
    )
  },
)
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerPortal = ({ children }: { children: React.ReactNode }) => {
  const { open } = useDrawer()

  if (!open) return null

  return <div className="fixed inset-0 z-50">{children}</div>
}

const DrawerClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { onOpenChange } = useDrawer()

    return (
      <button ref={ref} className={className} onClick={() => onOpenChange(false)} {...props}>
        {children}
      </button>
    )
  },
)
DrawerClose.displayName = "DrawerClose"

const DrawerOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = useDrawer()

    return (
      <div
        ref={ref}
        className={cn("fixed inset-0 z-50 bg-black/80", className)}
        onClick={() => onOpenChange(false)}
        {...props}
      />
    )
  },
)
DrawerOverlay.displayName = "DrawerOverlay"

const DrawerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { open } = useDrawer()

    return (
      <DrawerPortal>
        <DrawerOverlay />
        <div
          ref={ref}
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background transition-transform duration-300 ease-in-out",
            open ? "translate-y-0" : "translate-y-full",
            className,
          )}
          {...props}
        >
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
          {children}
        </div>
      </DrawerPortal>
    )
  },
)
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
