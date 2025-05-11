import type { Ref } from 'vue'

interface IAccordionItem {
  name: string
}

interface IAccordionRootCotext {
  toggleOpenedItems: (name: string) => void
  openedItems: Ref<string[]>
  accList: Ref<IAccordionItem[]>
  registerItem: (item: IAccordionItem) => void
  unregisterItem: (item: IAccordionItem) => void
}

interface AccordionItemContext {
  name: string
  toggle: (state?: boolean) => void
  isOpen: Ref<boolean>
}

export type { IAccordionItem, IAccordionRootCotext, AccordionItemContext }
