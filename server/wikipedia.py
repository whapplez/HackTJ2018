import wikipedia
search = input("What are you looking for?")
print(wikipedia.summary(search, sentences=2))