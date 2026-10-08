"""Lambda entry point for the service."""

import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    logger.info("Received event: %s", json.dumps(event))
    name = event.get("name", "world") if isinstance(event, dict) else "world"
    return {
        "statusCode": 200,
        "body": json.dumps({"message": f"Hello, {name}!"}),
    }
