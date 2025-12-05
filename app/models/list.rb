## Represents a list or column on the board.
class List < ApplicationRecord
  has_many :task, dependent: :destroy
  validates :name, presence: true
end
