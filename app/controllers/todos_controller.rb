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
      format.html
      format.json { render :json => @todos  }
    end
end

def put
end 

def show
end

def destroy
  @todo = Todo.find_by(id: params[:id])
  @todo.destroy
  redirect_to action: "index"
end

private

  def todo_params
    params.require(:todo).permit(:name, :location, :date)
  end 

end
