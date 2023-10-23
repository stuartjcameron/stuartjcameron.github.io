# -*- coding: utf-8 -*-
"""
Created on Tue Nov 15 12:15:56 2022

Process data in a set of word documents, and output a single-page mini-site 
compiling information on topics, country analytics, and statistics

Also gets statistics from a file stored in the same folder, which 
can be downloaded from UIS.

@author: https://github.com/stuartjcameron
"""

#import mammoth
#from bs4 import BeautifulSoup
import os
#import re
#import json
#import glob
#import yaml
#import datetime
#import pandas as pd

# Note, for some reason it seems necessary to import this explicitly
# to make the clipboard module (just a copy of pyperclip) accessible 
#import pandas.io.clipboard as pyperclip

#import klembord

from jinja2 import Environment, FileSystemLoader
import markdown

SCRIPT_PATH = os.path.realpath(__file__)
PATH = os.path.dirname(os.path.dirname(SCRIPT_PATH))

environment = Environment(loader=FileSystemLoader(f"{PATH}/websetup"))
template = environment.get_template("template.j2")
with open(f"{PATH}/content/index.md", encoding="utf-8") as f:
    content = markdown.markdown(f.read())

output = template.render(main=content)
with open(f"{PATH}/index.html", "w", encoding="utf-8") as f:
    f.write(output)
