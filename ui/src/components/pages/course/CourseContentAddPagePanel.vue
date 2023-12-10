<template>
      <div
    class="add-page-panel bg-gray-900 bg-opacity-50 flex justify-center items-center absolute top-0 left-0 w-screen h-screen z-50"
  >
    <div
      class="add-page-modal w-1/2 h-2/3 bg-white rounded-sm border shadow-sm"
    >
      <form class="flex flex-col justify-between h-full">
        <div class="modal-header p-2 flex flex-row justify-between">
          <div class="text-lg">Add a module</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <hr />
        <div class="modal-body p-2 flex-1">
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            v-model="module_name"
            placeholder="Module name"
          />
        </div>
        <hr />
        <div class="modal-footer bg-gray-200 p-2 flex flex-row-reverse">
          <button
            type="submit"
            class="add-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 focus:outline-none"
          >
            New module
          </button>
          <button
            type="button"
            class="cancel-btn mr-2 text-white bg-white text-gray-900 border hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
    export default{
        name: "CourseContentAddPagePanel",
        setup(){
            
        }
    }
</script>