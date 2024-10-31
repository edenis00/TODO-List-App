import os
import logging
from flask import Flask
from flask_migrate import Migrate
from dotenv import load_dotenv
from routes.user_routes import user_routes
from extension import db

load_dotenv()
app = Flask(__name__)
app.register_blueprint(user_routes, url_prefix='/')
logging.basicConfig(level=logging.INFO)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

if __name__ == "__main__":
    # app.run(debug=True)
    app.run(debug=os.getenv('FLASK_ENV') == 'development')