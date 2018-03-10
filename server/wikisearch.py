import sys
import wikipedia
search= sys.argv[1]

try:
    print(wikipedia.summary(search,sentences=2))
except ValueError:
    print("Disambiguation, be more specific.")
