import { toast } from "sonner"

export function useToast() {
  const showToast = (type: "success" | "error" | "info" | "warning", message: string) => {
    switch (type) {
      case "success":
        toast.success(message)
        break
      case "error":
        toast.error(message)
        break
      case "info":
        toast.info(message)
        break
      case "warning":
        toast.warning(message)
        break
      default:
        toast(message)
    }
  }

  return { showToast }
}
