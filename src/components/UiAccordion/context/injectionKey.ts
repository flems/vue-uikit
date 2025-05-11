import type { InjectionKey } from 'vue'
import type { AccordionItemContext, IAccordionRootCotext } from './types'

export const AccordionItemContextKey: InjectionKey<AccordionItemContext> =
  Symbol('AccordionItemContext')
export const AccordionRootContextKey: InjectionKey<IAccordionRootCotext> =
  Symbol('AccordionRootContextKey')
