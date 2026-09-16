import os
import socket
import subprocess
import sys
import time
import unittest
import urllib.error
import urllib.request
from pathlib import Path

TOY = Path(__file__).resolve().parents[1] / "server" / "toy"
sys.path.insert(0, str(TOY))

from listen import ListenError, bind_error_message, resolve_listen  # noqa: E402


class ResolveListenTest(unittest.TestCase):
    def test_default_is_loopback_8002(self):
        self.assertEqual(resolve_listen({}), ("127.0.0.1", 8002))

    def test_blank_env_falls_back_to_loopback(self):
        self.assertEqual(resolve_listen({"LISTEN_HOST": "  ", "PORT": ""}), ("127.0.0.1", 8002))

    def test_explicit_all_interfaces_and_port(self):
        self.assertEqual(
            resolve_listen({"LISTEN_HOST": "0.0.0.0", "PORT": "8012"}),
            ("0.0.0.0", 8012),
        )

    def test_invalid_port_names_the_next_step(self):
        with self.assertRaises(ListenError) as raised:
            resolve_listen({"PORT": "nope"})
        self.assertIn("PORT=8002", str(raised.exception))

    def test_out_of_range_port_is_rejected(self):
        with self.assertRaises(ListenError):
            resolve_listen({"PORT": "0"})
        with self.assertRaises(ListenError):
            resolve_listen({"PORT": "70000"})

    def test_bind_error_names_next_step(self):
        message = bind_error_message("127.0.0.1", 8002, OSError("Address already in use"))
        self.assertIn("PORT=8003", message)
        self.assertIn("LISTEN_HOST=0.0.0.0", message)


class AppSourceTest(unittest.TestCase):
    def test_app_uses_resolver_instead_of_hardcoded_all_interfaces(self):
        source = (TOY / "app.py").read_text(encoding="utf-8")
        self.assertIn("resolve_listen", source)
        self.assertNotIn('host="0.0.0.0"', source)
        self.assertNotIn("host='0.0.0.0'", source)


def _listening_ipv4(port: int) -> list[str]:
    hex_port = f"{port:04X}"
    found: list[str] = []
    for line in Path("/proc/net/tcp").read_text(encoding="utf-8").splitlines()[1:]:
        parts = line.split()
        ip_hex, port_hex = parts[1].split(":")
        if port_hex.upper() != hex_port or parts[3] != "0A":
            continue
        raw = bytes.fromhex(ip_hex)
        found.append(".".join(str(byte) for byte in reversed(raw)))
    return found


class BindE2ETest(unittest.TestCase):
    def test_default_listen_can_bind_loopback_only(self):
        host, port = resolve_listen({})
        self.assertEqual(host, "127.0.0.1")
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            sock.bind((host, 0))
            bound_host, bound_port = sock.getsockname()
            self.assertEqual(bound_host, "127.0.0.1")
            self.assertGreater(bound_port, 0)
        finally:
            sock.close()


class FlaskE2ETest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        try:
            import flask  # noqa: F401
        except ImportError:
            raise unittest.SkipTest("flask not installed")

    def test_python_app_binds_loopback_and_serves_index(self):
        port = 18052
        env = os.environ.copy()
        env["PORT"] = str(port)
        env.pop("LISTEN_HOST", None)
        proc = subprocess.Popen(
            [sys.executable, str(TOY / "app.py")],
            cwd=str(TOY),
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
        )
        try:
            deadline = time.time() + 5
            last_error = None
            body = ""
            while time.time() < deadline:
                try:
                    with urllib.request.urlopen(f"http://127.0.0.1:{port}/", timeout=0.4) as resp:
                        body = resp.read().decode("utf-8")
                    break
                except OSError as exc:
                    last_error = exc
                    time.sleep(0.05)
            else:
                self.fail(f"toy did not listen on 127.0.0.1:{port}: {last_error}")
            self.assertIn("VS Code", body)
            self.assertEqual(_listening_ipv4(port), ["127.0.0.1"])
            with self.assertRaises(urllib.error.HTTPError) as raised:
                urllib.request.urlopen(f"http://127.0.0.1:{port}/missing-page", timeout=1)
            self.assertEqual(raised.exception.code, 404)
        finally:
            proc.terminate()
            try:
                proc.wait(timeout=3)
            except subprocess.TimeoutExpired:
                proc.kill()
                proc.wait(timeout=3)

    def test_invalid_port_exits_with_next_step(self):
        env = os.environ.copy()
        env["PORT"] = "nope"
        completed = subprocess.run(
            [sys.executable, str(TOY / "app.py")],
            cwd=str(TOY),
            env=env,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertNotEqual(completed.returncode, 0)
        self.assertIn("PORT=8002", completed.stderr + completed.stdout)


if __name__ == "__main__":
    unittest.main()
