import json

# Input and output file paths
input_file = "../data/google-10000-english.txt"
output_file = "../public/five_letter_words.json"

# Read the file, filter 5-letter words, and convert to uppercase
with open(input_file, 'r') as f:
    words = [line.strip().upper() for line in f if len(line.strip()) == 5]

# Save to JSON file
with open(output_file, 'w') as f:
    json.dump(words, f, indent=2)

print(f"Saved {len(words)} five-letter words to {output_file}")
