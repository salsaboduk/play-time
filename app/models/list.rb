## Represents a list or column on the board.
class List < ApplicationRecord
  has_many :tasks, dependent: :destroy
  validates :name, presence: true

  after_commit -> { broadcast }
end
