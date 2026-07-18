# 🎬 AI Movie Review Sentiment Analysis using BERT

An AI-powered **Movie Review Sentiment Analysis Web Application** built using **BERT (Bidirectional Encoder Representations from Transformers)**, **PyTorch**, **Hugging Face Transformers**, and **Flask**. The application classifies movie reviews as **Positive** or **Negative** with high accuracy using a fine-tuned BERT model trained on the IMDB Movie Reviews dataset.

---

## 📌 Project Overview

Sentiment analysis is a Natural Language Processing (NLP) task that identifies the emotional tone behind a piece of text. This project leverages the power of **BERT**, a state-of-the-art transformer model, to analyze movie reviews and predict whether the sentiment expressed is **Positive** or **Negative**.

The application provides a modern and interactive web interface where users can enter movie reviews and instantly receive sentiment predictions along with confidence scores.

---

## ✨ Features

- 🎬 AI-powered movie review sentiment analysis
- 🤖 Fine-tuned BERT model
- 😊 Predicts Positive or Negative sentiment
- 📊 Displays confidence score
- ⚡ Fast inference using PyTorch
- 🌐 Flask web application
- 🎨 Responsive and modern UI
- 📝 Real-time text analysis
- 📱 Mobile-friendly interface
- 🚀 Easy deployment

---

## 🛠️ Technologies Used

### Programming Language

- Python 3.10+

### Machine Learning

- PyTorch
- Hugging Face Transformers
- Hugging Face Datasets

### Web Framework

- Flask

### Frontend

- HTML5
- CSS3
- JavaScript

### Dataset

- IMDB Movie Reviews Dataset

---

## 📂 Project Structure

```
AI-Movie-Sentiment-Analysis/
│
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
│
├── imdb_bert/
│   ├── config.json
│   ├── model.safetensors
│   ├── tokenizer.json
│   ├── tokenizer_config.json
│   ├── vocab.txt
│   └── special_tokens_map.json
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   ├── script.js
│   └── images/
│
├── notebooks/
│   └── IMDB_sentiment.ipynb
│
└── screenshots/
```

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/ansh049/IMDB-Movie-Sentiment-Using-BERT-Deep-Learning.git

cd AI-Movie-Sentiment-Analysis
```

---

## Create Virtual Environment

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# ▶️ Run the Flask Application

```bash
python app.py
```

Open your browser and visit

```
http://127.0.0.1:5000
```

---

# 📊 Model Information

| Property | Value |
|-----------|-------|
| Model | BERT Base Uncased |
| Framework | PyTorch |
| Task | Binary Text Classification |
| Labels | Positive / Negative |
| Dataset | IMDB Movie Reviews |
| Tokenizer | BertTokenizer |
| Max Length | 256 Tokens |

---

# 🧠 Model Pipeline

```
Movie Review

↓

Text Cleaning

↓

Tokenizer

↓

Fine-tuned BERT Model

↓

Softmax Layer

↓

Positive / Negative Prediction

↓

Confidence Score
```

---

# 📸 Application Preview

## Home Page

- Modern UI
- Movie review input
- Interactive interface

---

## Prediction Result

- Sentiment Label
- Confidence Score
- Progress Bar
- Beautiful Result Card

---

# 📦 Requirements

```
Flask
torch
transformers
datasets
numpy
pandas
scikit-learn
accelerate
sentencepiece
safetensors
```

or simply

```bash
pip install -r requirements.txt
```

---

# 📈 Future Improvements

- Multi-class sentiment analysis
- Emotion detection
- Explainable AI (XAI)
- Highlight important words
- Voice input
- Dark/Light mode
- Review history
- User authentication
- Docker support
- Deployment on Render
- Hugging Face Spaces deployment
- REST API
- Batch review prediction

---

# 📚 Dataset

The model is trained using the **IMDB Movie Reviews Dataset**, containing 50,000 labeled movie reviews.

- 25,000 Training Reviews
- 25,000 Testing Reviews

Each review is labeled as:

- Positive
- Negative

---

# 🎯 Applications

- Movie review analysis
- Product review analysis
- Customer feedback analysis
- Social media sentiment analysis
- Brand monitoring
- Opinion mining

---

# 📊 Example

### Input

```
The movie was absolutely fantastic. The acting was brilliant and the storyline was amazing.
```

### Output

```
Sentiment

Positive 😊

Confidence

98.74%
```

---

### Input

```
Worst movie ever. Complete waste of time and money.
```

### Output

```
Sentiment

Negative 😔

Confidence

97.82%
```

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ansh Verma**

Computer Science & Engineering Undergraduate  
Indian Institute of Information Technology, Nagpur (IIIT Nagpur)

---

## ⭐ If you found this project helpful, don't forget to star the repository!