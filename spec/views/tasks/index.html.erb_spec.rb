require 'rails_helper'

RSpec.describe 'tasks/index', type: :view do
  let(:list) do
    build(:list)
  end

  before do
    assign(:tasks, [
             Task.create!(
               name: 'Name',
               list: list
             ),
             Task.create!(
               name: 'Name',
               list: list
             )
           ])
  end

  it 'renders a list of tasks' do
    render
    cell_selector = 'div>p'
    assert_select cell_selector, text: Regexp.new('Name'), count: 2
    assert_select cell_selector, text: Regexp.new(list.id.to_s), count: 2
  end
end
