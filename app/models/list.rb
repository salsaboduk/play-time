## Represents a list or column on the board.
class List < ApplicationRecord
  validates_presence_of(:name)
end
