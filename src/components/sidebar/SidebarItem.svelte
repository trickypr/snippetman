<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let selected: boolean = false

  const dispatch = createEventDispatcher()
  const commandDispatch = () => dispatch('command')
</script>

<div
  role="treeitem"
  tabindex="0"
  aria-selected={selected}
  class="p-1 px-1.5 capitalize hover:bg-slate-700 rounded text-sm cursor-pointer select-none aria-selected:bg-slate-700 aria-selected:hover:bg-slate-600"
  on:click={commandDispatch}
  on:keydown={commandDispatch}
>
  <slot />
</div>
