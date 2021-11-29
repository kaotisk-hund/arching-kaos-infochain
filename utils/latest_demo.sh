#!/bin/bash
MI="$(ipfs add -q static/mixtape-parser.html)"
sed -i -e 's/Qm.*/'$MI'/' README
echo "Adding to git repo..."
git add README 
git commit -m "Updated README file for latest mixtape-parser demo link: $MI"

