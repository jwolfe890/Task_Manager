jQuery(document).on('ready page:load', function() {


// $(function() {

  // $("input.toggle").on("change", function() {
  //   $(this).parents("form").trigger("submit")
  // })

  // $('.new-todo').on("click", function() {
  //    $(".todo-list").html("")
  //    fetch(`/todos.json`)
  //     .then(res => res.json()) 
  //     .then(todos => {
  //       todos.forEach(todo => {
  //         let newTodo = new Todo(todo)
  //         let todoHtml = newTodo.formatIndex()
  //         $('.todo-list').append(todoHtml)
  //       })
  //     })
  //   })

  $(window).on("load", function() {
     $(".todo-list").html("")
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
      $(".todo-list").html("")
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

    $(document).on('load', function() {
      $.ajax({
        type: "GET",
        url: '/todos.json',
        success: function(todos) {
          todos.forEach(todo => {
            let newTodo = new Todo(todo)
            let todoHtml = newTodo.formatIndex()
            $('.todo-list').append(todoHtml)
          })
        }
      })
    })

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

  $(document).on("click", ".ugh3", function(e) {
      e.preventDefault()
      let id = e.target.id
      let event = e
      $.ajax({
        type: "GET",
        url: `/todos/${id}`,
        success: function(response) {
            let newTodo = new Todo(response)
            let todoHtml = newTodo.formatEdit()
            $('.todo-list').append(todoHtml)
        }
      })
  })

  $(document).on('submit', '.edit_todo', function(e) {
        let id = $("#todo_id").val() 
        e.preventDefault()
        $.ajax({
        type: "PUT",
        url: `/todos/${id}`,
        data: $(".edit_todo").serialize(),
        success: function(response) {
          console.log(response)
          $(".todo-list").html("")
            $.ajax({
            type: "GET",
            url: '/todos.json',
            success: function(todos) {
              todos.forEach(todo => {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.formatIndex()
              $('.todo-list').append(todoHtml)
          })
        }
      })
      },
    })
  })

  $(document).on("click", ".ugh2", function(e) {
      if (confirm('Are you sure?')) {
      let id = e.target.id
      $.ajax({
        type: "DELETE",
        url: `/todos/${id}`,
        success: function(response) {
        },
        complete: function(data){
          loadPage()
        }
      })
    }
    })

  $(document).on("click", ".ugh3", function(e) {
      let id = e.target.id
      $.ajax({
        type: "DELETE",
        url: `/todos/${id}`,
        success: function(response) {
        },
        complete: function(data){
          loadPage()
        }
      })
  })

    function Todo(todo) {
    this.id = todo.id
    this.name = todo.name
    this.location = todo.location 
    this.date = todo.date
  }

  Todo.prototype.formatIndex = function() {
    let todoHtml = `
    <li class="${this.id}">
      <div class="view">
        <form class="new_todo" id="new_todo2" action="/todos" accept-charset="UTF-8" method="post">
          <input name="utf8" type="hidden" value="✓">
          <input name="authenticity_token" type="hidden" value="token_value">
          <input name="todo[status]" type="hidden" value="0">
          <input class="toggle" type="checkbox" value="${this.id}" name="todo[status]" id="todo_status">
       </form>          
          <label>${this.name}</label>
          <input type="button" id="${this.id}" value="Delete" class="ugh2"/>
          <input type="button" id="${this.id}" value="Edit" class="ugh3"/>
      </div>
    </li>
    `
    return todoHtml
  }

  Todo.prototype.formatEdit = function() {
    let todoHtml = `
      <li class="${this.id}">
      <div class="view">
      <form class="edit_todo">
         <input name="utf8" type="hidden" value="✓">
         <input name="authenticity_token" type="hidden" value="token_value">
         <input type="hidden" name="todo[id]" value="${this.id}" id="todo_id">
         <label><input type="text" value="${this.name}" name="todo[name]" id="todo_name"></label>
         <input type="submit" name="commit" value="Update Todo">
      </form>
      </div>
      </li>
    `
    return todoHtml
  }

})



