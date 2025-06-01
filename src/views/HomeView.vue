<script setup lang="ts">
import { ref } from 'vue'
import type { TTabsTheme } from '@/components/UiTabs/context/types'
const activeTab = ref<string>('tab1')
// const count = ref(16)

const tabList = ref([
  {
    id: 1,
    name: 'Tab 1',
    disabled: false,
  },
  {
    id: 2,
    name: 'Tab 2',
    disabled: true,
  },
  {
    id: 3,
    name: 'Tab 3',
    disabled: false,
  },
  {
    id: 4,
    name: 'Tab 4',
    disabled: false,
  },
  {
    id: 5,
    name: 'Tab 5',
    disabled: false,
  },
  {
    id: 6,
    name: 'Tab 6',
    disabled: false,
  },
  {
    id: 7,
    name: 'Tab 7',
    disabled: false,
  },
  {
    id: 8,
    name: 'Tab 8',
    disabled: false,
  },
  {
    id: 9,
    name: 'Tab 9',
    disabled: false,
  },
  {
    id: 10,
    name: 'Tab 10',
    disabled: false,
  },
  {
    id: 11,
    name: 'Tab 11',
    disabled: false,
  },
  {
    id: 12,
    name: 'Tab 12',
    disabled: false,
  },
  {
    id: 13,
    name: 'Tab 13',
    disabled: false,
  },
  {
    id: 14,
    name: 'Tab 14',
    disabled: false,
  },
  {
    id: 15,
    name: 'Tab 15',
    disabled: false,
  },
])

const onTabChange = (val: string | undefined) => {
  console.log(val)
}

const theme = ref<TTabsTheme>('vertical')
</script>

<template>
  <main>
    activeTab: {{ activeTab }} <br /><br />

    <ui-tabs :theme="theme" v-model="activeTab" @update:active-tab="onTabChange">
      <ui-tab-list>
        <ui-tab-label
          v-for="(tab, i) in tabList"
          :key="i"
          :name="`tab${tab.id}`"
          :disabled="tab.disabled"
        >
          {{ tab.name }}
        </ui-tab-label>
      </ui-tab-list>
      <ui-tab-list-panels>
        <template v-for="(tab, i) in tabList" :key="i">
          <ui-tab-panel lazy :name="`tab${tab.id}`">
            Panel {{ tab.name }} <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo deleniti labore, quam
            numquam praesentium minus voluptate repellendus omnis, vitae accusamus, pariatur eum
            corrupti hic quae sequi facere itaque adipisci aliquid consectetur optio animi quisquam!
            Ea id suscipit architecto eum, esse voluptas obcaecati eveniet quod distinctio assumenda
            ipsa inventore modi nesciunt rem, accusantium ducimus dolor adipisci amet aliquid
            voluptatibus voluptatum libero animi officiis. Quibusdam debitis ipsa doloribus fugit
            consectetur repellat quo, neque porro quam labore! Error commodi nihil placeat quisquam
            possimus omnis molestias suscipit fuga deserunt? Exercitationem quidem nam, cupiditate
            voluptates quasi ratione ipsum necessitatibus ut nisi suscipit autem facere voluptate
            tenetur eos aliquam, culpa omnis nesciunt mollitia voluptatem sequi natus? Adipisci
            maiores, sunt numquam dolorum quam quia doloremque suscipit modi error voluptatem,
            assumenda fugit commodi eius deleniti illo eveniet ea quasi! Ex, omnis ipsam. Harum
            suscipit ducimus expedita optio pariatur fugit nemo voluptatibus ea adipisci et.
            Expedita accusamus et quod molestias velit amet voluptates incidunt commodi optio.
            Maiores a culpa beatae ipsam ad excepturi voluptate similique dolor rerum consectetur
            nam consequatur numquam est cum, cumque aliquid. Officia quasi est ad sint consectetur,
            veritatis, exercitationem praesentium quidem alias libero quisquam deserunt cumque.
            Voluptatem, tempora. Ullam ad, saepe tempora commodi vero expedita itaque incidunt,
            velit magni error architecto maiores. Nam neque architecto commodi nemo vero quae dolor
            laborum ex facere rerum sint soluta, earum reiciendis, praesentium dicta porro saepe qui
            temporibus labore pariatur quod, aut quas fuga voluptate! Enim quod sit et eaque esse
            accusantium. Explicabo itaque vero ullam nisi neque dicta libero, laborum facere ab
            eveniet totam quas! Neque dolor, excepturi expedita illo corrupti incidunt, eos
            repudiandae rerum voluptatem, odit quaerat perspiciatis debitis. Nemo quisquam sed
            obcaecati eius ratione molestias corporis accusantium reprehenderit laudantium repellat
            labore, odit ipsam minus asperiores perspiciatis distinctio, ad nobis. Exercitationem
            maiores fugit nemo ullam excepturi ipsum repellat nobis voluptatibus nisi? Perspiciatis
            saepe eaque nisi labore a et, ipsa harum aliquid voluptates earum omnis unde natus,
            assumenda animi. Voluptatibus numquam explicabo vero, quasi nulla laborum eius sit
            reprehenderit quam ab est dolorem molestias! Blanditiis neque delectus veritatis eveniet
            fugit quisquam. Numquam iusto natus minus illum est ratione praesentium ipsum
            consequatur magnam? Doloremque tempore facere vitae, nesciunt tenetur laborum nulla
            voluptate soluta asperiores odit ullam, ad id dicta a? Reiciendis quibusdam eius sequi
            dolorum autem deleniti omnis harum veritatis temporibus. Voluptate accusamus quod,
            quidem hic nesciunt minus repudiandae quam commodi aliquid aliquam possimus nemo.
            Asperiores reiciendis harum saepe, ducimus, quos corrupti obcaecati dolorem et illo
            ipsam natus iste dolor repudiandae voluptatibus earum, quia delectus odit autem
            exercitationem hic error ipsa rerum consectetur assumenda. Consequuntur quod ex error
            libero minima eum nobis quaerat aperiam adipisci enim ducimus nesciunt, placeat ea
            reprehenderit? Delectus cupiditate, asperiores earum laboriosam iure, eum consequatur ex
            dicta quaerat quae corrupti totam expedita excepturi fugiat facilis. Adipisci
            consectetur, ullam necessitatibus quam praesentium magni incidunt asperiores sunt ad
            tempora velit distinctio alias consequuntur excepturi aliquid, nesciunt qui soluta
            eligendi voluptatem sed possimus atque. Vel ullam explicabo, impedit unde dicta,
            deleniti earum, atque molestiae reiciendis laboriosam obcaecati dolore.
          </ui-tab-panel>
        </template>
      </ui-tab-list-panels>
    </ui-tabs>

    <br />
    <br />
    <br />
    <br />
    <ui-tabs @update:active-tab="onTabChange">
      <ui-tab-list>
        <ui-tab-label
          v-for="(tab, i) in tabList"
          :key="i"
          :name="`tab${tab.id}`"
          :disabled="tab.disabled"
        >
          {{ tab.name }}
        </ui-tab-label>
      </ui-tab-list>
      <ui-tab-list-panels>
        <template v-for="(tab, i) in tabList" :key="i">
          <ui-tab-panel lazy :name="`tab${tab.id}`">
            Panel {{ tab.name }} <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo deleniti labore, quam
            numquam praesentium minus voluptate repellendus omnis, vitae accusamus, pariatur eum
            corrupti hic quae sequi facere itaque adipisci aliquid consectetur optio animi quisquam!
            Ea id suscipit architecto eum, esse voluptas obcaecati eveniet quod distinctio assumenda
            ipsa inventore modi nesciunt rem, accusantium ducimus dolor adipisci amet aliquid
            voluptatibus voluptatum libero animi officiis. Quibusdam debitis ipsa doloribus fugit
            consectetur repellat quo, neque porro quam labore! Error commodi nihil placeat quisquam
            possimus omnis molestias suscipit fuga deserunt? Exercitationem quidem nam, cupiditate
            voluptates quasi ratione ipsum necessitatibus ut nisi suscipit autem facere voluptate
            tenetur eos aliquam, culpa omnis nesciunt mollitia voluptatem sequi natus? Adipisci
            maiores, sunt numquam dolorum quam quia doloremque suscipit modi error voluptatem,
            assumenda fugit commodi eius deleniti illo eveniet ea quasi! Ex, omnis ipsam. Harum
            suscipit ducimus expedita optio pariatur fugit nemo voluptatibus ea adipisci et.
            Expedita accusamus et quod molestias velit amet voluptates incidunt commodi optio.
            Maiores a culpa beatae ipsam ad excepturi voluptate similique dolor rerum consectetur
            nam consequatur numquam est cum, cumque aliquid. Officia quasi est ad sint consectetur,
            veritatis, exercitationem praesentium quidem alias libero quisquam deserunt cumque.
            Voluptatem, tempora. Ullam ad, saepe tempora commodi vero expedita itaque incidunt,
            velit magni error architecto maiores. Nam neque architecto commodi nemo vero quae dolor
            laborum ex facere rerum sint soluta, earum reiciendis, praesentium dicta porro saepe qui
            temporibus labore pariatur quod, aut quas fuga voluptate! Enim quod sit et eaque esse
            accusantium. Explicabo itaque vero ullam nisi neque dicta libero, laborum facere ab
            eveniet totam quas! Neque dolor, excepturi expedita illo corrupti incidunt, eos
            repudiandae rerum voluptatem, odit quaerat perspiciatis debitis. Nemo quisquam sed
            obcaecati eius ratione molestias corporis accusantium reprehenderit laudantium repellat
            labore, odit ipsam minus asperiores perspiciatis distinctio, ad nobis. Exercitationem
            maiores fugit nemo ullam excepturi ipsum repellat nobis voluptatibus nisi? Perspiciatis
            saepe eaque nisi labore a et, ipsa harum aliquid voluptates earum omnis unde natus,
            assumenda animi. Voluptatibus numquam explicabo vero, quasi nulla laborum eius sit
            reprehenderit quam ab est dolorem molestias! Blanditiis neque delectus veritatis eveniet
            fugit quisquam. Numquam iusto natus minus illum est ratione praesentium ipsum
            consequatur magnam? Doloremque tempore facere vitae, nesciunt tenetur laborum nulla
            voluptate soluta asperiores odit ullam, ad id dicta a? Reiciendis quibusdam eius sequi
            dolorum autem deleniti omnis harum veritatis temporibus. Voluptate accusamus quod,
            quidem hic nesciunt minus repudiandae quam commodi aliquid aliquam possimus nemo.
            Asperiores reiciendis harum saepe, ducimus, quos corrupti obcaecati dolorem et illo
            ipsam natus iste dolor repudiandae voluptatibus earum, quia delectus odit autem
            exercitationem hic error ipsa rerum consectetur assumenda. Consequuntur quod ex error
            libero minima eum nobis quaerat aperiam adipisci enim ducimus nesciunt, placeat ea
            reprehenderit? Delectus cupiditate, asperiores earum laboriosam iure, eum consequatur ex
            dicta quaerat quae corrupti totam expedita excepturi fugiat facilis. Adipisci
            consectetur, ullam necessitatibus quam praesentium magni incidunt asperiores sunt ad
            tempora velit distinctio alias consequuntur excepturi aliquid, nesciunt qui soluta
            eligendi voluptatem sed possimus atque. Vel ullam explicabo, impedit unde dicta,
            deleniti earum, atque molestiae reiciendis laboriosam obcaecati dolore.
          </ui-tab-panel>
        </template>
      </ui-tab-list-panels>
    </ui-tabs>
  </main>
</template>
