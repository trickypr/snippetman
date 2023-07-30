<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Fuse from 'fuse.js'

  import { createTag, getTags, type Tag } from '~/store/tags'
  import { clickOutside } from '~/utils/clickOutside'
  import TagPickerItem from './TagPickerItem.svelte'

  export let existingTags: Tag[]

  let open = false

  let inputRef
  let search = ''
  let selectedIndex = 0

  const dispatch = createEventDispatcher()
  const commandDispatch = (tag: Tag) => dispatch('add', tag)

  const isNotExistingTag = (tag: Tag) =>
    !existingTags.some((eTag) => eTag.id == tag.id)
  const indexed = <T,>(value: T, index: number) => ({
    ...value,
    index: index + 1,
  })
  const fuseFilter = (tags: Tag[], search: string) =>
    search != ''
      ? new Fuse(tags, {
          keys: ['name'],
          includeScore: true,
          useExtendedSearch: true,
        })
          .search(search)
          .map((res) => ({ ...res, ...res.item }))
      : tags

  // Tags
  let unfilteredTags = []
  let filteredTags = []

  ;(async () => (unfilteredTags = await getTags()))()
  $: filteredTags = fuseFilter(
    unfilteredTags.filter(isNotExistingTag),
    search,
  ).map(indexed)
</script>

<span
  use:clickOutside={{ enabled: open, cb: () => (open = false) }}
  class="inline-block"
>
  <div hidden={!open}>
    <input
      type="text"
      name="addTag"
      class="bg-slate-700 text-slate-50 rounded-md px-2 py-1 w-48 ml-2"
      bind:value={search}
      bind:this={inputRef}
      on:keydown={async (event) => {
        if (event.key === 'ArrowDown')
          return (selectedIndex = Math.min(
            selectedIndex + 1,
            filteredTags.length,
          ))

        if (event.key === 'ArrowUp')
          return (selectedIndex = Math.max(selectedIndex - 1, 0))

        if (event.key === 'Enter') {
          if (selectedIndex == 0) {
            const tag = await createTag(search)
            commandDispatch(tag)
            open = false
            return
          }

          commandDispatch(filteredTags[selectedIndex])
          open = false
        }

        selectedIndex = 0
      }}
    />

    <div class="relative">
      <div
        class="bg-slate-700 w-min p-1 rounded-md absolute top-1 shadow-md z-50"
      >
        <TagPickerItem
          select={selectedIndex === 0}
          on:trigger={async () => {
            const tag = await createTag(search)
            commandDispatch(tag)
            open = false
          }}
        >
          + Create "{search}"
        </TagPickerItem>

        {#each filteredTags as tag}
          <TagPickerItem
            select={selectedIndex === tag.index}
            on:trigger={() => {
              commandDispatch(tag)
              open = false
            }}
          >
            {tag.name}
          </TagPickerItem>
        {/each}
      </div>
    </div>
  </div>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <span
    class="cursor-pointer hover:bg-slate-700 rounded-full px-1.5 select-none"
    on:click={() => {
      open = true
      setTimeout(() => inputRef.focus(), 50)
    }}
    hidden={open}
  >
    +
  </span>
</span>
