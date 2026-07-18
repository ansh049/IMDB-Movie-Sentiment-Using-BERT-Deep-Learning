from flask import Flask, render_template, request
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

app = Flask(__name__)

MODEL_PATH = "imdb_bert"

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

model.eval()

labels = {
    0: "Negative",
    1: "Positive"
}


def predict(text):

    inputs = tokenizer(
        text,
        truncation=True,
        padding=True,
        max_length=256,
        return_tensors="pt"
    )

    with torch.no_grad():
        outputs = model(**inputs)

    probabilities = torch.softmax(outputs.logits, dim=1)

    prediction = torch.argmax(probabilities).item()

    confidence = probabilities[0][prediction].item()

    return labels[prediction], confidence


@app.route("/", methods=["GET", "POST"])
def home():

    sentiment = None
    confidence = None
    review = ""

    if request.method == "POST":

        review = request.form["review"]

        sentiment, confidence = predict(review)

    return render_template(
        "index.html",
        sentiment=sentiment,
        confidence=confidence,
        review=review
    )


if __name__ == "__main__":
    app.run(debug=True)