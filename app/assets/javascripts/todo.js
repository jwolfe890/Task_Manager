jQuery(document).on('ready page:load', function() {
  
    $(window).on("load", function() {
      loadPage()
    })

    $(document).on('load', function() {
        loadPage()
    })

  $('form.new_todo').on('submit', function (e) {
      var url = "/todos";
      $.ajax({
        type: "POST",
        url: url,
        data: $("#new_todo").serialize(),
        success: function(todo)
        {
          $("#todo_name").val("")
          $("#todo_location").val("")
          $("#todo_date").val("")
          if (todo.complete) {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.completeIndex()
              $('.todo-list').append(todoHtml)
            } else {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.incompleteIndex()
              $('.todo-list').append(todoHtml)
          }
        }
      });
      e.preventDefault()
      return false;
    })

  $(document).on("click", ".editB", function(e) {
      e.preventDefault()
      let id = e.target.id
      let event = e
      $.ajax({
        type: "GET",
        url: `/todos.json`,
        success: function(todos) {
          $(".todo-list").html("")
          todos.forEach(todo => {
            if (todo.id == id) {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.formatEdit()
              $('.todo-list').append(todoHtml)
              document.getElementById("date").value = todo.date.match(/^(.*?)T/)[1]
            } else {
              if (todo.complete) {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.completeIndex()
              $('.todo-list').append(todoHtml)
            } else {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.incompleteIndex()
              $('.todo-list').append(todoHtml)
            }
            }
          })

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
          if (todo.complete) {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.completeIndex()
              $('.todo-list').append(todoHtml)
            } else {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.incompleteIndex()
              $('.todo-list').append(todoHtml)
            }
          })
        }
      })
    },
  })
  })

  $(document).on("click", ".deleteB", function(e) {
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

  $(document).on("click", ".toggle", function(e) {  
    e.preventDefault()
    let id = e.target.value 
        $.ajax({
        type: "PUT",
        url: `/todos/${id}`,
        data: {
          'todo': {
            'name': "hello world",
            'id' : id, 
            'condition': true 
          }
        },
        success: function(todos) {
          $(".todo-list").html("")
          todos.forEach(todo => {
            if (todo.complete) {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.completeIndex()
              $('.todo-list').append(todoHtml)
            } else {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.incompleteIndex()
              $('.todo-list').append(todoHtml)
            }
          })
        }
      })
  })

// -------------------------------------
// FUNCTIONS AND PROTOTYPE FUNCTIONS

  function loadPage() {
      $(".todo-list").html("")
      fetch(`/todos.json`)
      .then(res => res.json()) 
      .then(todos => {
        todos.forEach(todo => {
          if (todo.complete) {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.completeIndex()
              $('.todo-list').append(todoHtml)
            } else {
              let newTodo = new Todo(todo)
              let todoHtml = newTodo.incompleteIndex()
              $('.todo-list').append(todoHtml)
          }
        })
      })
  }

  function Todo(todo) {

  if (todo.date != null) {

    let d = ""
    let d2 = ""
    let d3 = ""  

    d = todo.date
    d2 = new Date(d)
    d3 = d2.toDateString().replace(" ", ", ")   
    this.dateTime = d3   
    this.date = todo.date

    this.id = todo.id
    this.name = todo.name
    this.location = todo.location

    debugger

  } else { 
      
    this.id = todo.id
    this.name = todo.name
    this.location = todo.location
    this.dateTime = ""
    
    }

  }

  Todo.prototype.completeIndex = function() {
    let todoHtml = `
    <li class="completed">
      <div class="view">
        <form class="new_todo" id="new_todo2" action="/todos" accept-charset="UTF-8" method="post">
          <input name="utf8" type="hidden" value="✓">
          <input name="todo[status]" type="hidden" value="0">
          <input class="toggle" type="checkbox" value="${this.id}" name="todo[status]" id="todo_status" checked="checked">
       </form>          
          <label>${this.name}</label>
          <label>${this.dateTime}</label>
          <label>${this.location}</label>
          <input type="button" id="${this.id}" value="Delete" class="deleteB"/>
          <input type="button" id="${this.id}" value="Edit" class="editB"/>
      </div>
    </li>
    `
    return todoHtml
  }

  Todo.prototype.incompleteIndex = function() {
    let todoHtml = `
    <li>
      <div class="view">
        <form class="new_todo" id="new_todo2" action="/todos" accept-charset="UTF-8" method="post">
          <input name="utf8" type="hidden" value="✓">
          <input name="todo[status]" type="hidden" value="0">
          <input class="toggle" type="checkbox" value="${this.id}" name="todo[status]" id="todo_status">
       </form>          
          <label>${this.name}</label>
          <label>${this.dateTime}</label>
          <label>${this.location}</label>
          <input type="button" id="${this.id}" value="Delete" class="deleteB"/>
          <input type="button" id="${this.id}" value="Edit" class="editB"/>
      </div>
    </li>
    `
    return todoHtml
  }

  Todo.prototype.formatEdit = function() {
    let todoHtml = `
      <li>
      <div class="view">
      <form class="edit_todo">
         <input name="utf8" type="hidden" value="✓">
         <input type="hidden" name="todo[id]" value="${this.id}" id="todo_id">
         <label>
           <input type="text" value="${this.name}" name="todo[name]" id="todo_name" autofocus="autofocus">
           <input value="${this.date}" name="todo[date]" id="date" type="date">
           <input type="text" value="${this.location}" name="todo[location]" id="todo_name"> 
         </label>
         <input type="submit" name="commit" value="Update Todo" class="updateB">
      </form>
      </div>
      </li>
    `
    return todoHtml
  }


})