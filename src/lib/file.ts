export function download(data: string, fileName: string, type: string) {
  const file = new Blob([data], { type: type });
  const a = document.createElement('a'),
    url = URL.createObjectURL(file);
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}
