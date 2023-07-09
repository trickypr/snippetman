<script lang="ts">
  let lazy: any = {}
  ;(ChromeUtils as any).defineESModuleGetters(lazy, {
    BrowserToolboxLauncher:
      'resource://devtools/client/framework/browser-toolbox/Launcher.sys.mjs',
  })

  function handleReloadClick(event: MouseEvent) {
    window.location.reload()
  }

  function handleOpenDevtoolsClick(event: MouseEvent) {
    lazy.BrowserToolboxLauncher.init()
  }
</script>

<h1 class="underline">Hello test</h1>

<button on:click={handleReloadClick}>Reload</button>
<button on:click={handleOpenDevtoolsClick}>Open Devtools</button>
