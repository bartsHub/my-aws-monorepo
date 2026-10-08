import json
import unittest

from handler import handler


class HandlerTest(unittest.TestCase):
    def test_greets_by_name(self):
        response = handler({"name": "Mike"}, None)
        self.assertEqual(response["statusCode"], 200)
        self.assertEqual(json.loads(response["body"]), {"message": "Hello, Mike!"})

    def test_defaults_to_world(self):
        response = handler({}, None)
        self.assertEqual(json.loads(response["body"]), {"message": "Hello, world!"})


if __name__ == "__main__":
    unittest.main()
