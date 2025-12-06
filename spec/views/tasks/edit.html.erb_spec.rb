require 'rails_helper'

RSpec.describe 'tasks/edit', type: :view do
  let(:list) do
    build(:list)
  end
  let(:task) do
    Task.create!(
      name: 'MyList',
      list: list
    )
  end

  before do
    assign(:task, task)
  end

  it 'renders the edit task form' do
    render

    assert_select 'form[action=?][method=?]', task_path(task), 'post' do
      assert_select 'input[name=?]', 'task[name]'

      assert_select 'input[name=?]', 'task[list_id]'
    end
  end
end
