
$(function() {

  // $("input.toggle").on("change", function() {
  //   $(this).parents("form").trigger("submit")
  // })

  $('.new-todo').on("click", function() {

    debugger

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
    <li class="${this.id}">
      <div class="view">
        <form class="new_todo" id="new_todo2" action="/todos" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="70pEhOQimOzX8VG0JUpH4aFZsws4TSjqlEWxVIE/zinQeVreRnwYsLUYG7mC32F3vmLa9lcBqKKfGSDFLNklLQ==">
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

  // Todo.prototype.formatEdit = function() {
  //   let todoHtml = `
  //     <li class="${this.id}">
  //     <div class="view">
  //     <form class="edit_todo">
  //        <input name="utf8" type="hidden" value="✓">
  //        <input type="hidden" name="authenticity_token" value="nBtPJcHW3vUnsilMR5bBJ2PQ9UP9Q4ywy6nEQPm9n7mjKFF/Y4heqUVbY0HgA+exfOucvpIPDPjA9VXRVFt0vQ==">
  //        <input type="hidden" name="todo[id]" value="${this.id}">
  //        <label><input type="text" value="${this.name}" name="todo[name]" id="todo_name"></label>
  //        <input type="submit" name="commit" value="Update Todo">
  //     </form>
  //     </div>
  //     </li>
  //   `
  //   return todoHtml
  // }


 Todo.prototype.formatEdit = function() {
    let todoHtml = 
    `
   <li class=“${this.id}“>
   <div class=“view”>
    <form class ="editTodo onSubmit=getEd()">
      <label><input type="text" value="${this.name}" name="todo[name]" id="todo_name"></label>
      <input type="submit" name="commit" value="Update Todo">
    </form>
    </div>
    </li>
  `
    return todoHtml
  }

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

  // $('form.new_todo2').on("submit", function(e) {
  //   debugger
  // })

$(document).on('submit', '.editTodo', function(e) {
  debugger
})

  // const functionName = getEd => { 
  //   e.preventDefault;
  //   return false;

  //   debugger }





  })


  // $(document).on("click", ".ugh3", function(e) {
  //     let id = e.target.id
  //     $.ajax({
  //       type: "DELETE",
  //       url: `/todos/${id}`,
  //       success: function(response) {
  //       },
  //       complete: function(data){
  //         loadPage()
  //     })
  //   }
  // })


  // $(document).on("click", ".ugh3", function(e) {
  //    fetch(`/todos/153`)
  //     .then(res => res.json()) 
  //     .then(todo => {
  //         debugger
  //     })

//     let liHtml = `
//     <li class="${this.id}">
//       <div class="view">
//       <form action="/todos/:id" method="put">
//       <input type="hidden" name="_method" value="PUT">
//       <input type="hidden" name="authenticity_token" value="70pEhOQimOzX8VG0JUpH4aFZsws4TSjqlEWxVIE/zinQeVreRnwYsLUYG7mC32F3vmLa9lcBqKKfGSDFLNklLQ==">
//       <input name="todo[status]" type="hidden" value="0">
//       </form>
//       </div>
//     </li>
//     `
//     return todoHtml

// })

      // <li class="${this.id}">
      // <div class="view">
      // <form class="edit_todo" id="edit_todo_${this.id}" action="/todos/${this.id}" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="_method" value="patch"><input type="hidden" name="authenticity_token" value="nBtPJcHW3vUnsilMR5bBJ2PQ9UP9Q4ywy6nEQPm9n7mjKFF/Y4heqUVbY0HgA+exfOucvpIPDPjA9VXRVFt0vQ==">
      //   <br><label for="todo_name">"${this.name}"</label>
      //     <input type="text" value="New Todo" name="todo[name]" id="todo_name"><br>
      //    <input type="submit" name="commit" value="Update Todo" data-disable-with="Update Todo">
      // </form>
      // </div>
      // </li>



