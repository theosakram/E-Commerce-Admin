<template>
  <div class="card" v-if="task.category_id === categoryID">
    <div class="card-content">
      <div class="content">
        {{ task.title }}
        <br />
        <br />
        <time datetime="2016-1-1"> {{ task.due_date }} </time>
      </div>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" @click.prevent="next()">Next</a>
      <a
        class="card-footer-item"
        @click.prevent="toPage('editTaskPage')"
        :title="title"
        :due_date="due_date"
        >Edit</a
      >
      <a class="card-footer-item" @click.prevent="deleteTask()">Delete</a>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
