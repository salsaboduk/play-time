class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :position
      t.references :list, null: false, foreign_key: true

      t.timestamps
    end
    add_index :tasks, %i[list_id position], unique: true
  end
end
