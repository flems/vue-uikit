import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'

import { UiTabLabel, UiTabs, UiTabList, UiTabPanel, UiTabListPanels } from '@/components/UiTabs'
import { nextTick } from 'vue'

describe('UiTabs Render', () => {
  it('renders the correct number of tabs', async () => {
    render(UiTabs, {
      global: {
        components: { UiTabLabel, UiTabList, UiTabPanel, UiTabListPanels },
      },
      slots: {
        default: `
          <ui-tab-list>
            <ui-tab-label name="tab1">Tab 1</ui-tab-label>
            <ui-tab-label name="tab2">Tab 2</ui-tab-label>
          </ui-tab-list>
          <ui-tab-list-panels>
            <ui-tab-panel name="tab1">Tab 1 Content</ui-tab-panel>
            <ui-tab-panel name="tab2">Tab 2 Content</ui-tab-panel>
          </ui-tab-list-panels>
        `,
      },
    })

    await nextTick()
    const tabLabels = screen.getAllByRole('tab')
    const tabPanels = screen.getAllByRole('tabpanel', { hidden: true })

    // check count
    expect(tabLabels).toHaveLength(2)
    expect(tabPanels).toHaveLength(2)

    // check active class
    expect(tabLabels[0]).toHaveClass('is-active')
    expect(tabLabels[1]).not.toHaveClass('is-active')

    // check accessibility
    expect(tabLabels[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabLabels[1]).toHaveAttribute('aria-selected', 'false')
    expect(tabLabels[0]).toHaveAttribute('aria-controls', 'panel-tab1')
    expect(tabLabels[1]).toHaveAttribute('aria-controls', 'panel-tab2')
    expect(tabLabels[0]).toHaveAttribute('id', 'tab-tab1')
    expect(tabLabels[1]).toHaveAttribute('id', 'tab-tab2')
    expect(tabPanels[0]).toHaveAttribute('id', 'panel-tab1')
    expect(tabPanels[1]).toHaveAttribute('id', 'panel-tab2')

    // check content
    expect(tabLabels[0]).toHaveTextContent('Tab 1')
    expect(tabLabels[1]).toHaveTextContent('Tab 2')
    // expect(tabPanels[0]).toHaveTextContent('Tab 1 Content')
    expect(tabPanels[1]).toHaveTextContent('Tab 2 Content')

    // check panel visible
    expect(tabPanels[0]).toBeVisible()
    expect(tabPanels[1]).not.toBeVisible()
  })
})

describe('UiTabs Interaction', () => {
  it('switches tabs on click', async () => {
    const user = userEvent.setup()

    render(UiTabs, {
      global: {
        components: { UiTabLabel, UiTabList, UiTabPanel, UiTabListPanels },
      },
      slots: {
        default: `
          <ui-tab-list>
            <ui-tab-label name="tab1">Tab 1</ui-tab-label>
            <ui-tab-label name="tab2">Tab 2</ui-tab-label>
          </ui-tab-list>
          <ui-tab-list-panels>
            <ui-tab-panel name="tab1">Tab 1 Content</ui-tab-panel>
            <ui-tab-panel name="tab2">Tab 2 Content</ui-tab-panel>
          </ui-tab-list-panels>
        `,
      },
    })

    await nextTick()
    const tabLabels = screen.getAllByRole('tab')
    const tabPanels = screen.getAllByRole('tabpanel', { hidden: true })

    expect(tabPanels[0]).toBeVisible()
    expect(tabPanels[1]).not.toBeVisible()

    await user.click(tabLabels[1])

    expect(tabLabels[0]).not.toHaveClass('is-active')
    expect(tabLabels[1]).toHaveClass('is-active')
    expect(tabPanels[0]).not.toBeVisible()
    expect(tabPanels[1]).toBeVisible()
  })
})

// to do
// - проверить lazy
// - проверить стрелки/скролл и все вокруг
