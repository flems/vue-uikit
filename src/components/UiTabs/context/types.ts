import type { Ref } from 'vue'

interface ITab {
  name: string
  node: HTMLElement
}

type TActiveTab = string | undefined

interface ITabsContext {
  activeTab: Ref<TActiveTab>
  setActiveTab: (name: TActiveTab) => void
  registerTab: (tab: ITab) => void
  unregisterTab: (tab: ITab) => void
  tabList: Ref<ITab[]>
}

export type { ITab, TActiveTab, ITabsContext }
