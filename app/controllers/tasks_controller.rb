class TasksController < ApplicationController
  before_action :set_task, only: %i[show edit update destroy move]

  # GET /tasks or /tasks.json
  def index
    @tasks = Task.all
  end

  # GET /tasks/1 or /tasks/1.json
  def show; end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit; end

  # POST /tasks or /tasks.json
  def create
    @task = Task.new(task_params)
    @task.position = :first

    respond_to do |format|
      if @task.save
        format.html { redirect_to @task, notice: 'Task was successfully created.' }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new, status: :unprocessable_content }
        format.json { render json: @task.errors, status: :unprocessable_content }
      end
    end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to @task, notice: 'Task was successfully updated.', status: :see_other }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit, status: :unprocessable_content }
        format.json { render json: @task.errors, status: :unprocessable_content }
      end
    end
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    @task.destroy!

    respond_to do |format|
      format.html { redirect_to tasks_path, notice: 'Task was successfully destroyed.', status: :see_other }
      format.json { head :no_content }
    end
  end

  # PUT /tasks/1/move
  def move
    if task_params[:target_type] == 'list'
      # move task to top of list
      target_list = List.find(task_params[:target_id])
      @task.update list: target_list
      @task.update position: :first
    elsif task_params[:target_type] == 'task'
      # move task after target task
      target_task = Task.find(task_params[:target_id])
      @task.update! list: target_task.list
      @task.update! position: { after: target_task }
    end

    # respond_to do |format|
    #   format.turbo_stream if @task.save
    # end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_task
    @task = Task.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def task_params
    params.expect(task: %i[name list_id position target_id target_type])
  end
end
