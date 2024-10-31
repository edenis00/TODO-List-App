from datetime import datetime
from extension import db

class Todo(db.Model):
    """
        Creating todo table
    """
    __tablename__= 'todo'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task = db.Column(db.String(300), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow())
    
    def __repr__(self):
        return f"<Task {self.task}>"