"use client";

import { useEffect } from "react";

export default function DisableInspect() {
  useEffect(() => {
    // Jalankan proteksi (opsional: aktifkan di semua environment atau hanya saat production)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Disable tombol F12
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modifier = isMac ? (e.metaKey && e.altKey) : (e.ctrlKey && e.shiftKey);
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      // 2. Disable Ctrl+Shift+I / Cmd+Opt+I (Inspect Element)
      if (modifier && (e.key === "I" || e.key === "i" || e.keyCode === 73)) {
        e.preventDefault();
        return false;
      }

      // 3. Disable Ctrl+Shift+J / Cmd+Opt+J (Console)
      if (modifier && (e.key === "J" || e.key === "j" || e.keyCode === 74)) {
        e.preventDefault();
        return false;
      }

      // 4. Disable Ctrl+Shift+C / Cmd+Opt+C (Inspect Element Picker)
      if (modifier && (e.key === "C" || e.key === "c" || e.keyCode === 67)) {
        e.preventDefault();
        return false;
      }

      // 5. Disable Ctrl+U / Cmd+Opt+U (View Page Source)
      if ((ctrlOrCmd || (isMac && e.metaKey && e.altKey)) && (e.key === "U" || e.key === "u" || e.keyCode === 85)) {
        e.preventDefault();
        return false;
      }

      // 6. Disable Ctrl+S / Cmd+S (Save Page)
      if (ctrlOrCmd && (e.key === "S" || e.key === "s" || e.keyCode === 83)) {
        e.preventDefault();
        return false;
      }
    };

    // Prevent selection drag (opsional)
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
