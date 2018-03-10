import sys

def translate(pigList, vowels):
  newPigList = []

  for word in pigList:
    if word[0] in vowels: # if the first index of the first word is a vowel
      newPigList.append(word + "way") #add to new list
    else: #if letter does not begin with vowel
      newPigList.append(word[1:] + word[0] + "ay") 

  return newPigList

def write(pigList, pigOut):
  pigOut.write(" ".join(pigList))


vowels = ['a', 'e', 'i', 'o', 'u', 'y']
pigFile = open(sys.argv[1], 'r')
pigOut = open('pigOut.txt', 'w')
for line in  pigFile.readlines():
    pigList = line.split()
    t = translate(pigList, vowels)
    print("Input: ", pigList)
    print("Converted: ", t)
    w = write(t, pigOut)
pigFile.close()
