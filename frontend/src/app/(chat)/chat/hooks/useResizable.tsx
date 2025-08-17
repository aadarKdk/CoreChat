// CoreChat/frontend/src/app/(chat)/chat/hooks/useResizable.tsx

"use client"

import type React from "react";

import { useState, useCallback, useRef, useEffect } from "react"

export function useResizable(initialWidth: number, minWidth = 200, maxWidth = 600, reverse = false) {
  const [width, setWidth] = useState(initialWidth)
  const [isResizing, setIsResizing] = useState(false)
  const startXRef = useRef(0)
  const startWidthRef = useRef(initialWidth)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsResizing(true)
      startXRef.current = e.clientX
      startWidthRef.current = width
      e.preventDefault()
    },
    [width],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return

      const deltaX = e.clientX - startXRef.current
      // For ChatInfoPanel (reverse=true), we want dragging left to increase width
      const adjustedDelta = reverse ? -deltaX : deltaX
      const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidthRef.current + adjustedDelta))
      setWidth(newWidth)
    },
    [isResizing, minWidth, maxWidth, reverse],
  )

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  return { width, handleMouseDown, isResizing }
}
