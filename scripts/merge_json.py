import json

# Input file paths
file1 = "../public/five_letter_words_words_alpha.txt.json"
file2 = "../public/possible_words.json"
output_file = "../data/merged.json"

# Read first file
with open(file1, "r", encoding="utf-8") as f:
    data1 = json.load(f)

# Read second file
with open(file2, "r", encoding="utf-8") as f:
    data2 = json.load(f)

# Merge and deduplicate words
merged_words = sorted(set(data1["words"]) | set(data2["words"]))

# Save merged words into new JSON file
with open(output_file, "w", encoding="utf-8") as f:
    json.dump({"words": merged_words}, f, indent=2)

words1 = data1["words"]
words2 = data2["words"]

print(f"Merged list {file1} with {len(words1)} words and {file2} with {len(words2)} words ")
print(f"Saved to {output_file} with {len(merged_words)} unique words.")
