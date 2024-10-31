import logging
from flask import Blueprint, request, jsonify, render_template
from datetime import datetime
from extension import db
from model import Todo

user_routes = Blueprint('user_routes', __name__)


@user_routes.route('/add', methods=['POST'])
def add():
    """
        Adding Task
    """
    data = request.get_json()
    task_contente = data.get('task_content')

    if not task_contente:
        return jsonify({'Error': 'Task cannot be empty'}), 400

    new_task  = Todo(task=task_contente)

    try:
        db.session.add(new_task)
        db.session.commit()
        return jsonify({'Error': 'Task added successfully'}), 200
    except Exception as e:
        logging.error('An error occured due to: %s', e)
        return jsonify({'Error': 'An Error occurred. Please try again'}), 500
    
    
@user_routes.route('/edit/<int:id>', methods=['POST'])
def edit(id):
    """
        Editing Task
    """
    data = request.get_json()
    new_task = data.get('new_task')
    time_edited = datetime.utcnow()

    if not new_task:
        return jsonify({'Error': 'Task cannot be empty'}), 400

    task = Todo.query.get(id)
    logging.info('Task %s', task)

    if not task:
        return jsonify({'Error': 'Task not found'}), 404

    task.task = new_task
    task.date_created = time_edited
    try:
        db.session.add(task)
        db.session.commit()
        return jsonify({'Error': 'Updated successfully'}), 200
    except Exception as e:
        logging.error('An error occured due to: %s', e)
        return jsonify({'Error': 'An Error occured. Please try again'}), 500


@user_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    """
        Deleting a Task
    """
    task = Todo.query.get(id)

    if not task:
        return jsonify({'Error': 'Task not found'}), 404

    try:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted Successfully'}), 200
    except Exception as e:
        logging.error('An Error occured due to %s', e)
        return jsonify({'An Error occurred. Please try again'}), 500


@user_routes.route('/index')
def home():
    """
        Landing page
    """
    tasks = Todo.query.order_by(Todo.date_created.desc()).all()
    return render_template('index.html', tasks=tasks) 