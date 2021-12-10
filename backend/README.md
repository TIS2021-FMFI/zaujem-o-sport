# First time running

Install python 3.7+<br>
Create virtual environment (this will be needed only very first time.)<br>
On Windows:
<code>python -m venv venv</code><br>
On Linux:
<code>python3 -m venv venv</code>

Switch to your virtual environment in terminal using: <br>
<code>.\venv\Scripts\activate</code> on Windows<br>
<code>source venv/bin/activate</code> on Linux.

Install all required dependencies from the active terminal:<br>
<code>pip install -r requirements.txt</code> on Windows<br>
<code>pip3 install -r requirements.txt</code> on Linux.

# How to run the server

Switch to your virtual environment in terminal using: <br>
<code>.\venv\Scripts\activate</code> on Windows<br>
<code>source venv/bin/activate</code> on Linux.

Then start the server using
<code>python app.py</code> on Windows <br>
<code>python3 app.py dev</code> on Linux.
