from pymongo import MongoClient
from bson import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb+srv://Prime:prime@cluster0.mtl5kau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.get_database('test')
collection = db.get_collection('users')

# Retrieve the document containing the image
document = collection.find_one({"_id": ObjectId("66a081fa430b269457e599e2")})

# Check if the document is found
if document is None:
    print("No document found with the given _id")
else:
    # Get the image data (binary data)
    image_data = document['paymentScreenshot']

    # Write the binary data to a file
    with open('downloaded_image.png', 'wb') as f:
        f.write(image_data)

    print("Image downloaded successfully")
