# Represents a user story on the board
class Task < ApplicationRecord
  belongs_to :list
  validates :name, presence(value)
end
