export function openDialog(url: string) {
  Services.ww.openWindow(
    null,
    url,
    '_blank',
    [
      'dialog',
      'resizable',
      'minimizable',
      'centerscreen',
      'titlebar',
      'close',
    ].join(','),
    []
  )
}
