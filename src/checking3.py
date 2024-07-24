import os
from pymongo import MongoClient
from bson import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb+srv://Prime:prime@cluster0.mtl5kau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.get_database('test')
collection = db.get_collection('users')

# Create the directory 'paymentss' if it doesn't exist
os.makedirs('paymentss', exist_ok=True)

# Retrieve documents with status 0
documents = list(collection.find({"status": 0}))

# Check if any documents are found
if not documents:
    print("No documents found with status 0")
else:
    for document in documents:
        # Get the image data (binary data)
        image_data = document['paymentScreenshot']
        
        # Create a filename using the document's _id
        filename = os.path.join('paymentss', f"image_{document['_id']}.png")
        
        # Write the binary data to a file
        with open(filename, 'wb') as f:
            f.write(image_data)
        
        print(f"Image {filename} downloaded successfully")
        
        # Update the status to 1
        collection.update_one({"_id": document['_id']}, {"$set": {"status": 1}})
        print(f"Status of document {document['_id']} updated to 1")

print("All eligible images have been downloaded and statuses updated.")
