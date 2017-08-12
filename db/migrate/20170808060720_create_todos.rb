class CreateTodos < ActiveRecord::Migration[5.0]
  def change
    create_table :todos do |t|
      t.string :name
      t.string :location
      t.boolean :complete, :default => false
      t.datetime :date 
      t.timestamps
    end
  end
end
