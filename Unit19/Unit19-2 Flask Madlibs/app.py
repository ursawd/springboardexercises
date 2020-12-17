from stories import Story
from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config["SECRET_KEY"] = "replace with a secret key"
debug = DebugToolbarExtension(app)

story = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
large {adjective} {noun}. It loved to {verb} {plural_noun}.""",
)


@app.route("/")
def home():
    """display madlib story shell"""
    return render_template("madlib_form.html", story=story)


@app.route("/display_matlib")
def disp_mat():
    """complete matlib story"""
    text = story.generate(request.args)
    return render_template("display.html", text=text)
