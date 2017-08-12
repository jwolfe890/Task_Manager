class TodosController < ApplicationController

def create
  @todo = Todo.new(todo_params)
  @todo.save
  render json: @todo
end 

def index
  @todo = Todo.new
  @todos = Todo.all
   respond_to do |format|
      format.html { render 'index.js.erb' }
      format.json { render :json => @todos  }
      format.js { render 'index.js.erb' }
    end
end

def update

  binding.pry

  @todo = Todo.find_by(id: params[:id])
  @todo.update(todo_params)
  @todos = Todo.all
  render 'index.js.erb'
  # render json: @todos
end 

def show
  @todo = Todo.find_by(id: params[:id].to_i)
  render json: @todo
end

def destroy
  @todo = Todo.find_by(id: params[:id])
  @todo.destroy
end

private

  def todo_params
    params.require(:todo).permit(:name, :location, :date)
  end 

end
