require 'rails_helper'

RSpec.describe 'tasks/show', type: :view do
  before do
    list = List.create!(name: 'List')
    assign(:task, Task.create!(
                    name: 'Name',
                    list: list
                  ))
  end

  it 'renders attributes in <p>' do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(//)
  end
end
