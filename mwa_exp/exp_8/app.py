from flask import Flask, render_template, jsonify
import json
import xml.etree.ElementTree as ET

app = Flask(__name__, template_folder='C:\\Users\\HP\\Desktop\\mwa_exp\\exp_8')

@app.route("/")
def index():
  """Serves the main HTML page"""
  return render_template("index.html")

@app.route("/books.<format>")
def get_books(format):
  """Fetches book data based on format and returns JSON"""
  data_file = f"books.{format}"  # Construct file path based on format
  try:
    with open(data_file, "r") as file:
      data = file.read()  # Read file content
  except FileNotFoundError:
    return jsonify({"error": "Invalid data format"}), 400  # Error for invalid format
  except Exception as e:
    return jsonify({"error": f"Error fetching data: {str(e)}"}), 500  # Internal error

  if format == "html":
    return data  # Return HTML data directly
  elif format == "xml":
        return render_template("xml_template.html", xml_data=data)
  else:
    parsed_data = process_data(data, format)  # Call process_data function
    return jsonify(parsed_data)  # Return parsed data as JSON

def process_data(data, format):
  """Parses JSON or XML data and returns a dictionary"""
  if format == "json":
    return json.loads(data)  # Parse JSON data
  elif format == "xml":
    root = ET.fromstring(data)  # Parse XML string
    books = []
    for child in root:
      book = {
          "title": child.find("title").text,
          "author": child.find("author").text,
          "price": child.find("price").text,
      }
      books.append(book)
    return {"books": books}  # Return dictionary with a list of books
  else:
    return None  # Handle unsupported formats

if __name__ == "__main__":
  app.run(debug=True)  # Run the Flask app in debug mode
