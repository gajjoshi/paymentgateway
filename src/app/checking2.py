from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://Prime:prime@cluster0.mtl5kau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client.get_database('test')
collection = db.get_collection('users')

# Retrieve and print only the email field in descending order based on '_id'
for document in collection.find({}, {'paymentScreenshot': 1, '_id': 0}).sort('_id', -1):
    print(document.get('paymentScreenshot'))
