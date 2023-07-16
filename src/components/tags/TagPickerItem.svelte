<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let select: boolean

  const dispatch = createEventDispatcher()
  const triggerDispatch = () => dispatch('trigger')
</script>

<div
  role="option"
  tabindex="0"
  class="whitespace-nowrap hover:bg-slate-800 px-2 py-1 rounded cursor-pointer aria-selected:bg-slate-800 border border-slate-700 aria-selected:border-cyan-900"
  aria-selected={select}
  on:click={triggerDispatch}
  on:keydown={(event) => {
    if (event.key === 'Enter') triggerDispatch()
  }}
>
  <slot />
</div>
