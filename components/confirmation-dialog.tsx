"use client"

import { cn } from "@/lib/utils"
import { FC } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer"

interface ConfirmationDialogProps {
  open: boolean
  isMobile: boolean
  seconds: number
  title: string
  description: string
  variant?: "destructive" | "info"
  onSubmit: () => void
  onClose: () => void
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  isMobile,
  title,
  description,
  variant,
  seconds,
  onSubmit,
  onClose,
}) => {
  return isMobile ? (
    <Drawer open={open} onOpenChange={(isOpen) => (!isOpen ? onClose() : null)}>
      <DrawerContent className="min-h-[40vh]">
        <DrawerHeader>
          <DrawerTitle
            className={cn({ "text-destructive": variant === "destructive" })}
          >
            {title}
          </DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="border-t-2 lg:border-t-0">
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            disabled={seconds > 0}
            onClick={onSubmit}
          >
            {seconds > 0 ? seconds : "Confirm"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className={cn(
              { "text-destructive": variant === "destructive" },
              "text-start"
            )}
          >
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            disabled={seconds > 0}
            onClick={onSubmit}
            className="w-24"
          >
            {seconds > 0 ? seconds : "Confirmar"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
