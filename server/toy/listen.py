"""Resolve the toy Flask listen address.

Local `python app.py` defaults to loopback so the unauthenticated static
page is not published on every NIC. Override with LISTEN_HOST / PORT.
Containers that publish 8002 should set LISTEN_HOST=0.0.0.0.
"""

from __future__ import annotations

import os

DEFAULT_HOST = "127.0.0.1"
DEFAULT_PORT = 8002


class ListenError(ValueError):
    """Invalid LISTEN_HOST / PORT; the message is the next step."""


def resolve_listen(env: dict[str, str] | None = None) -> tuple[str, int]:
    source = os.environ if env is None else env
    host = str(source.get("LISTEN_HOST", DEFAULT_HOST)).strip() or DEFAULT_HOST
    raw_port = str(source.get("PORT", str(DEFAULT_PORT))).strip() or str(DEFAULT_PORT)
    try:
        port = int(raw_port)
    except ValueError as exc:
        raise ListenError(
            f"PORT must be an integer between 1 and 65535, got {raw_port!r}. "
            "Example: PORT=8002"
        ) from exc
    if port < 1 or port > 65535:
        raise ListenError(
            f"PORT must be an integer between 1 and 65535, got {port}. "
            "Example: PORT=8002"
        )
    return host, port


def bind_error_message(host: str, port: int, exc: BaseException) -> str:
    return (
        f"cannot bind {host}:{port}: {exc}. "
        "Stop the other process, or retry with PORT=8003. "
        "Need all interfaces? LISTEN_HOST=0.0.0.0"
    )


if __name__ == "__main__":
    try:
        resolved_host, resolved_port = resolve_listen()
    except ListenError as exc:
        raise SystemExit(f"toy listen: {exc}") from exc
    print(f"{resolved_host}:{resolved_port}")
