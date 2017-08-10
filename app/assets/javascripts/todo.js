$(function() {

  // $("input.toggle").on("change", function() {
  //   $(this).parents("form").trigger("submit")
  // })

  $(window).on("load", function() {
     fetch(`/todos.json`)
      .then(res => res.json()) 
      .then(todos => {
        todos.forEach(todo => {
          let newTodo = new Todo(todo)
          let todoHtml = newTodo.formatIndex()
          $('.todo-list').append(todoHtml)
        })
      })
    })

  function loadPage() {
      fetch(`/todos.json`)
      .then(res => res.json()) 
      .then(todos => {
        todos.forEach(todo => {
          let newTodo = new Todo(todo)
          let todoHtml = newTodo.formatIndex()
          $('.todo-list').append(todoHtml)
        })
      })
  }

  $('form.new_todo').on('submit', function (e) {
      var url = "/todos";
      $.ajax({
        type: "POST",
        url: url,
        data: $("#new_todo").serialize(),
        success: function(data)
        {
          $("#todo_name").val("")
          $("#todo_location").html("")
          $("#todo_date").html("")
          let newTodo = new Todo(data)
          let todoHtml = newTodo.formatIndex()
          $('.todo-list').append(todoHtml)
        }
      });
      e.preventDefault()
      return false;
    }) 

  function Todo(todo) {
    this.id = todo.id
    this.name = todo.name
    this.location = todo.location 
    this.date = todo.date
  }

  Todo.prototype.formatIndex = function() {
    let todoHtml = `
    <li class="">
      <div class="view">
        <form class="new_todo" id="new_todo" action="/todos" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="70pEhOQimOzX8VG0JUpH4aFZsws4TSjqlEWxVIE/zinQeVreRnwYsLUYG7mC32F3vmLa9lcBqKKfGSDFLNklLQ==">
          <input name="todo[status]" type="hidden" value="0"><input class="toggle" type="checkbox" value="${this.id}" name="todo[status]" id="todo_status">
      </form>          
          <label>${this.name}</label>
          <input type="button" id="${this.id}" value="Delete" class="ugh2"/>
          <input type="button" id="${this.id}" value="Edit" class="ugh3"/>
      </div>
    </li>
    `
    return todoHtml
  }

  $(document).on("click", ".ugh2", function(e) {
      if (confirm('Are you sure?')) {
      let id = e.target.id
      $.ajax({
        type: "DELETE",
        url: `/todos/${id}`,
        success: function(response) {
        }
      })
    }
  })



})

