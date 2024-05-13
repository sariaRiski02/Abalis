from flask import Flask, request, jsonify
from googletrans import Translator

app = Flask(__name__)


def translate_to_indonesian(text):
    translator = Translator()
    translated_text = translator.translate(text, dest='id').text
    return translated_text


@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    input_text = data.get('text', '')
    if not input_text:
        return jsonify({'error': 'Teks tidak ditemukan'}), 400

    translated_text = translate_to_indonesian(input_text)
    return jsonify({'translated_text': translated_text})


if __name__ == '__main__':
    app.run(debug=True)
