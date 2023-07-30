<script lang="ts">
  import type { _LastSession } from 'resource://app/modules/sessionstore/SessionStore.sys.mjs'
  import { createEventDispatcher } from 'svelte'
  import { clickOutside } from '~/utils/clickOutside'

  export let id: string | undefined = undefined
  export let value: string
  export let options: { value: string; label: string }[] = []
  export let style: 'default' | 'darker' = 'default'

  let open = false

  $: selectedOption = options.find((option) => option.value === value)

  const dispatch = createEventDispatcher()

  function setOption(newValue: string) {
    value = newValue
    open = false

    dispatch('change', value)
  }
</script>

<span
  use:clickOutside={{ enabled: open, cb: () => (open = false) }}
  class="inline-block"
  {id}
>
  <button
    class={`${
      style == 'default' ? 'bg-slate-700' : 'bg-slate-800'
    } py-1 px-2 rounded-md flex`}
    on:click={() => (open = !open)}
  >
    <span>
      {selectedOption.label}
    </span>
    <span class="ml-1 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="h-5 w-5 text-slate-400 data-[open=true]:rotate-180 transition-transform"
        fill="currentColor"
        data-open={open}
      >
        <path
          d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"
        />
      </svg>
    </span>
  </button>

  <div class="relative">
    <div
      role="listbox"
      tabindex="0"
      hidden={!open}
      class={`${
        style == 'default' ? 'bg-slate-700' : 'bg-slate-800'
      } w-min p-1 rounded-md absolute top-1 shadow-md z-50`}
    >
      {#each options as option}
        <!-- svelte-ignore a11y-interactive-supports-focus -->
        <div
          role="option"
          aria-selected={option.value == value}
          class={`px-2 py-1 mb-1 last:mb-0 rounded cursor-pointer whitespace-nowrap ${
            style == 'default'
              ? 'aria-selected:bg-slate-800 hover:bg-slate-800'
              : 'aria-selected:bg-slate-700 hover:bg-slate-700'
          }`}
          on:click={() => setOption(option.value)}
          on:keydown={(event) =>
            event.key === 'Enter' && setOption(option.value)}
        >
          {option.label}
        </div>
      {/each}
    </div>
  </div>
</span>
