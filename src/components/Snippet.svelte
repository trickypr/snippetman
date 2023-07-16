<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import { XMark } from '@steeze-ui/heroicons'

  import Tags from './tags/TagPicker.svelte'
  import Select from '~/components/Select.svelte'

  import { openSnippetId } from '~/store/appState'
  import { getSnippet, languages, type Snippet } from '~/store/snippets'
  import { addTag, removeTag, type Tag } from '~/store/tags'

  let snippet: (Snippet & { tags: Tag[] }) | null = null
  $: (async () => (snippet = await getSnippet($openSnippetId)))()
</script>

{#if $openSnippetId == null}
  <div class="h-full flex items-center content-center">
    <h2 class="text-2xl font-bold text-center">No snippet selected</h2>
  </div>
{:else if snippet != null}
  <h2 class="text-2xl font-bold">{snippet.title}</h2>

  <div>
    <Select
      value={'html'}
      options={languages.map((lang) => ({ value: lang, label: lang }))}
    />

    <span class="border-l border-l-slate-700 h-4 mx-1" />

    {#each snippet.tags as tag}
      <span
        class="ml-1 px-1.5 bg-slate-700 text-slate-50 rounded-full inline-flex items-center gap-1"
      >
        {tag.name}

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span
          class="select-none cursor-pointer hover:bg-slate-600 rounded-full"
          on:click={async () => {
            await removeTag(snippet.id, tag.id)
            snippet = await getSnippet(snippet.id)
          }}
        >
          <Icon src={XMark} theme="mini" class="h-4" />
        </span>
      </span>
    {/each}

    <Tags
      existingTags={snippet.tags}
      on:add={async (tag) => {
        await addTag(snippet.id, tag.detail.id)
        snippet = await getSnippet(snippet.id)
      }}
    />
  </div>

  <div class="grow mt-4">
    <!-- {#await import('./components/Editor.svelte') then Editor}
      <Editor.default />
    {/await} -->
  </div>
{/if}
