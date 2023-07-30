<script lang="ts">
  import Select from '~/components/Select.svelte'

  import { currentTheme, settingsOpen } from '~/store/appState'
  import { themeImports } from '~/themes'
  import { hexToRgbArray, normalize, toHex } from '~/utils/tailwind-shades'
  import { openDialog } from '~/utils/window'

  let dialog: HTMLDialogElement
  let color: string = '#f0b97a'

  $: if ($settingsOpen && dialog) dialog.showModal()
  $: out = handle(color)

  function handle(color: string) {
    try {
      return toHex(normalize(hexToRgbArray(color)))
    } catch {
      return [0, 0, 0]
    }
  }
</script>

<dialog
  bind:this={dialog}
  on:close={() => settingsOpen.set(false)}
  class="text-slate-100 bg-slate-700 p-2 rounded-2xl w-3/4 shadow-lg h-3/4 border border-slate-600 relative backdrop:bg-slate-900 backdrop:backdrop-blur-sm"
>
  <h1 class="font-bold text-2xl -mt-1.5">Settings</h1>

  <div>
    <label for="theme_selector" class="block mb-1 mt-2">Theme</label>
    <Select
      id="theme_selector"
      style="darker"
      value={$currentTheme.id}
      options={Object.keys(themeImports).map((theme) => ({
        value: theme,
        label: theme,
      }))}
      on:change={async (e) => currentTheme.set(await themeImports[e.detail]())}
    />
  </div>

  <form method="dialog" class="absolute bottom-0 right-0 p-2">
    <button class="btn btn--text" on:click={(_) => openDialog('about:config')}
      >Advanced</button
    >
    <button class="btn btn--solid">Close</button>
  </form>
</dialog>
