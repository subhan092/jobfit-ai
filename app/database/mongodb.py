from pymongo import MongoClient

# 🔹 Replace with your own Mongo URI
MONGO_URI = "mongodb+srv://nawafnaveed:nawaf123%23@cluster0.rzyym.mongodb.net/test"
client = MongoClient(MONGO_URI)
db = client["test"]

applications_col = db["applications"]
companies_col = db["companies"]
jobs_col = db["jobs"]
users_col = db["users"]
