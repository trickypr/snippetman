<script lang="ts">
  import { nanoid } from 'nanoid'

  export let title: string

  export let open: boolean = true
  const id: string = nanoid()
</script>

<div
  class="text-xs text-slate-300"
  on:click={() => (open = !open)}
  on:keydown={(e) => {
    if (e.key === 'Enter') {
      open = !open
    }
  }}
  tabindex="0"
  role="treeitem"
  aria-selected={open}
  aria-expanded={open}
  aria-owns={`${id}-group`}
>
  {title}
</div>

<div role="group" id={`${id}-group`} hidden={!open}><slot /></div>
