# Represents a user story on the board
class Task < ApplicationRecord
  belongs_to :list
  validates :name, presence: true
  positioned on: :list

  scope :ordered, -> { order(position: :asc) }
end
