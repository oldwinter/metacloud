#-----------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See LICENSE in the project root for license information.
#-----------------------------------------------------------------------------------------

from flask import Flask

from listen import ListenError, bind_error_message, resolve_listen

app = Flask(__name__)

@app.route("/")
def hello():
    return app.send_static_file("index.html")

if __name__ == "__main__":
    try:
        host, port = resolve_listen()
    except ListenError as exc:
        raise SystemExit(f"toy listen: {exc}") from exc
    try:
        app.run(host=host, port=port)
    except OSError as exc:
        raise SystemExit(f"toy listen: {bind_error_message(host, port, exc)}") from exc
