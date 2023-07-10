<script lang="ts">
  import type { Languages } from '~/store/snippets'

  export let name: string
  export let tags: string[]
  export let lang: Languages

  export let selected: boolean = false
</script>

<div
  class="group cursor-pointer select-none p-2 data-[selected=true]:bg-cyan-950 data-[selected=true]:hover:bg-cyan-900 data-[selected=true]:text-cyan-100 hover:bg-slate-700 m-2 rounded-lg"
  data-selected={selected}
>
  <div class="flex justify-between items-start">
    <h3 class="text-lg font-bold -mb-1">{name}</h3>
    <!-- TODO: Use language icon here -->
    <div>{lang}</div>
  </div>

  <span
    class="text-sm text-slate-400 group-data-[selected=true]:text-cyan-500 saturate-50"
    >{tags.join(', ')}</span
  >
</div>
