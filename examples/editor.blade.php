{{-- examples/editor.blade.php --}}
<div class="w-full text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
  {{-- toolbar --}}
  <div class="z-10 px-3 py-2 bg-white border-b border-gray-200 rounded-t-lg dark:border-gray-600">
    {{-- ... keep your existing toolbar HTML here exactly ... --}}
  </div>

  {{-- editor mount --}}
  <div class="px-3 bg-white rounded-b-lg dark:bg-gray-800">
    <div id="content-editor" class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white"></div>
  </div>
</div>
