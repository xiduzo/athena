export interface IModalBase {
  isOpen: boolean
  onClose?: <T>({ ...args }?: T) => void
}
