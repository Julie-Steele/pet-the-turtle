# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import credentials, initialize_app, firestore

# Use the application default credentials
cred = credentials.Certificate("pet-the-turtle-firebase-adminsdk-cmwpo-db96603618.json")
app = initialize_app(cred)

# Get a reference to the Firestore service
db = firestore.client()

# Now you can use `db` to interact with Firestore, for example:
doc_ref = db.collection('users').document('user1')
doc_ref.set({
    'first': 'Ada',
    'last': 'Lovelace',
    'born': 1815
})