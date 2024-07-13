from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import cv2
import numpy as np
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS
socketio = SocketIO(app, cors_allowed_origins="*")  # Enable CORS for Socket.IO

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('frame')
def handle_frame(data):
    try:
        # Decode the frame from base64
        nparr = np.frombuffer(base64.b64decode(data), np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if frame is None:
            print("Failed to decode frame")
            return

        # Using model to detect the sign language

        emit( 'word', {'word': 'Hello from the server!' })
    except Exception as e:
        print(f"Error processing frame: {e}")

if __name__ == '__main__':
    socketio.run(app, debug=True)
