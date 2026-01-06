
# SAFE PLACEHOLDER
# Replace the body of generate() with your own LLM logic.
# Input arrives via stdin as JSON. Output must be plain text.

import sys, json

def generate(message, history):
    return f"Réponse IA (placeholder) : {message}"

data = json.loads(sys.stdin.read() or "{}")
print(generate(data.get("message",""), data.get("history",[])))
