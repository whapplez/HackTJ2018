import wikipedia
search= input("What are you looking for?")

try:
    print(wikipedia.summary(search,sentences=2))
except ValueError:
    print("Disambiguation, be more specific.")
