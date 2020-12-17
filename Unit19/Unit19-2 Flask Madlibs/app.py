from stories import Story
from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config["SECRET_KEY"] = "replace with a secret key"
# debug = DebugToolbarExtension(app)

story = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
large {adjective} {noun}. It loved to {verb} {plural_noun}.""",
)
template2_words = ["verb", "food", "noun"]
template2_text = """I love to {verb} {food} with a {noun}"""


@app.route("/")
def home():
    """display madlib story shell choice"""
    return render_template("madlib.html")


@app.route("/madlib_form")
def home_entry():
    """display madlib story shell"""
    if request.args["template_choice"] == "template2":
        story.prompts = template2_words
        story.template = template2_text
    return render_template("madlib_form.html", story=story)


@app.route("/display_matlib")
def disp_mat():
    """complete matlib story"""
    story_text = story.generate(request.args)

    return render_template("display.html", text=story_text)
