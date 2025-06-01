import type { Ref } from 'vue'

type TActiveTab = string | undefined

type TTabsTheme = 'horizontal' | 'vertical'

type TTabNode = HTMLElement | undefined

interface ITab {
  name: string
  disabled: boolean
  node: TTabNode
}

interface ITabsContext {
  activeTab: Ref<TActiveTab>
  setActiveTab: (name: TActiveTab) => void
  registerTab: (tab: ITab) => void
  unregisterTab: (tab: ITab) => void
  updateRegisteredTab: (tab: ITab) => void
  tabList: Ref<ITab[]>
  theme: TTabsTheme
}

export type { ITab, TActiveTab, ITabsContext, TTabsTheme, TTabNode }
